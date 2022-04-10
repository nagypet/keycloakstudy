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
import {KeycloakService} from 'keycloak-angular';
import {AuthService} from './services/auth.service';
import {initializeKeycloak} from './auth/keycloak-init.factory';

export const routes: Routes = [
  {path: '', redirectTo: 'admin-gui/public', pathMatch: 'full'},
  {path: 'admin-gui', redirectTo: 'admin-gui/public', pathMatch: 'full'},
  {
    path: 'admin-gui', component: TabSetComponent,
    children: [
      {path: 'public', component: SomeContentComponent, canActivate: [AppAuthGuard], data: {roles: ['ROLE_VIEWER']}},
      {path: 'approvals', component: SomeContentComponent, canActivate: [AppAuthGuard], data: {roles: ['ROLE_APPROVER']}},
      {path: 'administration', component: SomeContentComponent, canActivate: [AppAuthGuard], data: {roles: ['ROLE_ADMIN']}},
    ],
  },
  //{path: 'admin-gui/login', component: LoginComponent},
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
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
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
