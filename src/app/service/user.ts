export interface Roles {
    customer: boolean;
    operator?: boolean;
    admin?: boolean;
}

export class User {
    email: string;
    name: string;
    tel: number;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.name = authData.name;
        this.tel = authData.tel;
        this.roles = { customer: true };
    }
}
