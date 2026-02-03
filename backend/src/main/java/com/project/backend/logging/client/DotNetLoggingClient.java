package com.project.backend.logging.client;

import com.project.backend.logging.dto.ApiLogRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DotNetLoggingClient {

    private final RestTemplate restTemplate = new RestTemplate();

    // .NET logging service URL
    private static final String LOGGING_API_URL =
            "http://localhost:5288/api/logs";

    public void sendLog(ApiLogRequest logRequest) {
        try {
            restTemplate.postForEntity(
                    LOGGING_API_URL,
                    logRequest,
                    Void.class
            );
        } catch (Exception ex) {
            // Logging must NEVER break business flow
            System.out.println("⚠ Logging service unavailable");
        }
    }
}
