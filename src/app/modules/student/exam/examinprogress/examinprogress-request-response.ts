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

export class SectionResult {
  constructor(
    public sectionName: string,
    public percentScore: number
  ) { }
}

export class ExamResult {
  constructor(
    public completeResult: boolean,
    public percentScore: number,
    public sectionResults: SectionResult[]
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
    public examTokenNotFound: boolean,
    public examNotFound: boolean,
    public examHasStarted: boolean,
    public examComplete: boolean,
    public examExpired: boolean,
    public timedPerExam: boolean,
    public timedPerSection: boolean,
    public timedPerQuestion: boolean,
    public pausable: boolean,
    public paused: boolean,
    public examHasNoQuestions: boolean,
    public examId: number,
    public examTime: number,
    public examStartDate: Date,
    public examStartTime: string,
    public examSectionTransfer: ExamSectionTransfer,
    public examResult: ExamResult
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

export class SkipSectionRequest {
  constructor(
    public examTokenId: number,
    public sectionId: number,
    public pause: boolean
  ) {}
}

export class RtcTokenResponse {
  constructor(
    public token: string,
    public uid: number
  ) {}
}

export class RtcTokenRequest {
  constructor(
    public channelName: string, 
    public student: boolean, 
    public examTokenId: number
  ) {}
}

export class TerminatedResponse {
  constructor(
    public terminated: boolean
  ) {}
}