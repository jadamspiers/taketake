/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLobby = /* GraphQL */ `
  mutation CreateLobby(
    $input: CreateLobbyInput!
    $condition: ModelLobbyConditionInput
  ) {
    createLobby(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateLobby = /* GraphQL */ `
  mutation UpdateLobby(
    $input: UpdateLobbyInput!
    $condition: ModelLobbyConditionInput
  ) {
    updateLobby(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteLobby = /* GraphQL */ `
  mutation DeleteLobby(
    $input: DeleteLobbyInput!
    $condition: ModelLobbyConditionInput
  ) {
    deleteLobby(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      is_gameover
      winner
      is_checkmate
      is_draw
      is_resign
      gameroomID
      userID
      loser
      offerDraw
      sendResign
      is_stalemate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      is_gameover
      winner
      is_checkmate
      is_draw
      is_resign
      gameroomID
      userID
      loser
      offerDraw
      sendResign
      is_stalemate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      is_gameover
      winner
      is_checkmate
      is_draw
      is_resign
      gameroomID
      userID
      loser
      offerDraw
      sendResign
      is_stalemate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMove = /* GraphQL */ `
  mutation CreateMove(
    $input: CreateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    createMove(input: $input, condition: $condition) {
      id
      source
      target
      piece
      userID
      gameroomID
      next_turn
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMove = /* GraphQL */ `
  mutation UpdateMove(
    $input: UpdateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    updateMove(input: $input, condition: $condition) {
      id
      source
      target
      piece
      userID
      gameroomID
      next_turn
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMove = /* GraphQL */ `
  mutation DeleteMove(
    $input: DeleteMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    deleteMove(input: $input, condition: $condition) {
      id
      source
      target
      piece
      userID
      gameroomID
      next_turn
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createGameRoom = /* GraphQL */ `
  mutation CreateGameRoom(
    $input: CreateGameRoomInput!
    $condition: ModelGameRoomConditionInput
  ) {
    createGameRoom(input: $input, condition: $condition) {
      id
      Messages {
        nextToken
        startedAt
      }
      Users {
        nextToken
        startedAt
      }
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      open
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGameRoom = /* GraphQL */ `
  mutation UpdateGameRoom(
    $input: UpdateGameRoomInput!
    $condition: ModelGameRoomConditionInput
  ) {
    updateGameRoom(input: $input, condition: $condition) {
      id
      Messages {
        nextToken
        startedAt
      }
      Users {
        nextToken
        startedAt
      }
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      open
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGameRoom = /* GraphQL */ `
  mutation DeleteGameRoom(
    $input: DeleteGameRoomInput!
    $condition: ModelGameRoomConditionInput
  ) {
    deleteGameRoom(input: $input, condition: $condition) {
      id
      Messages {
        nextToken
        startedAt
      }
      Users {
        nextToken
        startedAt
      }
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      open
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      text
      gameroomID
      userID
      move
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      text
      gameroomID
      userID
      move
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      text
      gameroomID
      userID
      move
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        nextToken
        startedAt
      }
      GameRoom {
        nextToken
        startedAt
      }
      status
      color
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      lobbyID
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        nextToken
        startedAt
      }
      GameRoom {
        nextToken
        startedAt
      }
      status
      color
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      lobbyID
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        nextToken
        startedAt
      }
      GameRoom {
        nextToken
        startedAt
      }
      status
      color
      Moves {
        nextToken
        startedAt
      }
      Notifications {
        nextToken
        startedAt
      }
      lobbyID
      rating
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createGameRoomUser = /* GraphQL */ `
  mutation CreateGameRoomUser(
    $input: CreateGameRoomUserInput!
    $condition: ModelGameRoomUserConditionInput
  ) {
    createGameRoomUser(input: $input, condition: $condition) {
      id
      gameRoomId
      userId
      gameRoom {
        id
        open
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        image
        status
        color
        lobbyID
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGameRoomUser = /* GraphQL */ `
  mutation UpdateGameRoomUser(
    $input: UpdateGameRoomUserInput!
    $condition: ModelGameRoomUserConditionInput
  ) {
    updateGameRoomUser(input: $input, condition: $condition) {
      id
      gameRoomId
      userId
      gameRoom {
        id
        open
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        image
        status
        color
        lobbyID
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGameRoomUser = /* GraphQL */ `
  mutation DeleteGameRoomUser(
    $input: DeleteGameRoomUserInput!
    $condition: ModelGameRoomUserConditionInput
  ) {
    deleteGameRoomUser(input: $input, condition: $condition) {
      id
      gameRoomId
      userId
      gameRoom {
        id
        open
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        image
        status
        color
        lobbyID
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
