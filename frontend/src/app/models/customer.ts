import { User } from './user';
import { Status } from './enums';
import { Position } from './interfaces';

// Professional
export class Customer extends User {
  // tslint:disable:variable-name
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;
  private _profession: string;
  private _isActive: boolean;
  private _position: Position;
  private _status: Status | null;
  private _availableFrom?: Date; // ?

  constructor() {
    super();
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(firstName: string) {
    this._firstName = firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(lastName: string) {
    this._lastName = lastName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public get profession(): string {
    return this._profession;
  }

  public set profession(profession: string) {
    this._profession = profession;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  public get position(): Position {
    return this._position;
  }

  public set position(position: Position) {
    this._position = position;
  }

  public get status(): Status | null {
    return this._status;
  }

  public set status(status: Status) {
    this._status = status;
  }

  public get availableFrom(): Date {
    return this._availableFrom;
  }

  public set availableFrom(time: Date) {
    this._availableFrom = time;
  }

}
