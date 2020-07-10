export class MultipleChoiceAnswerTransfer {
  constructor(
    public answerId: number,
    public answerTxt: string,
    public correct: boolean
  ) {}
}

export class QuestionTransfer {
  constructor(
    public questionId: number,
    public questionType: string,
    public questionText: string,
    public score: number,
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
