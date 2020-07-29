export class ExamTokenTransfer {
  constructor(
    public examTokenId: number,
    public email: string,
  ) {}
}

export class ViewInviteInitialData {
  constructor(
    public name: string,
    public examStartDate: Date,
    public examEndDate: Date,
    public pausable: boolean,
    public examStartTime: string,
    public examLink: string,
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

export class DeleteResponse {
  constructor(
    public deleted: boolean,
    public error: null
  ) {}
}
