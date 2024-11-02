package cc.whyy0u.v2.service.user;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.controller.administrator.response.GetAllAdministrator;
import cc.whyy0u.v2.entity.news.EventEntity;
import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.repository.user.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserEntity findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public UserEntity findByIIN(String iin) {
        return userRepository.findByiin(iin).orElse(null);
    }

    public Optional<UserEntity> findByIINOptional(String iin) {
        return userRepository.findByiin(iin);
    }
    public ArrayList<UserEntity> findAllUsers() {
        return (ArrayList<UserEntity>) userRepository.findAll();
    }

    public void saveEntity(UserEntity entity) {
        userRepository.save(entity);
    }

    public ArrayList<UserEntity> findAllAdministrators() {
        return userRepository.findByRole(Role.Administrator);
    }
    public ArrayList<GetAllAdministrator> convertToAllAdministratorList(ArrayList<UserEntity> userEntities) {
    return userEntities.stream()
        .map(user -> {
            GetAllAdministrator response = new GetAllAdministrator();
            response.setName(user.getName());
            response.setPatronymic(user.getPatronymic());
            response.setSurname(user.getSurname());
            return response;
        })
        .collect(Collectors.toCollection(ArrayList::new));
    }
     public UserEntity getCurrentUser() {
        String IIn = SecurityContextHolder.getContext().getAuthentication().getName();
        return findByIIN(IIn);
    }
}
