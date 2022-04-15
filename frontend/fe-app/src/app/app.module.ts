import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {TabSetComponent} from './tab-set/tab-set.component';
import {SomeContentComponent} from './some-content/some-content.component';
import {AppAuthGuard} from './auth/app.authguard';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AuthService} from './auth/auth.service';
import {initializeKeycloak} from './auth/keycloak-init.factory';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';

export const routes: Routes = [
  {path: '', redirectTo: environment.baseUrl + '/public', pathMatch: 'full'},
  {path: environment.baseUrl, redirectTo: environment.baseUrl + '/public', pathMatch: 'full'},
  {
    path: environment.baseUrl, component: TabSetComponent,
    children: [
      {path: 'public', component: SomeContentComponent},
      {path: 'approvals', component: SomeContentComponent, canActivate: [AppAuthGuard], data: {roles: ['ROLE_APPROVER']}},
      {path: 'administration', component: SomeContentComponent, canActivate: [AppAuthGuard], data: {roles: ['ROLE_ADMIN']}},
    ],
  },
  //{path: 'fe-app/login', component: LoginComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TabSetComponent,
    SomeContentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpClientModule,
    KeycloakAngularModule,
  ],
  providers: [
    AuthService,
    KeycloakService,
    AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule
{
}
