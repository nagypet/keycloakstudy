import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
  loggedIn = false;
  username = '';

  constructor(public authService: AuthService,
              public keycloakService: KeycloakService,
              private router: Router)
  {
  }

  ngOnInit(): void
  {
    this.keycloakService.isLoggedIn().then(() =>
    {
      this.keycloakService.loadUserProfile().then(v =>
      {
        this.username = this.textWithDefault(v.firstName) + ' ' + this.textWithDefault(v.lastName) + ' - ' + this.textWithDefault(v.username);
      });
      this.loggedIn = true;
    });
  }

  textWithDefault(text: string | null | undefined): string
  {
    return !!text ? text : '';
  }

  onLogout()
  {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    let redirectUrl = protocol + '//' + host + ':' + port + '/admin-gui/public';

    window.location.href = environment.keycloakUrl + '/realms/perit/protocol/openid-connect/logout?redirect_uri=' + redirectUrl;
  }
}
