package cc.whyy0u.v2.entity.profile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    Long id;
    
    @Column(name = "userid", unique = true, nullable = false)
    Long userId;

    @Column(name = "image", unique = false, nullable = true, length = 500)
    String image;

    @Column(name = "description", unique = false, nullable = true, length = 2000)
    String description;
}
