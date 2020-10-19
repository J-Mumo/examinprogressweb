export class SectionResult {
  constructor(
    public sectionId: string,
    public sectionName: string,
    public percentScore: number,
    public pointsEarned: number,
    public sectionTotalPoints: number
  ) {}
}

export class ExamResult {
  constructor(
    public completeResult: boolean,
    public examName: string,
    public percentScore: number,
    public pointsEarned: number,
    public examTotalPoints: number,
    public sectionResults: SectionResult[]
  ) {}
}

export class ViewPerformanceInitialData {
  constructor(
    public studentName: string,
    public examResult: ExamResult
  ) {}
}

export class ViewPerformanceRequestInitialData {
  constructor(
    public studentId: number,
    public examId: number
  ) {}
}
