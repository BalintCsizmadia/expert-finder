abstract class AbstractUser {
    // tslint:disable:variable-name
    private _id: number;
    private _username: string;

    constructor(id: number, username: string) {
        this._id = id;
        this._username = username;
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


    // public get phoneNumber(): string {
    //     return this._phoneNumber;
    // }

    // public set phoneNumber(phoneNumber: string) {
    //     this._phoneNumber = phoneNumber;
    // }

}
