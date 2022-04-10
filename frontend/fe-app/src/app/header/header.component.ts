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

  constructor(public authService: AuthService,
              public keycloakService: KeycloakService,
              private router: Router)
  {
  }

  ngOnInit(): void
  {
    this.keycloakService.isLoggedIn().then(() =>
    {
      //this.keycloakService.loadUserProfile().then(v => console.log(v));
      //console.log(this.keycloakService.getUsername());
      this.loggedIn = true;
    });
  }

  onLogout()
  {
    window.location.href = environment.keycloakUrl + "/realms/perit/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/admin-gui/settings";
  }
}
