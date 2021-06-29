export class ExamTokenTransfer {
  constructor(
    public examTokenId: number,
    public email: string,
  ) {}
}

export class ViewInviteInitialData {
  constructor(
    public name: string,
    public examStartDate: string,
    public examEndDate: Date,
    public pausable: boolean,
    public examStartTime: string,
    public inviteCode: string,
    public examTokenTransfers: ExamTokenTransfer[]
  ) {}
}

export class SendInviteToEmailRequest {
  constructor(
    public inviteId: number,
    public email: string
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: null
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

export class DeleteResponse {
  constructor(
    public deleted: boolean,
    public error: null
  ) {}
}
