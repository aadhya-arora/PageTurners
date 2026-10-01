package com.pageturners.auth.Repository;

import com.pageturners.auth.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserProfileRepo extends JpaRepository<UserProfile, UUID> {
    Optional<UserProfile> findByAccount_Id(UUID accountId);
    Optional<UserProfile> findByUsername(String username);
    boolean existsByUsername(String username);
}
