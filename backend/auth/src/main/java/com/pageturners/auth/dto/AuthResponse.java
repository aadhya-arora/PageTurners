package com.pageturners.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private final UUID id;
    private final String email;

}
