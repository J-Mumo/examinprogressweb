export class MultipleChoiceAnswerTransfer {
  constructor(
    public answerId: number,
    public answerText: string,
    public correct: boolean,
    public answerType: string,
  ) {}
}

export class QuestionTransfer {
  constructor(
    public questionId: number,
    public questionType: string,
    public questionText: string,
    public score: number,
    public duration: string,
    public multipleChoiceAnswerTransfers: MultipleChoiceAnswerTransfer[]
  ) {}
}

export class ComprehensionQuestionTransfer {
  constructor(
    public question: string,
    public duration: string,
    public questionTransfers: QuestionTransfer[]
  ) {}
}

export class ViewQuestionInitialData {
  constructor(
    public comprehensionQuestion: boolean,
    public questionTransfer: QuestionTransfer,
    public comprehensionQuestionTransfer: ComprehensionQuestionTransfer
  ) {}
}

export class DeleteResponse {
  constructor(
    public deleted: boolean,
    public error: null
  ) {}
}
