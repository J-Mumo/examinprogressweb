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
    public startTime: Date,
    public duration: string,
    public complete: boolean,
    public sectionTransfers: SectionTransfer[]
    ) {}
}
