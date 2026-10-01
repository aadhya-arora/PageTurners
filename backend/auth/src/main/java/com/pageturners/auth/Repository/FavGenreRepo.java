package com.pageturners.auth.Repository;

import com.pageturners.auth.model.UserFavGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FavGenreRepo extends JpaRepository<UserFavGenre, UUID> {
    List<UserFavGenre> findByProfile_Id(UUID profileId);
    boolean existsByProfile_IdAndGenreIgnoreCase(UUID profileId, String genre);
}
