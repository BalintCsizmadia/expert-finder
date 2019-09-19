export class User extends AbstractUser {
  // tslint:disable:variable-name
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;

  constructor(id: number, username: string, firstname: string) {
      super(id, username);
      this._firstName = firstname;
  }

/*
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
  */
}
