export class SectionTransfer {
  constructor(
    public sectionId: number,
    public name: string,
    public description: string
  )  {}
}

export class SectionsInitialData {
  constructor(
    public sectionTransfers: SectionTransfer[]
  ) {}
}
