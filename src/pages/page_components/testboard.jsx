import React, { useEffect, useRef, useState, Fragment, forwardRef } from 'react';
import Chess from 'chess.js';

import { Chessboard } from 'react-chessboard';
import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import { 
    OnCreateMessageSubscription,
    CreateGameRoomInput,
    CreateMessageInput,
    OnUpdateGameRoomSubscription,
    GetGameRoomQuery,
    CreateGameRoomUserInput
} from "../../API";
import { authFieldsWithDefaults } from '@aws-amplify/ui';
import { useAuth } from '../../hooks/useAuth';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check'


export const TestBoard = forwardRef(({
    boardWidth,
    joined_room_state,
    color_state,
    draw_state,
    resign_state,
    set_draw_state,
}, ref) => {

    const auth = useAuth();

    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [isOpen, setIsOpen] = useState(false);
    const [blackWon, setBlackWon] = useState();
    const [isCheckmate, setIsCheckmate] = useState();
    const [isStalemate, setIsStalemate] = useState();
    const [isDraw, setIsDraw] = useState();
    // const [moves, setMoves] = useState();
    const [lastMove, setLastMove] = useState("");
    const [lastMoveReceived, setLastMoveReceived] = useState("");
    const [nextTurn, setNextTurn] = useState("w");
    const [isMyTurn, setIsMyTurn] = useState(false); // need to modify this default from an input
    const [showDraw, setShowDraw] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);
    const [gameOverMsg, setGameOverMsg] = useState("");

    useEffect(() => {
      ref.onmessage = (event) => {
        console.log("Received message from testboard component: " + event.data);
      }
    }, [ref]);

    useEffect(() => {
      if (color_state === "white") {
        setIsMyTurn(true);
      }
    }, [color_state]);

    useEffect(() => {
      if (resign_state) {
        console.log("RESIGN IS TRUE");
        sendResign();
      }
    }, [resign_state])

    useEffect(() => {
      if (showGameOver) {
        showGameOverDialog();
      }
    }, [showGameOver])

    useEffect(() => {
      if (draw_state) {
        console.log("draw_state is true");
        sendOfferDraw();
      } else {
        console.log("draw_state is false");
      }
    }, [draw_state]);

    // TODO: 
    // - add updateBoard()

    // subscribe and get the latest moves
    // constantly monitor the move for resign or draw
    // When receiving the move check the user and make sure that that the opponent
    // sent the move and just set the lastMove. 
    // If the this client made the move then change the board and send
    // the move.
    useEffect(() => {
        let sub;
        if (joined_room_state) {
            console.log("SUBSCRIBING TO MOVES in gameroom (" + joined_room_state + ")");
            sub = API.graphql(
                graphqlOperation(subscriptions.onCreateMove, {
                    filter: { gameroomID: { eq: joined_room_state }},
                })).subscribe({
                    next: ({ value }) => {
                        console.log("RECEIVED NEW MOVE!");
                        console.log({value});
                        const newSource = value.data?.onCreateMove?.source;
                        const newTarget = value.data?.onCreateMove?.target;
                        const newPiece = value.data?.onCreateMove?.piece;
                        const newSender = value.data?.onCreateMove?.userID;
                        const next_turn = value.data?.onCreateMove?.next_turn;
                        if (newSender !== auth.userId) {
                          if (newSource && newTarget && newPiece && newSender) {
                            const mv = {
                                source: newSource,
                                target: newTarget,
                                piece: newPiece,
                                sender: newSender
                            }
                            // setMoves(prevMoves => [...prevMoves, mv, ]);
                            setLastMoveReceived(mv);
                            setNextTurn(next_turn);
                            setIsMyTurn(true);
                            updateBoard(newSource, newTarget, newPiece);
                          }
                        }

                    },
                    error: (error) => console.log(error)
                });
        }

        return () => {
            if (sub) {
                sub.unsubscribe();
            }
        };
    }, [joined_room_state])

    useEffect(() => {
      let sub;
      if (joined_room_state && (color_state === "white" || color_state === "black")) {
          console.log("SUBSCRIBING TO NOTIFICATIONS in gameroom (" + joined_room_state + ")");
          sub = API.graphql(
              graphqlOperation(subscriptions.onCreateNotification, {
                  filter: { gameroomID: { eq: joined_room_state }},
              })).subscribe({
                  next: ({ value }) => {
                      console.log("RECEIVED NEW NOTIFICATION!");
                      console.log({value});
                      const newSender = value.data?.onCreateNotification?.userID;
                      const is_gameover = value.data?.onCreateNotification?.is_gameover;
                      const is_checkmate = value.data?.onCreateNotification?.is_checkmate;
                      const is_draw = value.data?.onCreateNotification?.is_draw;
                      const is_resign = value.data?.onCreateNotification?.is_resign;
                      const newWinner = value.data?.onCreateNotification?.winner;
                      const newLoser = value.data?.onCreateNotification?.loser;
                      const offerDraw = value.data?.onCreateNotification?.offerDraw;
                      const sendResign = value.data?.onCreateNotification?.sendResign;
                      const is_stalemate = value.data?.onCreateNotification?.is_stalemate;

                      // handle same client notifications (only resignation)
                      if (is_gameover && is_resign && newSender === auth.userId) {
                        setGameOverMsg(newWinner + " won by resignation");
                        setShowGameOver(true);
                      }

                      if (newSender === auth.userId) {
                        if (is_gameover && is_resign) {
                          setGameOverMsg(newWinner + " won by resignation");
                          setShowGameOver(true);
                        } else if (is_gameover && is_draw) {
                          setGameOverMsg("game ended in draw by agreement");
                          setShowGameOver(true);
                          // clear all notifications in the game room
                          
                        } else if (is_gameover && is_stalemate) {
                          setGameOverMsg("game ended in draw by stalemate");
                          setShowGameOver(true);
                        }
                      }

                      // handle all opponent notifications
                      if (newSender !== auth.userId) {
                        if (is_gameover) {
                          console.log("GAME OVER")
                          if (is_checkmate) {
                            // TODO
                          } else if (is_draw) {
                            setGameOverMsg("game ended by draw agreement");
                            setShowGameOver(true);
                          } else if (is_stalemate) {
                            setGameOverMsg("game ended in draw by stalemate");
                            setShowGameOver(true);
                          }
                          else if (is_resign) {
                            setGameOverMsg(newWinner + " won by resignation");
                            setShowGameOver(true);
                          } else {
                            // TODO
                          }
                        } else {
                          console.log("is_gameover=false")
                          console.log("offerDraw: " + offerDraw);
                          if (offerDraw) {
                            console.log("calling showDraw()")
                            setShowDraw(true);
                          } else if (sendResign) {
                            // TODO
                          }else {
                            // TODO
                          }
                        }




                        // if (newResign) {
                        //   console.log("RESIGN NOTIFICATION RECEIVED");
                        // } else {
                        //   if ((newWinner === "w" && color_state === "white") || (newWinner === "b" && color_state === "black")) {
                        //     console.log("YOU WIN");
                        //   } else {
                        //     // TODO:
                        //     // both clients are reporting "YOU LOSE"
                        //     console.log("YOU LOSE");
                        //   }
                        // }
                      }

                  },
                  error: (error) => console.log(error)
              });
      }

      return () => {
          if (sub) {
              sub.unsubscribe();
          }
      };
    }, [joined_room_state, color_state]);

    const showGameOverDialog = () => {
      console.log("opening game over dialog");
      const handleClose = () => {
        setShowGameOver(false);
      }

      return (
        <Dialog
          open={showGameOver}
          onClose={handleClose}
        >
          <DialogTitle>Game Over</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {gameOverMsg}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }

    const promptDraw = () => {

      const handleAccept = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        sendIsDraw();
        setShowDraw(false);
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowDraw(false);
      };

      const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="accept"
            color="inherit"
            onClick={handleAccept}
          >
            <Check fontSize='small' />
          </IconButton>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    

      return (
        <div>
          <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={showDraw}
            onClose={handleClose}
            message="Accept draw?"
            action={action}
          />
        </div>
      );
    }

    const sendMove = async (s, t, p, turn) => {
      const newMoveInput = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        source: s,
        target: t,
        piece: p,
        next_turn: game.turn()
      }

      try {
        const newMoveData = await API.graphql(
          graphqlOperation(mutations.createMove, { input: newMoveInput })
        );
        console.log("Successfully sent move");
      } catch (error) {
        console.log(error);
      }
    }

    const sendCheckmate = async (w, l) => {
      console.log("calling sendCheckmate()");
      const newNotification = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        winner: w,
        loser: l
      }

      try {
        const newCheckmateData = await API.graphql(
          graphqlOperation(mutations.createNotification, { input : newNotification })
        );
        console.log("Successfully sent notification");
      } catch (error) {
        console.log(error);
      }
    }

    const sendResign = async () => {
      console.log("calling sendResign()");

      // establish winner and loser
      const resignedColor = color_state.charAt(0);
      let newWinner = "";
      let newLoser = "";
      if (resignedColor === 'w') {
        newWinner = "black";
        newLoser = "white";
      } else {
        newWinner = "white";
        newLoser = "black";
      }

      const newNotification = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        is_gameover: true,
        is_resign: true,
        winner: newWinner,
        loser: newLoser
      }

      try {
        const newResignData = await API.graphql(
          graphqlOperation(mutations.createNotification, { input: newNotification })
        );
        console.log("Successfully sent notification");
      } catch (error) {
        console.log(error);
      }
    }

    const sendOfferDraw = async () => {
      console.log("calling sendOfferDraw()");
      const newNotification = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        is_gameover: false,
        offerDraw: true
      }

      try {
        const newDrawData = await API.graphql(
          graphqlOperation(mutations.createNotification, { input: newNotification })
        );
        console.log("Successfully sent offerDraw notification");
      } catch (error) {
        console.log(error);
      }
      set_draw_state(false);
    }

    const sendIsDraw = async () => {
      console.log("calling sendIsDraw()");
      const newNotification = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        is_gameover: true,
        is_draw: true,
      }

      try {
        const newDrawData = await API.graphql(
          graphqlOperation(mutations.createNotification, { input: newNotification })
        );
        console.log("Successfully sent is_draw notification");
      } catch (error) {
        console.log(error);
      }
    }

    const sendStalemate = async () => {
      console.log("calling sendStalemate()");
      const newNotification = {
        userID: auth.userId,
        gameroomID: joined_room_state,
        is_gameover: true,
        is_stalemate: true
      }

      try {
        const newDrawData = await API.graphql(
          graphqlOperation(mutations.createNotification, { input: newNotification })
        );
        console.log("Successfully sent is_stalemate notification");
      } catch (error) {
        console.log(error);
      }
    }

    function onDrop(sourceSquare, targetSquare, piece) {

      // TODO:
      // if it's my turn then update the board and send the move
      // handle all opponent's move with another function
      // if (nextTurn !== color_state)

      /**
       * if it's my turn, then change the board and send the move
       * if it's not my turn and receiving the a move then just update the board
       */
      let move;
      if (isMyTurn) {
        if ((piece.charAt(0) === 'b' && color_state === 'black' && nextTurn === "b") || (piece.charAt(0) === 'w' && color_state === 'white' && nextTurn === "w")) {
          console.log("calling A");
          const gameCopy = { ...game };
          move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          });
          setGame(gameCopy);
          sendMove(sourceSquare, targetSquare, piece);
          setIsMyTurn(false);
        } else {
          console.log("not your turn");
        }
      } else {
        console.log("def not my turn");
      }
      
      return move;
    }

    const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];
    const customPieces = () => {
      const returnPieces = {};
      pieces.map((p) => {
        returnPieces[p] = ({ squareWidth }) => (
          <div
            style={{
              width: squareWidth,
              height: squareWidth,
              backgroundImage: `url(/assets/${p}.png)`,
              backgroundSize: '100%',
            }}
          />
        );
        return null;
      });
      return returnPieces;
    };

    function updateBoard(sourceSquare, targetSquare, piece) {
        console.log("updating local board");
    
        // Establish the new move
        const gameCopy = { ...game };
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q' // always promote to a queen for example simplicity
        });
        setGame(gameCopy);
        if (gameCopy.in_checkmate()) {
          console.log("CHECKMATE");
          let winner;
          let loser;
          if (nextTurn === "w") {
            winner = "w";
            loser = "b";
          } else {
            winner = "b";
            loser = "w";
          }
          sendCheckmate(winner, loser);
        } else if (gameCopy.in_draw() && !gameCopy.in_stalemate()) {
          console.log("DRAW");
          sendIsDraw();
        } else if (gameCopy.in_stalemate()) {
          console.log("STALEMATE");
          sendStalemate();
        }
    
        return move;
    }

    function safeGameMutate(modify) {
      setGame((g) => {
        const update = { ...g };
        modify(update);
        return update;
      });
    }

    return (
      <>
        {showGameOverDialog()}
        <div>
          <Chessboard
            id="StyledBoard"
            animationDuration={200}
            boardOrientation={"white"}
            boardWidth={boardWidth}
            position={game.fen()}
            onPieceDrop={nextTurn === color_state ? updateBoard : onDrop}
            snapToCursor={true}
            customBoardStyle={{
              borderRadius: '4px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
            }}
            customDarkSquareStyle={{ backgroundColor: '#779952' }}
            customLightSquareStyle={{ backgroundColor: '#edeed1' }}
            customPieces={customPieces()}
            ref={chessboardRef}
          />
          <button
            className="rc-button"
            onClick={() => {
              safeGameMutate((game) => {
                game.reset();
              });
            }}
          >
            reset
          </button>
          <button
            className="rc-button"
            onClick={() => {
              safeGameMutate((game) => {
                game.undo();
              });
            }}
          >
            undo
          </button>
          <button>
            
          </button>
          {promptDraw()}
        </div>
      </>
    );
});