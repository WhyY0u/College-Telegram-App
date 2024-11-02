package cc.whyy0u.v2.repository.profile;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import cc.whyy0u.v2.entity.profile.ProfileEntity;
import cc.whyy0u.v2.entity.user.UserEntity;

public interface ProfileRepository extends CrudRepository<ProfileEntity, Long> {
    Optional<ProfileEntity> findByuserId(Long id);
}
