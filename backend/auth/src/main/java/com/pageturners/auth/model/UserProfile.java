package com.pageturners.auth.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_info")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true,nullable = false,updatable = false)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "account_id",nullable = false,unique = true)
    private Account account;

    private String fullName;

    @Column(unique = true)
    private String username;

    @Column(name = "goal")
    private Integer annualReadingGoal;

    @OneToMany(mappedBy = "profile",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<UserFavGenre> favGenres=new ArrayList<>();

    public void addFavGenre(UserFavGenre favGenre) {
        favGenres.add(favGenre);
        favGenre.setProfile(this);
    }

    public void removeFavGenre(UserFavGenre favGenre) {
        favGenres.remove(favGenre);
        favGenre.setProfile(null);
    }
}
