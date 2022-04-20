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

package hu.perit.wsstepbystep.auth;

import hu.perit.spvitamin.spring.security.auth.SimpleHttpSecurityBuilder;
import hu.perit.spvitamin.spring.security.keycloak.SimpleKeycloakWebSecurityConfigurerAdapter;
import hu.perit.wsstepbystep.rest.api.BookApi;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * #know-how:simple-httpsecurity-builder
 *
 * @author Peter Nagy
 */

@EnableWebSecurity
@Slf4j
public class WebSecurityConfig
{

    /*
     * ============== Order(1) =========================================================================================
     */
    @KeycloakConfiguration
    @Order(1)
    @DependsOn(value = "SpvitaminSpringContext")
    public static class Order1 extends SimpleKeycloakWebSecurityConfigurerAdapter
    {
        /**
         * This is a global configuration, will be applied to all oder configurer adapters
         *
         * @param auth
         * @throws Exception
         */
        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception
        {
            auth.authenticationProvider(keycloakAuthenticationProvider());
        }


        @Override
        protected void configure(HttpSecurity http) throws Exception
        {
            scope(http,
                    //"/sso/**",
                    BookApi.BASE_URL_BOOKS + "/**"
            )
                    .authorizeRequests()
                    .antMatchers(HttpMethod.GET, BookApi.BASE_URL_BOOKS + "/**").hasRole("VIEWER")
                    .antMatchers(HttpMethod.POST, BookApi.BASE_URL_BOOKS + "/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.PUT, BookApi.BASE_URL_BOOKS + "/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, BookApi.BASE_URL_BOOKS + "/**").hasRole("ADMIN")
                    .anyRequest().denyAll();

            configureKeycloak(http);
        }
    }


    /*
     * ============== Order(2) =========================================================================================
     */
    @Configuration
    @Order(2)
    public static class Order2 extends WebSecurityConfigurerAdapter
    {

        @Override
        protected void configure(HttpSecurity http) throws Exception
        {
            SimpleHttpSecurityBuilder.newInstance(http)
                    .scope(
                            "/",
                            "/fe-app/**"
                    )
                    .authorizeRequests()
                    .anyRequest().permitAll();

            SimpleHttpSecurityBuilder.afterAuthorization(http).basicAuth();

            //http.addFilterAfter(new PostAuthenticationFilter(), SessionManagementFilter.class);
        }
    }

}
