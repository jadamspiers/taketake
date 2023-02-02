import React, { useEffect, useRef, useState, Fragment } from 'react';
import Chess from 'chess.js';

import { Chessboard } from 'react-chessboard';
import { Dialog, Transition } from '@headlessui/react';

export const StyledBoard = ({ boardWidth, color_state, ws, room, last_move_state, state_is_time_expired, set_did_win }) => {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [isOpen, setIsOpen] = useState(false);
  const [blackWon, setBlackWon] = useState();
  const [isCheckmate, setIsCheckmate] = useState();
  const [isStalemate, setIsStalemate] = useState();
  const [isDraw, setIsDraw] = useState();

  useEffect(() => {
    if (last_move_state !== undefined) {
      console.log("lastMove state was updated");
      console.log("lastMove: " + JSON.stringify(last_move_state));

      onDrop(last_move_state.from, last_move_state.to);

      console.log("ROOM.NAME: " + room.name);
    }
  }, [last_move_state])

  useEffect(() => {
    if (state_is_time_expired) {
      console.log("TIME HAS EXPIRED");
    }
  }, [state_is_time_expired]);

  useEffect(() => {
    // if (color_state === "white" || color_state === "black") {
    //   console.log("color was assigned to " + color_state);
    // }
    console.log("color was assigned to " + color_state);
  }, [color_state]);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const sendMove = (room, move) => {
    console.log("sending '" + JSON.stringify(move) + "' to room " + room.id);
    if (move !== null) {
      ws.current?.send(JSON.stringify({
        action: 'send-move',
        message: JSON.stringify(move),
        target: {
          id: room.id,
          name: room.name
        }
      }));
    }
  }

  const showDialog = () => {
    let dialogMessage = ""
    if (blackWon) {
      dialogMessage = "Black has won by checkmate"
    } else if (!blackWon && !isStalemate && !isDraw) {
      dialogMessage = "White has won by checkmate"
    } else if (!blackWon && isStalemate && !isDraw) {
      dialogMessage = "The game has ended in a stalemate"
    } else if (!blackWon && !isStalemate && isDraw) {
      dialogMessage = "The game has ended in a draw"
    } else {
      console.log("Error: Not sure how the game has ended.")
    }

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      GAME OVER
                    </Dialog.Title>
                    <div className="mt-2">
                      {dialogMessage}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }
  
  function updateBoard(sourceSquare, targetSquare) {
    console.log("updating local board");

    // Establish the new move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // Check if game is over, if so then launch dialog
    console.log("turn: " + gameCopy.turn());
    console.log("in_checkmate: " + gameCopy.in_checkmate());
    console.log("in_stalemate: " + gameCopy.in_stalemate());
    console.log("in_draw: " + gameCopy.in_draw());
    console.log("isGameOver: " + gameCopy.game_over());
    if (gameCopy.game_over()) {

      // determine if this client won (assuming checkmate for now)
      if (gameCopy.turn() === "w" && color_state === "white") {
        set_did_win(false);
      } else if (gameCopy.turn() === "b" && color_state === "black") {
        set_did_win(false);
      } else if (gameCopy.turn() === "w" && color_state === "black") {
        set_did_win(true);
      } else {
        set_did_win(true);
      }

      // determine how the game ended
      if (gameCopy.in_checkmate()) {
        if (gameCopy.turn() === "w") {
          setBlackWon(true);
        }
      } else if (gameCopy.in_stalemate()) {
        setIsStalemate(true);
      } else if (gameCopy.in_draw()) {
        setIsDraw(true);
      } else {
        console.log("ERROR: Undecided how game has ended.")
      }

      // open the dialog
      setIsOpen(true);
    }

    return move;
  }

  function onDrop(sourceSquare, targetSquare, piece) {
    let move
    if (piece === undefined) {
      // just update the local board
      move = updateBoard(sourceSquare, targetSquare);

      // Send the new move to the server
      sendMove(room, move)
    } else {
      if ((piece.charAt(0) === 'b' && color_state === 'black') || (piece.charAt(0) === 'w' && color_state === 'white')) {
        // Update the local board
        move = updateBoard(sourceSquare, targetSquare);
  
        // Send the new move to the server
        sendMove(room, move)
      }
    }

    return move
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

  return (
    <div>
      <Chessboard
        id="StyledBoard"
        animationDuration={200}
        boardOrientation={color_state}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onDrop}
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
      {showDialog()}
    </div>
  );
}