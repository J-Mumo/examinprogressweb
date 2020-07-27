export class CreateInviteRequest {
  constructor(
    public examId: number,
    public examStartDate: Date,
    public examEndDate: Date,
    public pausable: boolean,
    public examStartTime: string
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number,
  ) {}
}
