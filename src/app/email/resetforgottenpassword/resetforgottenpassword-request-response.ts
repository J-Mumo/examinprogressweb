export class UserResetForgottenPasswordRequest {
    public constructor(
        public userId: number,
        public code: string,
        public password: string) {

    }
}

export class VerifyForgottenPasswordResetCodeRequest {
    public constructor(
        public userId: number,
        public code: string) {

    }
}


export class VerificationResponse {
    public constructor(
        public status: boolean,
        public response: string) {

    }
}

export class SaveResponse {
    public constructor(public saved: boolean, public error: string) {

    }
}


export class UserResetForgottenPasswordResponse {

    public constructor(public saved: string, public error: string) {

    }
}
