import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private _authenticated = false;
  get authenticated(): boolean
  {
    return this._authenticated;
  }

  private _userName = '';
  get userName(): string
  {
    return this._userName;
  }

  constructor()
  {
  }
}
