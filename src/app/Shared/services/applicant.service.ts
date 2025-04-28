import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  private selectedApplicant = new BehaviorSubject<any>(null);
  private applicantDocList = new BehaviorSubject<any>(null);

  private authorityDocList = new BehaviorSubject<any>(null);
  constructor() { }


  updateSelectedApplicant(applicant: any) {
    this.selectedApplicant.next(applicant);
  }

  getSelectedApplicant() {
    return this.selectedApplicant.asObservable();
  }

  updateDocumentList(docList: any) {
    this.applicantDocList.next(docList);
  }

  getDocumentList() {
    return this.applicantDocList.asObservable();
  }

  updateAuthorityDocumentList(docList: any) {
    this.authorityDocList.next(docList);
  }

  getAuthorityDocumentList() {
    return this.authorityDocList.asObservable();
  }

}
