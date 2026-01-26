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
            // ❌ Disable CSRF (JWT based auth)
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS
            .cors(cors -> {})

            // 🔐 Authorization rules
            .authorizeHttpRequests(auth -> auth

                // ✅ Allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ Public auth & swagger APIs
                .requestMatchers(
                        "/api/auth/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs/**"
                ).permitAll()

                // ✅ Public vehicles API (home page)
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/public/**"
                ).permitAll()

                // 🔒 Role-based APIs
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/api/vendor/**").hasAuthority("VENDOR")
                .requestMatchers("/api/customer/**").hasAuthority("CUSTOMER")
                .requestMatchers("/api/license/**").hasAuthority("CUSTOMER")

                // 🔐 Authenticated users
                .requestMatchers("/api/users/**").authenticated()

                // 🔐 Everything else
                .anyRequest().authenticated()
            )

            // 🧾 Stateless JWT session
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔑 JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // =========================
    // CORS CONFIGURATION
    // =========================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow Vite frontend ports
        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
