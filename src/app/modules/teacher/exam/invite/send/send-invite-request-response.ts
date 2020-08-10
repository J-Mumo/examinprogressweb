export class SendInviteInitialData {
  constructor(
    public inviteCode: string
  ) {}
}

export class SendInviteToEmailRequest {
  constructor(
    public inviteId: number,
    public email: string
  ) {}
}

export class SendInviteRequest {
  constructor(
    public inviteId: number,
    public emails: string[]
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: null
  ) {}
}
