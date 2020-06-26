import { Time } from '@angular/common';

export class SectionTransfer {
  constructor(
    public sectionId: number,
    public name: string,
    public description: string
  )  {}
}

export class EditExamInitialData {
  constructor(
    public name: string,
    public description: string,
    public duration: string,
    public sectionTransfers: SectionTransfer[]
    ) {}
}

export class EditExamRequest {
  constructor(
    public examId: number,
    public name: string,
    public description: string,
    public duration: string
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string,
  ) {}
}
