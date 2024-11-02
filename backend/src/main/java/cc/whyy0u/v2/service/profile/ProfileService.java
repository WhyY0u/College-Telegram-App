package cc.whyy0u.v2.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.entity.profile.ProfileEntity;
import cc.whyy0u.v2.repository.profile.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    public ProfileEntity profileByUserId(Long userId) {
        return profileRepository.findByuserId(userId).orElse(null);
    }
    public void saveProfile(ProfileEntity entity) {
         profileRepository.save(entity);
    }
}
