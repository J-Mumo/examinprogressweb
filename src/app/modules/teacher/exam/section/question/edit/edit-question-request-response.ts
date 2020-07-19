export class MultipleChoiceAnswerTransfer {
  constructor(
    public answerText: string,
    public correct: boolean
  ) {}
}

export class EditQuestionInitialData {
  constructor(
    public comprehensionQuestion: boolean,
    public comprehensionSubQuestion: boolean,
    public examTimedByQuestion: boolean,
    public question: string,
    public duration: string,
    public score: number,
    public answerType: string,
    public multipleChoiceAnswerTransfers: MultipleChoiceAnswerTransfer[]
  ) {}
}

export class MultipleChoiceQuestionAnswerRequest {
  constructor(
    public answerText: string,
    public correct: boolean,
  ) {}
}

export class EditQuestionRequest {
  constructor(
    public questionId: number,
    public questionText: string,
    public score: number,
    public duration: string,
    public answerType: string,
    public multipleChoiceQuestionAnswerRequests: MultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number
  ) {}
}
