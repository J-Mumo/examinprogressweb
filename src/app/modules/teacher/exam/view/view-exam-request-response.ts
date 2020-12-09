export class SectionTransfer {
  constructor(
    public sectionId: number,
    public name: string,
    public description: string
  )  {}
}

export class ViewExamInitialData {
  constructor(
    public name: string,
    public description: string,
    public duration: string,
    public sectionTransfers: SectionTransfer[],
    public hasInvites: boolean,
    public inviteId: number
    ) {}
}

export class DeleteResponse {
  constructor(
    public deleted: boolean,
    public error: null
  ) {}
}
