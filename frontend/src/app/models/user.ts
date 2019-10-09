export class User {
    // tslint:disable:variable-name
    private _id: number;
    private _username: string; // email
    private _authorities: string[];

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get authorities(): string[] {
        return this._authorities;
    }

}
