package cc.whyy0u.v2.service.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.repository.user.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserEntity findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public UserEntity findByPhone(String phone) {
       return userRepository.findByPhone(phone).orElse(null);
    }
    public UserEntity findByIIN(String iin) {
        return userRepository.findByiin(iin).orElse(null);
    }

    public Optional<UserEntity> findByIINOptional(String iin) {
        return userRepository.findByiin(iin);
    }

    public void saveEntity(UserEntity entity) {
        userRepository.save(entity);
    }
     public UserEntity getCurrentUser() {
        String IIn = SecurityContextHolder.getContext().getAuthentication().getName();
        return findByIIN(IIn);
    }
}
