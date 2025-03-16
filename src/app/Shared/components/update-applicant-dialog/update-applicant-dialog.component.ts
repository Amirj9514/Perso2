import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedService } from '../../services/shared.service';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
  selector: 'app-update-applicant-dialog',
  standalone: true,
  imports: [Dialog, ProgressSpinnerModule],
  templateUrl: './update-applicant-dialog.component.html',
  styleUrl: './update-applicant-dialog.component.scss',
})
export class UpdateApplicantDialogComponent implements OnInit {
  @Input() showUpdateDialog: {
    show: boolean;
    applicantData: any;
    data: any;
  } | null = null;

  @Output() closeDialog = new EventEmitter();
  showDialog: boolean = false;
  updateData: any;
  applicantData: any;

  constructor(
    private sharedS: SharedService,
    private toastS: CustomToastService
  ) {}

  ngOnInit(): void {
    if (this.showUpdateDialog) {
      this.showDialog = this.showUpdateDialog.show ?? false;
      this.updateData = this.showUpdateDialog.data ?? null;
      this.applicantData = this.showUpdateDialog.applicantData ?? null;

      this.updateApplicantDialog();
    }
  }

  updateApplicantDialog() {
    const url = `applications/${this.applicantData.id}`;

    this.sharedS.sendPutRequest(url, this.updateData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastS.setToast({
            show: true,
            message: 'Datensatz erfolgreich hinzugefügt',
          });
        }

        this.closeDialog.emit();
      },
      error: (error) => {
        this.closeDialog.emit();
      },
    });
  }
}
