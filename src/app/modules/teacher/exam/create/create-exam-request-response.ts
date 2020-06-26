export class ExamTimerTypeTransfer {
  constructor(
    public examTimerTypeId: number,
    public name: string
  ) {}
}

export class CreateExamInitialData {
  constructor(
    public examTimerTypeTransfers: ExamTimerTypeTransfer[]
  ) {}
}

export class CreateExamRequest {
  constructor(
    public name: string,
    public description: string,
    public duration: string,
    public examTimerTypeId: number
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number,
  ) {}
}
