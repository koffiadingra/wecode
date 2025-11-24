import 'express-session';
import { ObjectId } from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    user: {
      _id: ObjectId;
      email: string;
      username: string;
      isAdmin: boolean;
    };
  }
}
