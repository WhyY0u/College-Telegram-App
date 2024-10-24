package cc.whyy0u.v2.details;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;
import java.util.HashSet;

import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;

public class CustomUserDetails implements UserDetails {

    private final UserEntity entity;

    public CustomUserDetails(UserEntity entity) {
      this.entity = entity;
    }

   public UserEntity getEntity() {
    return entity;
   }
   
    @Override
    public String getPassword() {
        return entity.getPinCode();
    }

    @Override
    public String getUsername() {
        return entity.getIin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
    Set<GrantedAuthority> authorities = new HashSet<>();
    Role role = entity.getRole();
    if (role != null) {
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    return authorities;
  }
}