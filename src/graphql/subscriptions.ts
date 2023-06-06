/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLobby = /* GraphQL */ `
  subscription OnCreateLobby($filter: ModelSubscriptionLobbyFilterInput) {
    onCreateLobby(filter: $filter) {
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
export const onUpdateLobby = /* GraphQL */ `
  subscription OnUpdateLobby($filter: ModelSubscriptionLobbyFilterInput) {
    onUpdateLobby(filter: $filter) {
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
export const onDeleteLobby = /* GraphQL */ `
  subscription OnDeleteLobby($filter: ModelSubscriptionLobbyFilterInput) {
    onDeleteLobby(filter: $filter) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
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
export const onCreateMove = /* GraphQL */ `
  subscription OnCreateMove($filter: ModelSubscriptionMoveFilterInput) {
    onCreateMove(filter: $filter) {
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
export const onUpdateMove = /* GraphQL */ `
  subscription OnUpdateMove($filter: ModelSubscriptionMoveFilterInput) {
    onUpdateMove(filter: $filter) {
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
export const onDeleteMove = /* GraphQL */ `
  subscription OnDeleteMove($filter: ModelSubscriptionMoveFilterInput) {
    onDeleteMove(filter: $filter) {
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
export const onCreateGameRoom = /* GraphQL */ `
  subscription OnCreateGameRoom($filter: ModelSubscriptionGameRoomFilterInput) {
    onCreateGameRoom(filter: $filter) {
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
export const onUpdateGameRoom = /* GraphQL */ `
  subscription OnUpdateGameRoom($filter: ModelSubscriptionGameRoomFilterInput) {
    onUpdateGameRoom(filter: $filter) {
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
export const onDeleteGameRoom = /* GraphQL */ `
  subscription OnDeleteGameRoom($filter: ModelSubscriptionGameRoomFilterInput) {
    onDeleteGameRoom(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      connectionId
      walletAddress
      lichessUsername
      gameCount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      connectionId
      walletAddress
      lichessUsername
      gameCount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      connectionId
      walletAddress
      lichessUsername
      gameCount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateGameRoomUser = /* GraphQL */ `
  subscription OnCreateGameRoomUser(
    $filter: ModelSubscriptionGameRoomUserFilterInput
  ) {
    onCreateGameRoomUser(filter: $filter) {
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
        connectionId
        walletAddress
        lichessUsername
        gameCount
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
export const onUpdateGameRoomUser = /* GraphQL */ `
  subscription OnUpdateGameRoomUser(
    $filter: ModelSubscriptionGameRoomUserFilterInput
  ) {
    onUpdateGameRoomUser(filter: $filter) {
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
        connectionId
        walletAddress
        lichessUsername
        gameCount
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
export const onDeleteGameRoomUser = /* GraphQL */ `
  subscription OnDeleteGameRoomUser(
    $filter: ModelSubscriptionGameRoomUserFilterInput
  ) {
    onDeleteGameRoomUser(filter: $filter) {
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
        connectionId
        walletAddress
        lichessUsername
        gameCount
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
