package com.libraryapp.springbootlibrary.configuration;

import com.libraryapp.springbootlibrary.entity.Book;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {
    private String allowedOrigins = "http://localhost:3000";

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };

        config.exposeIdsFor(Book.class);

        disableHttpMethods(Book.class, config, unsupportedActions);

        /* Configure CORs mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class entityClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(entityClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
}
