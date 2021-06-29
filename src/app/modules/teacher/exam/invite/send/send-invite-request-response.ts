export class SendInviteInitialData {
  constructor(
    public inviteCode: string
  ) {}
}

export class SendInviteRequest {
  constructor(
    public inviteId: number,
    public emails: string[]
  ) {}
}

export class SendInviteResponse {
  constructor(
    public sent: boolean,
    public emailError: boolean,
    public tokensError: boolean,
    public error: string,
    public unsentEmails: string[]
  ) {}
}
