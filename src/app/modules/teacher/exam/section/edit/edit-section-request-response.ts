export class EditSectionInitialData {
  constructor(
    public name: string,
    public description: string,
    public duration: string
  ) {}
}

export class EditSectionRequest {
  constructor(
    public sectionId: number,
    public name: string,
    public description: string,
    public duration: string
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) {}
}
