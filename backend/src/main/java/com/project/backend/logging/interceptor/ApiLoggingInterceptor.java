package com.project.backend.logging.interceptor;

import com.project.backend.logging.client.DotNetLoggingClient;
import com.project.backend.logging.dto.ApiLogRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Set;
import java.util.UUID;

@Component
public class ApiLoggingInterceptor implements HandlerInterceptor {

    private final DotNetLoggingClient loggingClient;

    private static final Set<String> IGNORE_PATHS = Set.of(
            "/swagger",
            "/v3/api-docs",
            "/favicon.ico",
            "/error"
    );

    public ApiLoggingInterceptor(DotNetLoggingClient loggingClient) {
        this.loggingClient = loggingClient;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) {

        request.setAttribute("startTime", System.currentTimeMillis());

        // 🔥 Generate CorrelationId once per request
        request.setAttribute("correlationId", UUID.randomUUID().toString());

        return true;
    }

    @Override
    public void afterCompletion(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            Exception ex) {

        String path = request.getRequestURI();

        // Ignore non-business endpoints
        if (IGNORE_PATHS.stream().anyMatch(path::contains)) return;
        if (!path.startsWith("/api")) return;

        long startTime = (long) request.getAttribute("startTime");
        long durationMs = System.currentTimeMillis() - startTime;

        // 🔥 Log ONLY slow or failed APIs
        if (durationMs < 300 && ex == null && response.getStatus() < 400) {
            return;
        }

        ApiLogRequest log = new ApiLogRequest();
        log.setServiceName("SpringBoot");
        log.setPath(path);
        log.setHttpMethod(request.getMethod());
        log.setDurationMs(durationMs);
        log.setCorrelationId(
                (String) request.getAttribute("correlationId")
        );

        // 🔐 Extract user context
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated()
                && !"anonymousUser".equals(auth.getPrincipal())) {

            // You can customize this based on your UserDetails
            log.setUserId(null); // 👈 set later if using custom UserDetails
            log.setRole(auth.getAuthorities().iterator().next().getAuthority());
        } else {
            log.setUserId(null);
            log.setRole("ANONYMOUS");
        }

        if (ex != null) {
            log.setMessage("EXCEPTION: " + ex.getMessage());
        } else {
            log.setMessage("API Executed");
        }

        loggingClient.sendLog(log);
    }
}
