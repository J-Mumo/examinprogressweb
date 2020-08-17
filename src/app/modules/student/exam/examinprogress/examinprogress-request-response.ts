export class AnswerTransfer {
  constructor(
    public answerId: number,
    public answer: string
  ) { }
}

export class ExamQuestionTransfer {
  constructor(
    public questionId: number,
    public comprehensionQuestion: boolean,
    public question: string,
    public answerType: string,
    public answerTransfers: AnswerTransfer[]
  ) { }
}

export class ExamSectionTransfer {
  constructor(
    public sectionId: number,
    public sectionName: string,
    public description: string,
    public sectionComplete: boolean,
    public examQuestionTransfer: ExamQuestionTransfer
  ) { }
}

export class ExaminprogressResponse {
  constructor(
    public examSectionTransfer: ExamSectionTransfer,
    public examComplete: boolean
  ) { }
}

export class AnswerRequest {
  constructor(
    public examTokenId: number,
    public questionId: number,
    public answerIds: number[],
    public answerText: string
  ) {}
}

export class SkipQuestionRequest {
  constructor(
    public examTokenId: number,
    public questionId: number
  ) {}
}
