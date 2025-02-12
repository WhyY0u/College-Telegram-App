package cc.whyy0u.v2.repository.user;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

    Optional<UserEntity> findByiin(String iin);
    
    ArrayList<UserEntity> findByRole(Role role);

}