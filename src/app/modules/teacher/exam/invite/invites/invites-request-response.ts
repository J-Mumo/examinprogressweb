export class InviteTransfer {
  constructor(
    public inviteId: number,
    public name: string,
    public examStartDate: string,
    public examEndDate: string,
    public pausable: boolean,
    public examStartTime: string
  ) {}
}

export class InvitesInitialData {
  constructor(
    public inviteTransfers: InviteTransfer[]
  ) {}
}
