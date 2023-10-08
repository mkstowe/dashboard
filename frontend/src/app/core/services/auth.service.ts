import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isDemo = new BehaviorSubject<boolean>(true);

  constructor(private auth: Auth0Service) {
    auth.user$.subscribe((res) => {
      this._isDemo.next(res?.nickname === 'demo');
    });
  }

  public get user$() {
    return this.auth.user$;
  }

  public get isDemo$() {
    return this._isDemo.asObservable();
  }

  public get isLoggedIn$() {
    return this.auth.isAuthenticated$;
  }
}
