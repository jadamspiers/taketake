import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerLobby = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lobby, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLobby = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lobby, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users: AsyncCollection<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lobby = LazyLoading extends LazyLoadingDisabled ? EagerLobby : LazyLobby

export declare const Lobby: (new (init: ModelInit<Lobby>) => Lobby) & {
  copyOf(source: Lobby, mutator: (draft: MutableModel<Lobby>) => MutableModel<Lobby> | void): Lobby;
}

type EagerNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly is_gameover?: boolean | null;
  readonly winner?: string | null;
  readonly is_checkmate?: boolean | null;
  readonly is_draw?: boolean | null;
  readonly is_resign?: boolean | null;
  readonly gameroomID: string;
  readonly userID: string;
  readonly loser?: string | null;
  readonly offerDraw?: boolean | null;
  readonly sendResign?: boolean | null;
  readonly is_stalemate?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly is_gameover?: boolean | null;
  readonly winner?: string | null;
  readonly is_checkmate?: boolean | null;
  readonly is_draw?: boolean | null;
  readonly is_resign?: boolean | null;
  readonly gameroomID: string;
  readonly userID: string;
  readonly loser?: string | null;
  readonly offerDraw?: boolean | null;
  readonly sendResign?: boolean | null;
  readonly is_stalemate?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

type EagerMove = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Move, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly source?: string | null;
  readonly target?: string | null;
  readonly piece?: string | null;
  readonly userID: string;
  readonly gameroomID: string;
  readonly next_turn?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMove = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Move, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly source?: string | null;
  readonly target?: string | null;
  readonly piece?: string | null;
  readonly userID: string;
  readonly gameroomID: string;
  readonly next_turn?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Move = LazyLoading extends LazyLoadingDisabled ? EagerMove : LazyMove

export declare const Move: (new (init: ModelInit<Move>) => Move) & {
  copyOf(source: Move, mutator: (draft: MutableModel<Move>) => MutableModel<Move> | void): Move;
}

type EagerGameRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Messages?: (Message | null)[] | null;
  readonly Users?: (GameRoomUser | null)[] | null;
  readonly Moves?: (Move | null)[] | null;
  readonly Notifications?: (Notification | null)[] | null;
  readonly open?: boolean | null;
  readonly rating?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Messages: AsyncCollection<Message>;
  readonly Users: AsyncCollection<GameRoomUser>;
  readonly Moves: AsyncCollection<Move>;
  readonly Notifications: AsyncCollection<Notification>;
  readonly open?: boolean | null;
  readonly rating?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameRoom = LazyLoading extends LazyLoadingDisabled ? EagerGameRoom : LazyGameRoom

export declare const GameRoom: (new (init: ModelInit<GameRoom>) => GameRoom) & {
  copyOf(source: GameRoom, mutator: (draft: MutableModel<GameRoom>) => MutableModel<GameRoom> | void): GameRoom;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly gameroomID: string;
  readonly userID: string;
  readonly move?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly gameroomID: string;
  readonly userID: string;
  readonly move?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly GameRoom?: (GameRoomUser | null)[] | null;
  readonly status?: string | null;
  readonly color?: string | null;
  readonly Moves?: (Move | null)[] | null;
  readonly Notifications?: (Notification | null)[] | null;
  readonly lobbyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly GameRoom: AsyncCollection<GameRoomUser>;
  readonly status?: string | null;
  readonly color?: string | null;
  readonly Moves: AsyncCollection<Move>;
  readonly Notifications: AsyncCollection<Notification>;
  readonly lobbyID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerGameRoomUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRoomUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gameRoomId?: string | null;
  readonly userId?: string | null;
  readonly gameRoom: GameRoom;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameRoomUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRoomUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gameRoomId?: string | null;
  readonly userId?: string | null;
  readonly gameRoom: AsyncItem<GameRoom>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameRoomUser = LazyLoading extends LazyLoadingDisabled ? EagerGameRoomUser : LazyGameRoomUser

export declare const GameRoomUser: (new (init: ModelInit<GameRoomUser>) => GameRoomUser) & {
  copyOf(source: GameRoomUser, mutator: (draft: MutableModel<GameRoomUser>) => MutableModel<GameRoomUser> | void): GameRoomUser;
}