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
  @Output() uploadFile = new EventEmitter<any>();
  @Output() deleteFile = new EventEmitter<any>();
  private destroy$ = new Subject<void>();
  private destroy2$ = new Subject<void>();

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
              this.isSelected = this.fileS.checkIfFileExist(this.selectedFile);
              break;
            }
          }
        }
      });


      this.fileS.getSelectedFiles().pipe(takeUntil(this.destroy2$)).subscribe((file:any)=>{
        if (this.selectedFile) {
          this.isSelected = this.fileS.checkIfFileExist(this.selectedFile);
        }
      })
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
      this.sharedS
        .sendDeleteRequest(`application-documents/${this.selectedFile.id}`)
        .subscribe({
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

  downloadFile(event:any) {
    event.stopPropagation();
    if (this.file) {
      const url = URL.createObjectURL(this.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.file.name;
      link.click();
    } else {
      const url = `application-documents/${this.selectedFile.id}/url`;
      this.sharedS.sendGetRequest(url).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            const fileUrl = res.body.url;
            window.open(fileUrl, '_blank');
            // this.sharedS.sendDownloadRequest(fileUrl);
          }
        },
        error: (err: any) => {
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Error in deleting file.',
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
    formData.append('application_id', this.applicatanData.id);
    formData.append('metadata', this.controlName);
    formData.append('additional_data', JSON.stringify(fileData));

    if (this.applicatanData) {
      this.showDialog = true;
      this.sharedS
        .sendPostRequest('application-documents/upload', formData)
        .subscribe({
          next: (resp) => {
            this.showDialog = false;
            if (resp.status === 200) {
              const fileList = resp?.body?.application_documents ?? [];
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
                  this.applicantS.updateDocumentList(this.documentList);
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
    const file = this.selectedFile;
    if(!file) return;
    this.isSelected = !this.fileS.checkIfFileExist(file);
    this.fileS.filterFiles(file , this.applicatanData);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.destroy2$.next();
    this.destroy2$.complete();
  }
}
