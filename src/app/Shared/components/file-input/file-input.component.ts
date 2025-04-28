import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileUpload, FileSelectEvent } from 'primeng/fileupload';
import { CustomToastService } from '../../services/custom-toast.service';
import { SharedService } from '../../services/shared.service';
import { ApplicantService } from '../../services/applicant.service';
import { Subject, take, takeUntil } from 'rxjs';
import { Dialog } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [FileUpload, CommonModule, Dialog, ProgressSpinnerModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent implements OnChanges, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() documentList: any[] = [];
  @Input() lable: string = '';
  @Input() applicatanData: any;
  @Input() controlName: string = '';
  @Input() callFrom: 'applicant' | 'employee' = 'applicant';
  @Output() uploadFile = new EventEmitter<any>();
  @Output() deleteFile = new EventEmitter<any>();
  private destroy$ = new Subject<void>();
  private destroy2$ = new Subject<void>();
  private destroy3$ = new Subject<void>();

  showDialog: boolean = false;

  file: File | null = null;
  selectedFile: any = null;
  isSelected: boolean = false;
  constructor(
    private toastS: CustomToastService,
    private sharedS: SharedService,
    private applicantS: ApplicantService,
    private fileS: FileService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.callFrom === 'applicant') {
      this.applicantS
        .getDocumentList()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.documentList = data ?? [];
          if (this.documentList.length > 0) {
            for (const doc of this.documentList) {
              if (doc.metadata === this.controlName) {
                this.selectedFile = {
                  ...doc,
                  additional_data: JSON.parse(doc.additional_data),
                };
                this.isSelected = this.fileS.checkIfFileExist(
                  this.selectedFile
                );
                break;
              }
            }
          }
        });

      this.fileS
        .getSelectedFiles()
        .pipe(takeUntil(this.destroy2$))
        .subscribe((file: any) => {
          if (this.selectedFile) {
            this.isSelected = this.fileS.checkIfFileExist(this.selectedFile);
          }
        });
    }

    if (this.callFrom === 'employee') {
      this.applicantS
        .getAuthorityDocumentList()
        .pipe(takeUntil(this.destroy3$))
        .subscribe((data) => {
          this.documentList = data ?? [];
          if (this.documentList.length > 0) {
            for (const doc of this.documentList) {
              if (doc.metadata === this.controlName) {
                this.selectedFile = {
                  ...doc,
                  additional_data: JSON.parse(doc.additional_data),
                };
                break;
              }
            }
          }
        });
    }
  }
  onBasicUploadAuto(event: FileSelectEvent) {
    const isValid = this.validateFile(event.currentFiles[0]);
    if (!isValid) return;
    this.file = event.currentFiles[0] ?? null;

    const fileData = {
      file: this.file,
      controlName: this.controlName,
    };
    this.uploadNewFile();
  }

  calFileSize(fileSizeInBytes: number) {
    if (!fileSizeInBytes) return '0 KB';
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;

    let formattedSize =
      fileSizeInMB >= 1
        ? `${fileSizeInMB.toFixed(2)} MB`
        : `${fileSizeInKB.toFixed(2)} KB`;

    return formattedSize;
  }

  deleteFileHandler(event: any) {
    event.stopPropagation();
    if (this.selectedFile) {
      this.showDialog = true;
      let url = `application-documents/${this.selectedFile.id}`;
      if (this.callFrom === 'employee') {
        url = `authority-documents/${this.selectedFile.id}`;
      }
      this.sharedS.sendDeleteRequest(url).subscribe({
        next: (resp) => {
          this.showDialog = false;
          if (resp.status === 200) {
            this.toastS.setToast({
              show: true,
              severity: 'success',
              message: 'File deleted successfully.',
            });
            const index = this.documentList.findIndex(
              (doc) => doc.id === this.selectedFile.id
            );

            if (index > -1) {
              this.documentList.splice(index, 1);
              this.applicantS.updateDocumentList(this.documentList);
              this.selectedFile = null;
              return;
            }

            this.selectedFile = null;
          }
        },
        error: (err: any) => {
          this.showDialog = false;
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Error in deleting file.',
          });
        },
      });
    }
  }

  downloadFile(event: any) {
    event.stopPropagation();
    if (this.file) {
      const url = URL.createObjectURL(this.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.file.name;
      link.click();
    } else {
      let url = `application-documents/${this.selectedFile.id}/file`;
      if (this.callFrom === 'employee') {
        url = `authority-documents/${this.selectedFile.id}/file`;
      }
      this.sharedS.getBlob(url).subscribe({
        next: (blob: any) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.selectedFile.name ?? '';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (err: any) => {
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Error in downloading file',
          });
        },
      });
    }
  }

  uploadNewFile() {
    const fileData = {
      size: this.file?.size,
      name: this.file?.name,
      type: this.file?.type,
    };

    let formData = new FormData();
    formData.append('file', this.file as Blob);
    formData.append('metadata', this.controlName);
    formData.append('additional_data', JSON.stringify(fileData));

    if (this.applicatanData) {
      this.showDialog = true;
      let url = `application-documents/upload`;
      if (this.callFrom === 'employee') {
        url = `authority-documents/upload`;
        formData.append('authority_id', this.applicatanData.id);
      } else {
        formData.append('application_id', this.applicatanData.id);
      }
      this.sharedS.sendPostRequest(url, formData).subscribe({
        next: (resp) => {
          this.showDialog = false;
          if (resp.status === 200) {
            let fileList = resp?.body?.application_documents ?? [];
            if(this.callFrom === 'applicant') {
              fileList =  resp?.body?.application_documents ?? [];
            }else{
              fileList =  resp?.body?.authority_documents ?? [];
            }
            for (const element of fileList) {
              if (element.metadata === this.controlName) {
                this.selectedFile = {
                  ...element,
                  additional_data: JSON.parse(element.additional_data),
                };

                this.documentList.push({
                  ...this.selectedFile,
                  additional_data: JSON.stringify(
                    this.selectedFile.additional_data
                  ),
                });

                if(this.callFrom === 'applicant') {
                  this.applicantS.updateDocumentList(this.documentList);
                }else{
                  this.applicantS.updateAuthorityDocumentList(this.documentList);
                }
               
                break;
              }
            }
            this.file = null;
            this.toastS.setToast({
              show: true,
              severity: 'success',
              message: 'File uploaded successfully.',
            });
          }
        },
        error: (err: any) => {
          this.showDialog = false;
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Error in uploading file.',
          });
        },
      });
    }
  }

  validateFile(file: File | null) {
    const allowedExtensions = [
      'jpg',
      'jpeg',
      'png',
      'doc',
      'docx',
      'csv',
      'xls',
      'xlsx',
      'pdf',
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes

    if (file) {
      const fileSize = file.size;
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();

      // Check file type
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: 'Invalid file type.',
        });
        return false;
      }
      // Check file size
      if (fileSize > maxFileSize) {
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: 'File size exceeds the 5MB limit.',
        });
        return false;
      }

      return true;
    }

    return false;
  }

  selectedFileHandler() {
    if (this.callFrom === 'employee') return;
    const file = this.selectedFile;
    if (!file) return;
    this.isSelected = !this.fileS.checkIfFileExist(file);
    this.fileS.filterFiles(file, this.applicatanData);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.destroy2$.next();
    this.destroy2$.complete();
    this.destroy3$.next();
    this.destroy3$.complete();
  }
}
