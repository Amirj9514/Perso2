import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, first, last } from 'rxjs';
import { SharedService } from './shared.service';
import { file } from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private sharedS = inject(SharedService);
  private groupedFiles: any[] = [];
  private groupedFilesSubject = new BehaviorSubject<any[]>([]);
  private selectedFilesSubject = new BehaviorSubject<any[]>([]);
  constructor() { }


  getSelectedFiles() {
    return this.selectedFilesSubject.asObservable();
  }

  filterFiles(file: any , applicantData:any) {
    let selectedFiles:any[] = this.selectedFilesSubject.value ?? [];
    let isSelected = this.checkIfFileExist(file);
    const applicant ={
      id: applicantData?.id ?? '',
      age: applicantData?.age ?? '',
      first_name: applicantData?.first_name ?? '',
      last_name: applicantData?.last_name ?? '',
    }
    const fileData = {
      ...file,
      applicant: applicant,
    }

    this.groupFile(fileData , applicant);

    
    if(!isSelected){
      selectedFiles.push(fileData);
    }else{
      for (let index = 0; index < selectedFiles.length; index++) {
        const element = selectedFiles[index];
        if (element.id === file.id) {
          selectedFiles.splice(index, 1);
          break;
        }
      }
    }

    this.selectedFilesSubject.next(selectedFiles);
  }


  checkIfFileExist(file:any){
    let selectedFiles:any[] = this.selectedFilesSubject.value ?? [];
    let isSelected = false;
    for (let index = 0; index < selectedFiles.length; index++) {
      const element = selectedFiles[index];
      if (element.id === file.id) {
        isSelected = true;
        break;
      }
    }
    return isSelected;
  }



  dowloadFile(){
    const fileLinks: string[] = ['https://jsonplaceholder.typicode.com/posts/1' , 'https://jsonplaceholder.typicode.com/posts/2' , 'https://jsonplaceholder.typicode.com/posts/3'];
    this.sharedS.downloadFilesAsZip(fileLinks);
  }

  groupFile(file:any , applicantData:any){

    const isExist = this.checkIsFileExist(file , applicantData);
    if(isExist){
      this.setGroupedFiles(this.groupedFiles);
      return;
    }
    if(this.groupedFiles.length<1){
      const data = {
        applicant: applicantData,
        files:[file],
      }
      this.groupedFiles.push(data);
    }else{
      const index = this.groupedFiles.findIndex((data:any) => data.applicant.id === applicantData.id);
      if(index > -1){
        this.groupedFiles[index].files.push(file);
      }else{
        const data = {
          applicant: applicantData,
          files:[file],
        }
        this.groupedFiles.push(data);
      }
    }
    this.setGroupedFiles(this.groupedFiles);
  }

  checkIsFileExist(file:any , applicantData:any){
    let isExist = false;
    for (let index = 0; index < this.groupedFiles.length; index++) {
      const element = this.groupedFiles[index];
      if (element.applicant.id === applicantData.id) {
        const fileIndex = element.files.findIndex((data:any) => data.id === file.id);
        if(fileIndex > -1){
          element.files.splice(fileIndex, 1);
          this.groupedFiles[index] = element;
          isExist = true;
        }
        break;
      }
    }

    return isExist;
  }


  getGroupedFiles(){
    return this.groupedFilesSubject.asObservable();
  }
  setGroupedFiles(groupedFiles:any[]){
    this.groupedFilesSubject.next(groupedFiles);
  }



  selectAllFiles(files:any[] , applicantData:any){
    if(files?.length > 0){
      const applicant ={
        id: applicantData?.id ?? '',
        age: applicantData?.age ?? '',
        first_name: applicantData?.first_name ?? '',
        last_name: applicantData?.last_name ?? '',
      }
      
      let preparedFiles:any[]= []

      
      files.map((file:any)=>{
        let selectedFiles:any[] = this.selectedFilesSubject.value ?? [];
        let isSelected = this.checkIfFileExist(file);
        const fileData = {
          ...file,
          additional_data: JSON.parse(file?.additional_data) ?? {},
          applicant: applicant,
        }

        preparedFiles.push(fileData);

        if(!isSelected){
          selectedFiles.push(fileData);
        }
        this.selectedFilesSubject.next(selectedFiles);
      })
      this.addInGroupedFile(preparedFiles ,applicant);
    }
  }

  unSelectAllFiles(files:any[] , applicantData:any){
    if(files?.length > 0){
      const applicant ={
        id: applicantData?.id ?? '',
        age:applicantData?.age ?? '',
        first_name: applicantData?.first_name ?? '',
        last_name: applicantData?.last_name ?? '',
      }
      this.unselectGroupFile(applicant)
      files.map((file:any)=>{
        let selectedFiles:any[] = this.selectedFilesSubject.value ?? [];
        let isSelected = this.checkIfFileExist(file);
        if(isSelected){
          for (let index = 0; index < selectedFiles.length; index++) {
            const element = selectedFiles[index];
            if (element.id === file.id) {
              selectedFiles.splice(index, 1);
              break;
            }
          }
        }
        this.selectedFilesSubject.next(selectedFiles);
      })
    }
  }


  addInGroupedFile(file:any , applicantData:any){
    if(this.groupedFiles.length<1){
      const data = {
        applicant: applicantData,
        files:file,
      }
      this.groupedFiles.push(data);
    }else{
      const indexs = this.groupedFiles.findIndex((data:any) => data.applicant.id === applicantData.id);
      if(indexs > -1){
        this.groupedFiles[indexs].files = file;
      }else{
        const data = {
          applicant: applicantData,
          files:file,
        }
        this.groupedFiles.push(data);
      }
    }
    this.setGroupedFiles(this.groupedFiles);
  }

  unselectGroupFile(applicantData:any){
    if(this.groupedFiles.length>0){
      const index = this.groupedFiles.findIndex((data:any) => data.applicant.id === applicantData.id);
      if(index > -1){
        this.groupedFiles[index].files = [];
      }
    }
    this.setGroupedFiles(this.groupedFiles);
  }


  getfileListLength(applicantData:any){
    const groupedFiles = this.groupedFilesSubject.value ?? [];
    const index = groupedFiles.findIndex((data:any) => data.applicant.id === applicantData.id);
    if(index > -1){
      return groupedFiles[index].files.length;
    }else{  
      return 0;
    }
    
  }
}
