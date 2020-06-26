export class MultipleChoiceAnswerTransfer {
  constructor(
    public answerId: number,
    public answerTxt: string
  ) {}
}

export class MultipleChoiceQuestionTransfer {
  constructor(
    public questionId: number,
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
    public multipleChoiceQuestionTransfers: MultipleChoiceQuestionTransfer[]
  ) {}
}
