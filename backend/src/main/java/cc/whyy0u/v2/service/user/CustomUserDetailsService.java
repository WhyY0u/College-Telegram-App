package cc.whyy0u.v2.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.details.CustomUserDetails;
import cc.whyy0u.v2.entity.user.UserEntity;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String iin) throws UsernameNotFoundException {
        UserEntity userEntity = userService.findByIINOptional(iin).orElseThrow(() -> new UsernameNotFoundException("User not found: " + iin));
        return new CustomUserDetails(userEntity);
    }
    
    public UserDetailsService userDetailsService() {
        return this::loadUserByUsername;
    }
}