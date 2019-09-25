export class CustomerRegistrationDetails {
    // tslint:disable:variable-name
    private _username: string;
    private _password: string;
    private _firstName: string;
    private _lastName: string;
    private _phoneNumber: string;
    private _profession: string;

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username.trim().replace(/\s+/g, '');
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password.trim().replace(/\s+/g, '');
    }

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(firstName: string) {
        this._firstName = firstName.trim().replace(/\s+/g, '');
    }

    public get lastName(): string {
        return this._lastName;
    }

    public set lastName(lastName: string) {
        this._lastName = lastName.trim().replace(/\s+/g, '');
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }

    public set phoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber.trim().replace(/\s+/g, '');
    }

    public get profession(): string {
        return this._profession;
    }

    public set profession(profession: string) {
        this._profession = profession;
    }
}
