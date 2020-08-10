export class VerifyExamTokenRequest {
  constructor(
    public inviteCode: boolean,
    public code: string
  ) {}
}

export class VerifyExamTokenResponse {
  constructor(
    public verified: boolean,
    public registered: boolean,
    public email: string
  ) {}
}
