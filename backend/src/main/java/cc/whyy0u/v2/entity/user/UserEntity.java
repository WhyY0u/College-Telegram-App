package cc.whyy0u.v2.entity.user;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.Map;
import java.util.HashMap;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;


@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "iin", unique = true, nullable = false, length = 20)
    private String iin;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "surname", nullable = false, length = 50)
    private String surname;

    @Column(name = "patronymic", nullable = false, length = 50)
    private String patronymic;

    @Column(name = "email", unique = true, nullable = false, length = 150)
    private String email;

    @Column(name = "pin_code", nullable = false, length = 256)
    private String pinCode;

    @Column(name = "phone", unique = true, nullable = true, length = 10)
    private String phone;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "is_registered", nullable = false)
    private boolean isRegistered;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @ElementCollection
    @CollectionTable(name = "user_tokens", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "token")
    @Column(name = "device")
    private Map<String, Device> tokenDeviceMap = new HashMap<>();
}
