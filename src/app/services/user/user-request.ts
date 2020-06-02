export class UserEditRequest {

    public constructor(
        public id: number, public firstname: string,
        public lastname: string, public email: string, public password: string) {

    }
}

export class User {

    public constructor(
        public firstname: string, public lastname: string,
        public email: string, public password: string) {

    }
}

export class UserResetForgottenPasswordRequest {

    public constructor(
        public userId: string, public code: string,
        public password: string) {

    }
}

