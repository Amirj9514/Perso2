import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteTrackerService {
  private currentRoute: BehaviorSubject<string>;
  public currentRoute$: Observable<string>;

  constructor(private router: Router) {
    this.currentRoute = new BehaviorSubject<string>(this.router.url);
    this.currentRoute$ = this.currentRoute.asObservable();
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.next(event.urlAfterRedirects);
      });
  }

  getActiveRoute(): string {
    return this.currentRoute.getValue();
  }
}
