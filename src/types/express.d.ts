import { User } from '../db/models/User.js';
import { Session } from '../db/models/Session.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
