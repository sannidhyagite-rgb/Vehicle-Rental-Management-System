package com.project.backend.auth.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${SENDGRID_API_KEY}")
    private String sendGridApiKey;

    @Value("${SENDGRID_FROM_EMAIL}")
    private String fromEmail;

    /**
     * Send OTP using SendGrid Email API (Railway-safe)
     */
    public void sendOtp(String to, String otp) {

        Email from = new Email(fromEmail);
        Email toEmail = new Email(to);
        String subject = "Your DriveNow OTP";

        Content content = new Content(
                "text/plain",
                "Your OTP is: " + otp + "\n\n" +
                "This OTP is valid for 5 minutes.\n\n" +
                "— DriveNow Team"
        );

        Mail mail = new Mail(from, subject, toEmail, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);

            System.out.println(
                    "SendGrid OTP sent. Status: " + response.getStatusCode()
            );

        } catch (IOException e) {
            // Never crash OTP flow because of email
            System.err.println("SendGrid OTP failed: " + e.getMessage());
        }
    }
}
