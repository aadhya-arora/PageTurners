package com.pageturners.auth.Security;

import com.pageturners.auth.Repository.AccountRepo;
import com.pageturners.auth.model.Account;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthUserDetailServer implements UserDetailsService {

    private final AccountRepo accountRepo;

    public AuthUserDetailServer(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account=accountRepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(()->new UsernameNotFoundException("Account not found"));

        return User.withUsername(account.getEmail())
                .password(account.getPassword())
                .authorities("ROLE_USER")
                .build();
    }
}
