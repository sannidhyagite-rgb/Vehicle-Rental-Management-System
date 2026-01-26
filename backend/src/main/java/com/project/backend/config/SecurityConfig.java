package com.project.backend.config;

import com.project.backend.auth.jwt.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF (JWT based auth)
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                // ===== ALLOW PREFLIGHT REQUESTS =====
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ===== PUBLIC ENDPOINTS =====
                .requestMatchers(
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/api/auth/**"
                ).permitAll()

                // ✅ PUBLIC VEHICLES API (HOME PAGE – BEFORE LOGIN)
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/public/**"
                ).permitAll()

                // ===== ROLE BASED ACCESS =====
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/api/vendor/**").hasAuthority("VENDOR")
                .requestMatchers("/api/customer/**").hasAuthority("CUSTOMER")
                .requestMatchers("/api/license/**").hasAuthority("CUSTOMER")

                // ===== AUTHENTICATED =====
                .requestMatchers("/api/users/**").authenticated()

                // ===== EVERYTHING ELSE =====
                .anyRequest().authenticated()
            )

            // Stateless session (JWT)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ===== CORS CONFIG =====
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
