import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
)
{
  return () => keycloak.init(environment.keycloakOptions);
}
