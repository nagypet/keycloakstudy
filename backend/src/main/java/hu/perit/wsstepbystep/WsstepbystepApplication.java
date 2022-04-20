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

package hu.perit.wsstepbystep;

import hu.perit.spvitamin.spring.environment.EnvironmentPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"hu.perit.spvitamin", "hu.perit.wsstepbystep"})
public class WsstepbystepApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(WsstepbystepApplication.class);
		application.addListeners(new EnvironmentPostProcessor());
		application.run(args);
	}

}
