# keycloak study

This is a project for demonstrating purposes.

References:
- [Introducing Keycloak for Identity and Access Management](https://www.thomasvitale.com/introducing-keycloak-identity-access-management/)
- [Keycloak Basic Configuration for Authentication and Authorization](https://www.thomasvitale.com/keycloak-configuration-authentication-authorisation/)
- [Keycloak Authentication Flows, SSO Protocols and Client Configuration](https://www.thomasvitale.com/keycloak-authentication-flow-sso-client/)

## Setup

1. Start the PostgreSQL container (user: postgres, pwd: sa)
2. Create a new database with the name __keycloak__
3. Create a new schema with the name __keycloak__
4. Now start the keycloak container as well. This will initialize the database.
5. Import the realm from __realm-export.json__

![](docs/database.jpg)


## Links:
- Admin console: http://localhost:8180
- User account self-service: http://localhost:8180/auth/realms/perit/account
- keycloak.js: http://localhost:8180/auth/js/keycloak.js

## Authentication with username and password
This is the __Resource Owner Password Credentials Grant__ flow. __Direct Access Grants__ has to be enabled in the client.

Request
![](docs/auth_request.jpg)

Response
```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOTTR...",
    "expires_in": 300,
    "refresh_expires_in": 1800,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmYTI1ODczZi01Zj...",
    "token_type": "bearer",
    "not-before-policy": 0,
    "session_state": "d677dd79-efba-4c9a-99cc-01ddfffb6343",
    "scope": "profile email"
}
```

### Refresh

Once the access token has expired, we can refresh it by sending a POST request to the same URL as above, but containing the refresh token instead of username and password:

![](docs/refresh_request.jpg)

Keycloak will respond to this with a new access_token and refresh_token.

## Using Keycloak in Angular

References:
- [Keycloak integration](https://sairamkrish.medium.com/keycloak-integration-part-2-integration-with-angular-frontend-f2716c696a28)
- https://github.com/mauriciovigolo/keycloak-angular

![](docs/fe-1.jpg)
![](docs/fe-2.jpg)

### Steps

#### Install the following packages:
```typescript
"keycloak-angular": "^8.4.0",
"keycloak-js": "^16.1.1",
```

#### Initialize the keycloak service
environment.ts
```typescript
import {KeycloakOptions} from 'keycloak-angular';

const keycloakUrl = '/auth';

const keycloakConfig: KeycloakOptions = {
  config: {
    url: keycloakUrl,
    realm: 'perit',
    clientId: 'keycloak-study'
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri:
      window.location.origin + '/assets/silent-check-sso.html',
  },
};

export const environment = {
  production: false,
  keycloakOptions: keycloakConfig,
  keycloakUrl: keycloakUrl
};
```

keycloak-init.factory.ts
```typescript
export function initializeKeycloak(keycloakService: KeycloakService)
{
  return () => keycloakService.init(environment.keycloakOptions);
}
```
#### silent-check-sso.html
See the assets folder:
```html
<html>
  <body>
    <script>
      parent.postMessage(location.href, location.origin);
    </script>
  </body>
</html>
```
#### proxy
proxy.conf.js
```js
const PROXY_CONFIG = [
  {
    context: [
      "/auth/**",
    ],
    target: "http://localhost:8180",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
```
angular.json
```json
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "fe-app:build",
            "proxyConfig": "src/proxy.conf.js"
          },

```
#### guard
```typescript
@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard
{
  constructor(protected router: Router, protected keycloakAngular: KeycloakService)
  {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
  {
    return new Promise(async (resolve, reject) =>
    {
      if (!this.authenticated)
      {
        this.keycloakAngular.login();
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
```
#### router
```typescript
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
];
```

## Customizing the login theme

See the keycloak folder for a customized image containing a custom theme.

![](docs/perit_theme.jpg)
