import { Status } from './enums';
import { User } from './user';

export interface Position {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export interface LoggedInUser {
  // if user is a 'visitor'
  id: number;
  username: string;
  authorities: string[];
  // if user is a 'customer'
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profession?: string;
  // when GPS data are available. Else default location displays
  isActive?: boolean;
  // '_position' arrives from database as a 'string'
  // then it will be a 'Position' object
  position?: Position | string;
  status?: Status | null;
  availableFrom?: number; // time in milliseconds
  user?: User;
}

export interface Profession {
  id: number;
  name: string;
}
