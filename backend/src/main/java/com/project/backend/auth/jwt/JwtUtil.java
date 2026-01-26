package com.project.backend.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 🔐 MUST be same for generate + validate
    private static final String SECRET =
            "THIS_IS_A_VERY_SECURE_SECRET_KEY_FOR_JWT_SIGNING_123456";

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    /* ================= GENERATE TOKEN ================= */
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)                  // ✅ SUBJECT = EMAIL
                .claim("role", role)                // optional
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /* ================= VALIDATE TOKEN ================= */
    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /* ================= EXTRACT EMAIL ================= */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /* ================= CLAIM UTILS ================= */
    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
