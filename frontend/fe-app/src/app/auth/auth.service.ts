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
