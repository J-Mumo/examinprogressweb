export class ExamTransfer {
  constructor(
    public examId: number,
    public name: string,
    public description: string
  ) {}
}

export class ShowExamsInitialData {
  constructor(
    public examTransfers: ExamTransfer[]
  ) {}
}
