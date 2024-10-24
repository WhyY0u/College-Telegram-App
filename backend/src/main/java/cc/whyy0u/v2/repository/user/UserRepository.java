package cc.whyy0u.v2.repository.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import cc.whyy0u.v2.entity.user.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

    Optional<UserEntity> findByPhone(String phone);
    Optional<UserEntity> findByiin(String iin);

}