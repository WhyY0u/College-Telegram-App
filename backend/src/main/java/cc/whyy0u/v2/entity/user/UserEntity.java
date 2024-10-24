package cc.whyy0u.v2.entity.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    Long id;

    @Column(name = "iin", unique = true, nullable = true, length = 12)
    String iin;

    @Column(name = "name", unique = false, nullable = false, length = 50)
    String name;

    @Column(name = "surname", unique = false, nullable = false, length = 50)
    String surname;

    @Column(name = "patronymic", unique = false, nullable = false, length = 50)
    String patronymic;

    @Column(name = "pincode", unique = false, nullable = false, length = 256)
    String pinCode;

    @Column(name = "jwt_token", unique = false, nullable = true, length = 512)
    String jwtToken;

    @Column(name = "phone", unique = true, nullable = true, length = 10)
    String phone;
    
    @Column(name = "is_registered", unique = false, nullable = false)
    boolean isRegistered;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", unique = false, nullable = false)
    Role role;

}