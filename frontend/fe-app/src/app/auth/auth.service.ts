/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from '@angular/core';
import {KeycloakEvent, KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

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

  private profile: KeycloakProfile | undefined;

  public getUsername(): string
  {
    return this.textWithDefault(this.profile?.username);
  }

  public getFullname(): string
  {
    let firstname = this.textWithDefault(this.profile?.firstName);
    return (!!firstname ? firstname + ' ' : '') + this.textWithDefault(this.profile?.lastName);
  }


  private keycloakEvents: Subject<KeycloakEvent> = this.keycloakService.keycloakEvents$;

  constructor(
    private keycloakService: KeycloakService
  )
  {
    this.loadUserProfile();

    this.keycloakEvents.subscribe({
      next: (e: KeycloakEvent) =>
      {
        if (e.type == KeycloakEventType.OnAuthSuccess)
        {
          console.log('Keycloak event: AuthSuccess');
          this._authenticated = true;
        }
        if (e.type == KeycloakEventType.OnAuthLogout)
        {
          console.log('Keycloak event: AuthLogout');
          this._authenticated = false;
        }
        if (e.type == KeycloakEventType.OnTokenExpired)
        {
          console.log('Keycloak event: TokenExpired');
          //keycloakService.updateToken();
        }
        if (e.type == KeycloakEventType.OnAuthRefreshSuccess)
        {
          console.log('Keycloak event: AuthRefreshSuccess');
        }
      }
    });
  }


  public login(redirectUrlSegment?: string): Promise<void>
  {
    let redirectUrl = window.location.origin + environment.baseHref + '/' + (redirectUrlSegment !== undefined ? redirectUrlSegment : '');

    console.log('Starting Keycloak login. Redirect Uri: ' + redirectUrl);
    return this.keycloakService.login({redirectUri: redirectUrl}).then(() =>
    {
      this.loadUserProfile();
    });
  }


  private loadUserProfile()
  {
    this.keycloakService.isLoggedIn().then(() =>
    {
      this.keycloakService.loadUserProfile().then(profile =>
      {
        console.log(profile);
        this._authenticated = true;
        this.profile = profile;
      }, (error) =>
      {
        this._authenticated = false;
        this.profile = undefined;
        //console.log(error);
      });
    });
  }

  public logout()
  {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;
    let redirectUrl = protocol + '//' + host + ':' + port + '/' + environment.baseUrl + '/';

    window.location.href = environment.keycloakUrl + '/realms/perit/protocol/openid-connect/logout?redirect_uri=' + redirectUrl;

    this.keycloakService.logout(redirectUrl).then(() =>
    {
    }, error =>
    {
      console.error(error);
    });

    this._authenticated = false;
    this.profile = undefined;
  }


  private textWithDefault(text: string | null | undefined): string
  {
    return !!text ? text : '';
  }
}
