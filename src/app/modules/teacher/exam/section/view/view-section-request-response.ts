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

export class ViewSectionInitialData {
  MultipleChoiceQuestionTransfer: any;
  constructor(
    public name: string,
    public description: string,
    public duration: string,
    public questionTransfers: QuestionTransfer[]
  ) {}
}
