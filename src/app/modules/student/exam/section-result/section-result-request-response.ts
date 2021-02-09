export class AnswerResult {
  constructor(
    public answer: string,
    public selected: boolean
  ) {}
}

export class QuestionResult {
  constructor(
    public questionId: number,
    public question: string,
    public comprehensionQuestion: boolean,
    public textAnswer: boolean,
    public multipleAnswers: boolean,
    public singleAnswer: boolean,
    public pointsEarned: number,
    public questionTotalPoints: number,
    public answerResults: AnswerResult[],
    public questionResults: QuestionResult[]
  ) {}
}

export class SectionPerformanceInitialData {
  constructor(
    public studentName: string,
    public sectionName: string,
    public percentScore: number,
    public pointsEarned: number,
    public sectionTotalPoints: number,
    public questionResults: QuestionResult[]
  ) {}
}
