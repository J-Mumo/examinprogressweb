export class Role {
    public constructor(public id: number, public roleName: string) {

    }
}

export class UserTransfer {
    public constructor(
        public id: number, public firstName: string, public lastName: string,
        public fullName: string, public email: string, public roleTransfers: Role[]) {

    }
}



