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
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard
{
  constructor(protected router: Router, protected keycloakAngular: KeycloakService, private authService: AuthService)
  {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
  {
    return new Promise(async (resolve, reject) =>
    {
      if (!this.authenticated)
      {
        this.authService.login(environment.baseUrl + '/' + route.url.toString());
        return;
      }
      console.log('Expected role: ', route.data.roles);
      console.log('User roles :', this.roles);
      const requiredRoles = route.data.roles;
      let granted: boolean = false;
      if (!requiredRoles || requiredRoles.length === 0)
      {
        granted = true;
      } else
      {
        for (const requiredRole of requiredRoles)
        {
          if (this.roles.indexOf(requiredRole) > -1)
          {
            granted = true;
            break;
          }
        }
      }

      if (!granted)
      {
        console.warn('access denied!');
        this.router.navigate(['/']);
      } else
      {
        console.log('access granted!');
      }
      resolve(granted);

    });
  }
}
