export class User {
    // tslint:disable:variable-name
    private _id: number;
    private _username: string; // from email

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get username(): string {
        return this._username;
    }

}
