export class StudentExamsInitialData {
  constructor(
    public examTransfers: StudentExamTransfer[]
  ) {}
}

export class StudentExamTransfer {
  constructor(
    public examId: number,
    public name: string,
    public description: string,
    public examTokenId: number,
    public examinprogress: boolean,
    public examNotStarted: boolean,
    public viewResults: boolean,
    public token: string
  ) {}
}
