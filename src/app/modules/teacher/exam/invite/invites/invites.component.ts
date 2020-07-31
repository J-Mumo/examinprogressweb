import { Component, OnInit } from '@angular/core';
import { InvitesService } from './invites.service';
import { InvitesInitialData, InviteTransfer } from './invites-request-response';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: InvitesInitialData;
  invites: MatTableDataSource<InviteTransfer>;
  invitesColumns: string[] = ['name', 'examStartDate', 'viewInvite', 'actions'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private invitesService: InvitesService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.invitesService.getInitialData(this.examId).subscribe(
      (initialData: InvitesInitialData) => {
        this.initialData = initialData;
        for (const i in initialData.inviteTransfers) {
          if (i !== null) {
            initialData.inviteTransfers[i].examStartDate = initialData.inviteTransfers[i].examStartDate.toString().
            split('T')[0];
          }
        }
        this.invites = new MatTableDataSource(initialData.inviteTransfers);
      }
    );
  }

  applyInviteFilter(filterValue: string) {
    this.invites.filter = filterValue.trim().toLowerCase();
  }
}
