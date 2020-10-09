export class StudentExamResult {
  constructor(
    public studentName: string,
    public percentScore: number,
    public examInProgress: boolean,
    public viewPerformance: boolean,
    public finalizeScoring: boolean
  ) {}
}

export class ResultsInitialData {
  constructor(
    public studentExamResults: StudentExamResult[]
  ) {}
}
