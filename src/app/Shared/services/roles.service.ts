import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  private decodeToken() {
    let localStorageData = JSON.parse(
      localStorage.getItem('sharedData@perso2') || '{}'
    );
    if (localStorageData && localStorageData.token) {
      const token = localStorageData.token;
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken;
      }
    }
    return null;
  }

  public getRoles() {
    const decodedToken:any = this.decodeToken();
    return decodedToken?.role ?? '';  
  }

  public isAdmin(){
    return this.getRoles() === 'admin';
  }

  public getLoginUser(){
    const decodedToken:any = this.decodeToken();
    return decodedToken;
  }
}
