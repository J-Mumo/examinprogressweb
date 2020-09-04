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
    public questionTime: number,
    public questionTransfer: ExamQuestionTransfer,
    public answerType: string,
    public answerTransfers: AnswerTransfer[]
  ) { }
}

export class ExamSectionTransfer {
  constructor(
    public sectionId: number,
    public sectionName: string,
    public description: string,
    public sectionTime: number,
    public sectionComplete: boolean,
    public examQuestionTransfer: ExamQuestionTransfer
  ) { }
}

export class ExaminprogressResponse {
  constructor(
    public examSectionTransfer: ExamSectionTransfer,
    public examComplete: boolean,
    public timedPerExam: boolean,
    public timedPerSection: boolean,
    public timedPerQuestion: boolean,
    public examTime: number,
    public pausable: boolean
  ) { }
}

export class AnswerRequest {
  constructor(
    public examTokenId: number,
    public pause: boolean,
    public questionId: number,
    public answerIds: number[],
    public answerText: string
  ) {}
}

export class SkipQuestionRequest {
  constructor(
    public examTokenId: number,
    public questionId: number,
    public pause: boolean
  ) {}
}
