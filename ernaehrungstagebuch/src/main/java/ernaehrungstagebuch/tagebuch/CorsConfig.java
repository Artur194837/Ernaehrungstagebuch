package ernaehrungstagebuch.tagebuch;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig { //Um Antworten von einer anderen IP Adresse als localhost zu erlauben

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Wende CORS auf alle Endpunkte an
                        .allowedOrigins("http://192.168.0.102:8080", "http://localhost:8080") 
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Erlaube die notwendigen HTTP-Methoden
                        .allowedHeaders("*") // Erlaube alle Header
                        .allowCredentials(true) // Wichtig, wenn du Sessions oder Cookies verwendest
                        .maxAge(3600); // Wie lange das Ergebnis der Preflight-Anfrage gecached werden soll
            }
        };
    }
}
