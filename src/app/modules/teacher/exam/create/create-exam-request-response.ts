import { Time } from '@angular/common';

export class ExamRequest {
  constructor(
    public name: string,
    public description: string,
    public startDate: Date,
    public startTime: string,
    public duration: string
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number,
  ) {}
}
