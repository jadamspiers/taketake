/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLobby = /* GraphQL */ `
  query GetLobby($id: ID!) {
    getLobby(id: $id) {
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
export const listLobbies = /* GraphQL */ `
  query ListLobbies(
    $filter: ModelLobbyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLobbies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLobbies = /* GraphQL */ `
  query SyncLobbies(
    $filter: ModelLobbyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLobbies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const notificationsByGameroomID = /* GraphQL */ `
  query NotificationsByGameroomID(
    $gameroomID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByGameroomID(
      gameroomID: $gameroomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const notificationsByUserID = /* GraphQL */ `
  query NotificationsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getMove = /* GraphQL */ `
  query GetMove($id: ID!) {
    getMove(id: $id) {
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
export const listMoves = /* GraphQL */ `
  query ListMoves(
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoves(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMoves = /* GraphQL */ `
  query SyncMoves(
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMoves(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const movesByUserID = /* GraphQL */ `
  query MovesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const movesByGameroomID = /* GraphQL */ `
  query MovesByGameroomID(
    $gameroomID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movesByGameroomID(
      gameroomID: $gameroomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getGameRoom = /* GraphQL */ `
  query GetGameRoom($id: ID!) {
    getGameRoom(id: $id) {
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
export const listGameRooms = /* GraphQL */ `
  query ListGameRooms(
    $filter: ModelGameRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        open
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGameRooms = /* GraphQL */ `
  query SyncGameRooms(
    $filter: ModelGameRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGameRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        open
        rating
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const messagesByGameroomID = /* GraphQL */ `
  query MessagesByGameroomID(
    $gameroomID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByGameroomID(
      gameroomID: $gameroomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const messagesByUserID = /* GraphQL */ `
  query MessagesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        status
        color
        lobbyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        status
        color
        lobbyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const usersByLobbyID = /* GraphQL */ `
  query UsersByLobbyID(
    $lobbyID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByLobbyID(
      lobbyID: $lobbyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        image
        status
        color
        lobbyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getGameRoomUser = /* GraphQL */ `
  query GetGameRoomUser($id: ID!) {
    getGameRoomUser(id: $id) {
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
export const listGameRoomUsers = /* GraphQL */ `
  query ListGameRoomUsers(
    $filter: ModelGameRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameRoomId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGameRoomUsers = /* GraphQL */ `
  query SyncGameRoomUsers(
    $filter: ModelGameRoomUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGameRoomUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        gameRoomId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const gameRoomUsersByGameRoomId = /* GraphQL */ `
  query GameRoomUsersByGameRoomId(
    $gameRoomId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGameRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameRoomUsersByGameRoomId(
      gameRoomId: $gameRoomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameRoomId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const gameRoomUsersByUserId = /* GraphQL */ `
  query GameRoomUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGameRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameRoomUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameRoomId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
