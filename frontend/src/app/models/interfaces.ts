import { Status } from './enums';
import { User } from './user';

export interface Position {
    latitude: number;
    longitude: number;
    timestamp: Date;
  }

export interface LoggedInUser {
    // is user a 'visitor'
    id: number;
    username: string;
    authorities: string[];
    // if user a 'customer'
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profession?: string;
    // when GPS data are available. Esle default location displays
    isActive?: boolean;
    // '_position' arrives from database as a 'string'
    // then it will be a 'Position' object
    position?: Position | string;
    status?: Status | null;
    availableFrom?: number; // time in milliseconds
    user?: User;
}
