export class ExamTransfer {
  constructor(
    public examId: number,
    public name: string,
    public description: string
  ) {}
}

export class ExamsInitialData {
  constructor(
    public examTransfers: ExamTransfer[]
  ) {}
}

export class DeleteResponse {
  constructor(
    public deleted: boolean,
    public error: null
  ) {}
}
