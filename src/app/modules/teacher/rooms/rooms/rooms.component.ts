import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamsInitialData, ExamTransfer } from './rooms-request-response';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  initialData: ExamsInitialData;
  exams: MatTableDataSource<ExamTransfer>;
  examsColumns: string[] = ['exam', 'enterRoom'];

  constructor(
    private roomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.roomsService.getInitialData().subscribe(
      (initialData: ExamsInitialData) => {
        this.initialData = initialData;
        this.exams = new MatTableDataSource(initialData.examTransfers);
      }
    );
  }

  applyExamFilter(filterValue: string) {
    this.exams.filter = filterValue.trim().toLowerCase();
  }
}
