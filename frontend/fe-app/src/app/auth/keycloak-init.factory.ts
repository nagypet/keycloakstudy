import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

export function initializeKeycloak(keycloakService: KeycloakService)
{
  return () => keycloakService.init(environment.keycloakOptions);
}
