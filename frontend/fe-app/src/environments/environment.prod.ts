import {KeycloakOptions} from 'keycloak-angular';

const keycloakUrl = 'http://keycloak:8180/auth';

const keycloakConfig: KeycloakOptions = {
  config: {
    url: keycloakUrl,
    realm: 'perit',
    clientId: 'keycloak-study-fe'
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/fe-app/assets/silent-check-sso.html'
  },
};

export const environment = {
  production: true,
  keycloakOptions: keycloakConfig,
  keycloakUrl: keycloakUrl,
  baseUrl: 'fe-app',
  baseHref: '/fe-app/#'
};
