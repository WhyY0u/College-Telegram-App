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
    private Long id;

    @Column(name = "iin", unique = true, nullable = false, length = 12)
    private String iin;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "surname", nullable = false, length = 50)
    private String surname;

    @Column(name = "patronymic", nullable = false, length = 50)
    private String patronymic;

    @Column(name = "ugroup", nullable = false, length = 12)
    private String group;

    @Column(name = "pin_code", nullable = true, length = 256)
    private String pinCode;

    @Column(name = "is_registered", nullable = false)
    private boolean isRegistered;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 200)
    private Role role;
}
