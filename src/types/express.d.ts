import { User } from '../db/models/User';
import { Session } from '../db/models/Session';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
