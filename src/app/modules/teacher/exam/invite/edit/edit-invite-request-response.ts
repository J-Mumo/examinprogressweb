export class EditInviteInitialData {
  constructor(
    public name: string,
    public examStartDate: Date,
    public examEndDate: Date,
    public pausable: boolean,
    public examStartTime: string
  ) {}
}

export class EditInviteRequest {
  constructor(
    public inviteId: number,
    public name: string,
    public examStartDate: Date,
    public examEndDate: Date,
    public pausable: boolean,
    public examStartTime: string
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) {}
}
