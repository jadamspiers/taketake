// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Lobby, Notification, Move, GameRoom, Message, User, GameRoomUser } = initSchema(schema);

export {
  Lobby,
  Notification,
  Move,
  GameRoom,
  Message,
  User,
  GameRoomUser
};