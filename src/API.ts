/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLobbyInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelLobbyConditionInput = {
  and?: Array< ModelLobbyConditionInput | null > | null,
  or?: Array< ModelLobbyConditionInput | null > | null,
  not?: ModelLobbyConditionInput | null,
};

export type Lobby = {
  __typename: "Lobby",
  id: string,
  Users?: ModelUserConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  image?: string | null,
  Messages?: ModelMessageConnection | null,
  GameRoom?: ModelGameRoomUserConnection | null,
  status?: string | null,
  color?: string | null,
  Moves?: ModelMoveConnection | null,
  Notifications?: ModelNotificationConnection | null,
  lobbyID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  text?: string | null,
  gameroomID: string,
  userID: string,
  move?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelGameRoomUserConnection = {
  __typename: "ModelGameRoomUserConnection",
  items:  Array<GameRoomUser | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type GameRoomUser = {
  __typename: "GameRoomUser",
  id: string,
  gameRoomId: string,
  userId: string,
  gameRoom: GameRoom,
  user: User,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type GameRoom = {
  __typename: "GameRoom",
  id: string,
  Messages?: ModelMessageConnection | null,
  Users?: ModelGameRoomUserConnection | null,
  Moves?: ModelMoveConnection | null,
  Notifications?: ModelNotificationConnection | null,
  open?: boolean | null,
  rating?: number | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelMoveConnection = {
  __typename: "ModelMoveConnection",
  items:  Array<Move | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Move = {
  __typename: "Move",
  id: string,
  source?: string | null,
  target?: string | null,
  piece?: string | null,
  userID: string,
  gameroomID: string,
  next_turn?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  is_gameover?: boolean | null,
  winner?: string | null,
  is_checkmate?: boolean | null,
  is_draw?: boolean | null,
  is_resign?: boolean | null,
  gameroomID: string,
  userID: string,
  loser?: string | null,
  offerDraw?: boolean | null,
  sendResign?: boolean | null,
  is_stalemate?: boolean | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateLobbyInput = {
  id: string,
  _version?: number | null,
};

export type DeleteLobbyInput = {
  id: string,
  _version?: number | null,
};

export type CreateNotificationInput = {
  id?: string | null,
  is_gameover?: boolean | null,
  winner?: string | null,
  is_checkmate?: boolean | null,
  is_draw?: boolean | null,
  is_resign?: boolean | null,
  gameroomID: string,
  userID: string,
  loser?: string | null,
  offerDraw?: boolean | null,
  sendResign?: boolean | null,
  is_stalemate?: boolean | null,
  _version?: number | null,
};

export type ModelNotificationConditionInput = {
  is_gameover?: ModelBooleanInput | null,
  winner?: ModelStringInput | null,
  is_checkmate?: ModelBooleanInput | null,
  is_draw?: ModelBooleanInput | null,
  is_resign?: ModelBooleanInput | null,
  gameroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  loser?: ModelStringInput | null,
  offerDraw?: ModelBooleanInput | null,
  sendResign?: ModelBooleanInput | null,
  is_stalemate?: ModelBooleanInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateNotificationInput = {
  id: string,
  is_gameover?: boolean | null,
  winner?: string | null,
  is_checkmate?: boolean | null,
  is_draw?: boolean | null,
  is_resign?: boolean | null,
  gameroomID?: string | null,
  userID?: string | null,
  loser?: string | null,
  offerDraw?: boolean | null,
  sendResign?: boolean | null,
  is_stalemate?: boolean | null,
  _version?: number | null,
};

export type DeleteNotificationInput = {
  id: string,
  _version?: number | null,
};

export type CreateMoveInput = {
  id?: string | null,
  source?: string | null,
  target?: string | null,
  piece?: string | null,
  userID: string,
  gameroomID: string,
  next_turn?: string | null,
  _version?: number | null,
};

export type ModelMoveConditionInput = {
  source?: ModelStringInput | null,
  target?: ModelStringInput | null,
  piece?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  gameroomID?: ModelIDInput | null,
  next_turn?: ModelStringInput | null,
  and?: Array< ModelMoveConditionInput | null > | null,
  or?: Array< ModelMoveConditionInput | null > | null,
  not?: ModelMoveConditionInput | null,
};

export type UpdateMoveInput = {
  id: string,
  source?: string | null,
  target?: string | null,
  piece?: string | null,
  userID?: string | null,
  gameroomID?: string | null,
  next_turn?: string | null,
  _version?: number | null,
};

export type DeleteMoveInput = {
  id: string,
  _version?: number | null,
};

export type CreateGameRoomInput = {
  id?: string | null,
  open?: boolean | null,
  rating?: number | null,
  _version?: number | null,
};

export type ModelGameRoomConditionInput = {
  open?: ModelBooleanInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelGameRoomConditionInput | null > | null,
  or?: Array< ModelGameRoomConditionInput | null > | null,
  not?: ModelGameRoomConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGameRoomInput = {
  id: string,
  open?: boolean | null,
  rating?: number | null,
  _version?: number | null,
};

export type DeleteGameRoomInput = {
  id: string,
  _version?: number | null,
};

export type CreateMessageInput = {
  id?: string | null,
  text?: string | null,
  gameroomID: string,
  userID: string,
  move?: string | null,
  _version?: number | null,
};

export type ModelMessageConditionInput = {
  text?: ModelStringInput | null,
  gameroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  move?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
};

export type UpdateMessageInput = {
  id: string,
  text?: string | null,
  gameroomID?: string | null,
  userID?: string | null,
  move?: string | null,
  _version?: number | null,
};

export type DeleteMessageInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  status?: string | null,
  color?: string | null,
  lobbyID: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  status?: ModelStringInput | null,
  color?: ModelStringInput | null,
  lobbyID?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  status?: string | null,
  color?: string | null,
  lobbyID?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateGameRoomUserInput = {
  id?: string | null,
  gameRoomId: string,
  userId: string,
  _version?: number | null,
};

export type ModelGameRoomUserConditionInput = {
  gameRoomId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelGameRoomUserConditionInput | null > | null,
  or?: Array< ModelGameRoomUserConditionInput | null > | null,
  not?: ModelGameRoomUserConditionInput | null,
};

export type UpdateGameRoomUserInput = {
  id: string,
  gameRoomId?: string | null,
  userId?: string | null,
  _version?: number | null,
};

export type DeleteGameRoomUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelLobbyFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelLobbyFilterInput | null > | null,
  or?: Array< ModelLobbyFilterInput | null > | null,
  not?: ModelLobbyFilterInput | null,
};

export type ModelLobbyConnection = {
  __typename: "ModelLobbyConnection",
  items:  Array<Lobby | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  is_gameover?: ModelBooleanInput | null,
  winner?: ModelStringInput | null,
  is_checkmate?: ModelBooleanInput | null,
  is_draw?: ModelBooleanInput | null,
  is_resign?: ModelBooleanInput | null,
  gameroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  loser?: ModelStringInput | null,
  offerDraw?: ModelBooleanInput | null,
  sendResign?: ModelBooleanInput | null,
  is_stalemate?: ModelBooleanInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelMoveFilterInput = {
  id?: ModelIDInput | null,
  source?: ModelStringInput | null,
  target?: ModelStringInput | null,
  piece?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  gameroomID?: ModelIDInput | null,
  next_turn?: ModelStringInput | null,
  and?: Array< ModelMoveFilterInput | null > | null,
  or?: Array< ModelMoveFilterInput | null > | null,
  not?: ModelMoveFilterInput | null,
};

export type ModelGameRoomFilterInput = {
  id?: ModelIDInput | null,
  open?: ModelBooleanInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelGameRoomFilterInput | null > | null,
  or?: Array< ModelGameRoomFilterInput | null > | null,
  not?: ModelGameRoomFilterInput | null,
};

export type ModelGameRoomConnection = {
  __typename: "ModelGameRoomConnection",
  items:  Array<GameRoom | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  gameroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  move?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  status?: ModelStringInput | null,
  color?: ModelStringInput | null,
  lobbyID?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelGameRoomUserFilterInput = {
  id?: ModelIDInput | null,
  gameRoomId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelGameRoomUserFilterInput | null > | null,
  or?: Array< ModelGameRoomUserFilterInput | null > | null,
  not?: ModelGameRoomUserFilterInput | null,
};

export type ModelSubscriptionLobbyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionLobbyFilterInput | null > | null,
  or?: Array< ModelSubscriptionLobbyFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  is_gameover?: ModelSubscriptionBooleanInput | null,
  winner?: ModelSubscriptionStringInput | null,
  is_checkmate?: ModelSubscriptionBooleanInput | null,
  is_draw?: ModelSubscriptionBooleanInput | null,
  is_resign?: ModelSubscriptionBooleanInput | null,
  gameroomID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  loser?: ModelSubscriptionStringInput | null,
  offerDraw?: ModelSubscriptionBooleanInput | null,
  sendResign?: ModelSubscriptionBooleanInput | null,
  is_stalemate?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionMoveFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  source?: ModelSubscriptionStringInput | null,
  target?: ModelSubscriptionStringInput | null,
  piece?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  gameroomID?: ModelSubscriptionIDInput | null,
  next_turn?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMoveFilterInput | null > | null,
  or?: Array< ModelSubscriptionMoveFilterInput | null > | null,
};

export type ModelSubscriptionGameRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  open?: ModelSubscriptionBooleanInput | null,
  rating?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionGameRoomFilterInput | null > | null,
  or?: Array< ModelSubscriptionGameRoomFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  gameroomID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  move?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  lobbyID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionGameRoomUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  gameRoomId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionGameRoomUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionGameRoomUserFilterInput | null > | null,
};

export type CreateLobbyMutationVariables = {
  input: CreateLobbyInput,
  condition?: ModelLobbyConditionInput | null,
};

export type CreateLobbyMutation = {
  createLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateLobbyMutationVariables = {
  input: UpdateLobbyInput,
  condition?: ModelLobbyConditionInput | null,
};

export type UpdateLobbyMutation = {
  updateLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteLobbyMutationVariables = {
  input: DeleteLobbyInput,
  condition?: ModelLobbyConditionInput | null,
};

export type DeleteLobbyMutation = {
  deleteLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateMoveMutationVariables = {
  input: CreateMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type CreateMoveMutation = {
  createMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateMoveMutationVariables = {
  input: UpdateMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type UpdateMoveMutation = {
  updateMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteMoveMutationVariables = {
  input: DeleteMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type DeleteMoveMutation = {
  deleteMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateGameRoomMutationVariables = {
  input: CreateGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type CreateGameRoomMutation = {
  createGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateGameRoomMutationVariables = {
  input: UpdateGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type UpdateGameRoomMutation = {
  updateGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteGameRoomMutationVariables = {
  input: DeleteGameRoomInput,
  condition?: ModelGameRoomConditionInput | null,
};

export type DeleteGameRoomMutation = {
  deleteGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateGameRoomUserMutationVariables = {
  input: CreateGameRoomUserInput,
  condition?: ModelGameRoomUserConditionInput | null,
};

export type CreateGameRoomUserMutation = {
  createGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateGameRoomUserMutationVariables = {
  input: UpdateGameRoomUserInput,
  condition?: ModelGameRoomUserConditionInput | null,
};

export type UpdateGameRoomUserMutation = {
  updateGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteGameRoomUserMutationVariables = {
  input: DeleteGameRoomUserInput,
  condition?: ModelGameRoomUserConditionInput | null,
};

export type DeleteGameRoomUserMutation = {
  deleteGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetLobbyQueryVariables = {
  id: string,
};

export type GetLobbyQuery = {
  getLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListLobbiesQueryVariables = {
  filter?: ModelLobbyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLobbiesQuery = {
  listLobbies?:  {
    __typename: "ModelLobbyConnection",
    items:  Array< {
      __typename: "Lobby",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncLobbiesQueryVariables = {
  filter?: ModelLobbyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncLobbiesQuery = {
  syncLobbies?:  {
    __typename: "ModelLobbyConnection",
    items:  Array< {
      __typename: "Lobby",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      is_gameover?: boolean | null,
      winner?: string | null,
      is_checkmate?: boolean | null,
      is_draw?: boolean | null,
      is_resign?: boolean | null,
      gameroomID: string,
      userID: string,
      loser?: string | null,
      offerDraw?: boolean | null,
      sendResign?: boolean | null,
      is_stalemate?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNotificationsQuery = {
  syncNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      is_gameover?: boolean | null,
      winner?: string | null,
      is_checkmate?: boolean | null,
      is_draw?: boolean | null,
      is_resign?: boolean | null,
      gameroomID: string,
      userID: string,
      loser?: string | null,
      offerDraw?: boolean | null,
      sendResign?: boolean | null,
      is_stalemate?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type NotificationsByGameroomIDQueryVariables = {
  gameroomID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByGameroomIDQuery = {
  notificationsByGameroomID?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      is_gameover?: boolean | null,
      winner?: string | null,
      is_checkmate?: boolean | null,
      is_draw?: boolean | null,
      is_resign?: boolean | null,
      gameroomID: string,
      userID: string,
      loser?: string | null,
      offerDraw?: boolean | null,
      sendResign?: boolean | null,
      is_stalemate?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type NotificationsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByUserIDQuery = {
  notificationsByUserID?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      is_gameover?: boolean | null,
      winner?: string | null,
      is_checkmate?: boolean | null,
      is_draw?: boolean | null,
      is_resign?: boolean | null,
      gameroomID: string,
      userID: string,
      loser?: string | null,
      offerDraw?: boolean | null,
      sendResign?: boolean | null,
      is_stalemate?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMoveQueryVariables = {
  id: string,
};

export type GetMoveQuery = {
  getMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListMovesQueryVariables = {
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMovesQuery = {
  listMoves?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      source?: string | null,
      target?: string | null,
      piece?: string | null,
      userID: string,
      gameroomID: string,
      next_turn?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMovesQueryVariables = {
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMovesQuery = {
  syncMoves?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      source?: string | null,
      target?: string | null,
      piece?: string | null,
      userID: string,
      gameroomID: string,
      next_turn?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type MovesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MovesByUserIDQuery = {
  movesByUserID?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      source?: string | null,
      target?: string | null,
      piece?: string | null,
      userID: string,
      gameroomID: string,
      next_turn?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type MovesByGameroomIDQueryVariables = {
  gameroomID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MovesByGameroomIDQuery = {
  movesByGameroomID?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      source?: string | null,
      target?: string | null,
      piece?: string | null,
      userID: string,
      gameroomID: string,
      next_turn?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetGameRoomQueryVariables = {
  id: string,
};

export type GetGameRoomQuery = {
  getGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListGameRoomsQueryVariables = {
  filter?: ModelGameRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameRoomsQuery = {
  listGameRooms?:  {
    __typename: "ModelGameRoomConnection",
    items:  Array< {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncGameRoomsQueryVariables = {
  filter?: ModelGameRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGameRoomsQuery = {
  syncGameRooms?:  {
    __typename: "ModelGameRoomConnection",
    items:  Array< {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      text?: string | null,
      gameroomID: string,
      userID: string,
      move?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMessagesQuery = {
  syncMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      text?: string | null,
      gameroomID: string,
      userID: string,
      move?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type MessagesByGameroomIDQueryVariables = {
  gameroomID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByGameroomIDQuery = {
  messagesByGameroomID?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      text?: string | null,
      gameroomID: string,
      userID: string,
      move?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type MessagesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByUserIDQuery = {
  messagesByUserID?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      text?: string | null,
      gameroomID: string,
      userID: string,
      move?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByLobbyIDQueryVariables = {
  lobbyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByLobbyIDQuery = {
  usersByLobbyID?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetGameRoomUserQueryVariables = {
  id: string,
};

export type GetGameRoomUserQuery = {
  getGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListGameRoomUsersQueryVariables = {
  filter?: ModelGameRoomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameRoomUsersQuery = {
  listGameRoomUsers?:  {
    __typename: "ModelGameRoomUserConnection",
    items:  Array< {
      __typename: "GameRoomUser",
      id: string,
      gameRoomId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncGameRoomUsersQueryVariables = {
  filter?: ModelGameRoomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGameRoomUsersQuery = {
  syncGameRoomUsers?:  {
    __typename: "ModelGameRoomUserConnection",
    items:  Array< {
      __typename: "GameRoomUser",
      id: string,
      gameRoomId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GameRoomUsersByGameRoomIdQueryVariables = {
  gameRoomId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGameRoomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GameRoomUsersByGameRoomIdQuery = {
  gameRoomUsersByGameRoomId?:  {
    __typename: "ModelGameRoomUserConnection",
    items:  Array< {
      __typename: "GameRoomUser",
      id: string,
      gameRoomId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GameRoomUsersByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGameRoomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GameRoomUsersByUserIdQuery = {
  gameRoomUsersByUserId?:  {
    __typename: "ModelGameRoomUserConnection",
    items:  Array< {
      __typename: "GameRoomUser",
      id: string,
      gameRoomId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateLobbySubscriptionVariables = {
  filter?: ModelSubscriptionLobbyFilterInput | null,
};

export type OnCreateLobbySubscription = {
  onCreateLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateLobbySubscriptionVariables = {
  filter?: ModelSubscriptionLobbyFilterInput | null,
};

export type OnUpdateLobbySubscription = {
  onUpdateLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteLobbySubscriptionVariables = {
  filter?: ModelSubscriptionLobbyFilterInput | null,
};

export type OnDeleteLobbySubscription = {
  onDeleteLobby?:  {
    __typename: "Lobby",
    id: string,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    is_gameover?: boolean | null,
    winner?: string | null,
    is_checkmate?: boolean | null,
    is_draw?: boolean | null,
    is_resign?: boolean | null,
    gameroomID: string,
    userID: string,
    loser?: string | null,
    offerDraw?: boolean | null,
    sendResign?: boolean | null,
    is_stalemate?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateMoveSubscriptionVariables = {
  filter?: ModelSubscriptionMoveFilterInput | null,
};

export type OnCreateMoveSubscription = {
  onCreateMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateMoveSubscriptionVariables = {
  filter?: ModelSubscriptionMoveFilterInput | null,
};

export type OnUpdateMoveSubscription = {
  onUpdateMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteMoveSubscriptionVariables = {
  filter?: ModelSubscriptionMoveFilterInput | null,
};

export type OnDeleteMoveSubscription = {
  onDeleteMove?:  {
    __typename: "Move",
    id: string,
    source?: string | null,
    target?: string | null,
    piece?: string | null,
    userID: string,
    gameroomID: string,
    next_turn?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateGameRoomSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomFilterInput | null,
};

export type OnCreateGameRoomSubscription = {
  onCreateGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateGameRoomSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomFilterInput | null,
};

export type OnUpdateGameRoomSubscription = {
  onUpdateGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteGameRoomSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomFilterInput | null,
};

export type OnDeleteGameRoomSubscription = {
  onDeleteGameRoom?:  {
    __typename: "GameRoom",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Users?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    open?: boolean | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    text?: string | null,
    gameroomID: string,
    userID: string,
    move?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    GameRoom?:  {
      __typename: "ModelGameRoomUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    status?: string | null,
    color?: string | null,
    Moves?:  {
      __typename: "ModelMoveConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    lobbyID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateGameRoomUserSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomUserFilterInput | null,
};

export type OnCreateGameRoomUserSubscription = {
  onCreateGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateGameRoomUserSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomUserFilterInput | null,
};

export type OnUpdateGameRoomUserSubscription = {
  onUpdateGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteGameRoomUserSubscriptionVariables = {
  filter?: ModelSubscriptionGameRoomUserFilterInput | null,
};

export type OnDeleteGameRoomUserSubscription = {
  onDeleteGameRoomUser?:  {
    __typename: "GameRoomUser",
    id: string,
    gameRoomId: string,
    userId: string,
    gameRoom:  {
      __typename: "GameRoom",
      id: string,
      open?: boolean | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      image?: string | null,
      status?: string | null,
      color?: string | null,
      lobbyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
