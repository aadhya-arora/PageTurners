package com.pageturners.auth.Service;

import com.pageturners.auth.Repository.AccountRepo;
import com.pageturners.auth.dto.AuthResponse;
import com.pageturners.auth.model.Account;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AccountRepo accountRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            AccountRepo accountRepo,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager
    )
    {
        this.accountRepo=accountRepo;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
    }

    public static class EmailAlreadyRegisteredException extends RuntimeException{
        public EmailAlreadyRegisteredException()
        {
            super("Email is already registered");
        }
    }

    public record AuthResult(AuthResponse authResponse, Authentication authentication){}

    public String normalizeEmail(String email)
    {
        return email.trim().toLowerCase();
    }
    private Authentication authenticate(String email, String rawPassword) {
        return authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(email, rawPassword)
        );
    }

    private AuthResponse toResponse(Account account) {
        return new AuthResponse(account.getId(), account.getEmail());
    }

    @Transactional
    public AuthResult register(String email,String rawPassword){
        String normalizedEmail=normalizeEmail(email);

        if(accountRepo.existsByEmail(normalizedEmail))
        {
            throw new EmailAlreadyRegisteredException();
        }

        Account account=new Account();
        account.setEmail(normalizedEmail);
        account.setPassword(passwordEncoder.encode(rawPassword));
        Account savedAccount=accountRepo.save(account);

        Authentication authentication=authenticate(normalizedEmail,rawPassword);
        return new AuthResult(toResponse(savedAccount),authentication);
    }

    public AuthResult login(String email, String rawPassword) {
        String normalizedEmail = normalizeEmail(email);
        Authentication authentication = authenticate(normalizedEmail, rawPassword);

        Account account = accountRepo.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated account was not found"
                ));

        return new AuthResult(toResponse(account), authentication);
    }
}
