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
