package cc.whyy0u.v2.entity.news;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "event")
@Data
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    Long id;

    @Column(name = "name", unique = false, nullable = false, length = 30)
    String name;

    @Column(name = "description", unique = false, nullable = false, length = 2000)
    String description;

    @Column(name = "place", unique = false, nullable = false, length = 30)
    String place;

    @Column(name = "sendet", columnDefinition = "boolean default false")
    boolean sendet;

    @Column(name = "create_date", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime create;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime start;

    @Column(name = "images", unique = false, nullable = true)
    private ArrayList<String> images;
}
