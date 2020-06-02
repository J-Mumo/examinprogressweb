export class ForgottenPasswordRequest {

    public constructor(
        public email: string) {
    }
}


export class EmailSentResponse {

    public constructor(public emailSent: boolean, public error: string) {

    }
}
