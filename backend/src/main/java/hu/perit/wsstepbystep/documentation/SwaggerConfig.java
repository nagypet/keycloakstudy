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

package hu.perit.wsstepbystep.documentation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * @author Peter Nagy
 */


@Configuration
public class SwaggerConfig {

	private static final Contact DEFAULT_CONTACT = new Contact(
			"Peter Nagy", "http://...", "nagy.peter.home@gmail.com");

	private static final ArrayList<VendorExtension> VENDOR_EXTENSIONS = new ArrayList<>();

	private static final ApiInfo DEFAULT_API_INFO = new ApiInfo(
			"WS step-by-step",
			"This is an open source project for educational purposes",
			"1.0",
			"urn:tos",
			DEFAULT_CONTACT,
			"Apache License, Version 2.0",
			"https://www.apache.org/licenses/LICENSE-2.0",
			VENDOR_EXTENSIONS);

	private static final Set<String> DEFAULT_PRODUCES_AND_CONSUMES = new HashSet<>(Arrays.asList("application/json"));

	private static final List<SecurityScheme> DEFAULT_SECURITY_SCHEME = new ArrayList<>(Arrays.asList(
			new BasicAuth("basicAuth"),
			new ApiKey("Bearer",
					"Authorization",
					"header")
	));

	/**
	 * @return Docket
	 */
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2) //
				.apiInfo(DEFAULT_API_INFO) //
				.produces(DEFAULT_PRODUCES_AND_CONSUMES) //
				.consumes(DEFAULT_PRODUCES_AND_CONSUMES) //
				.securitySchemes(DEFAULT_SECURITY_SCHEME) //
				.useDefaultResponseMessages(false) //
				.select().apis(RequestHandlerSelectors.any()) //
				.paths(PathSelectors.any()) //
				.build();
	}
}
