package cc.whyy0u.v2.entity.ticket;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import cc.whyy0u.v2.controller.student.request.CreateTicketRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "creatorId", unique = false, nullable = false)
    private Long creatorId;

    @Column(name = "name", unique = false, nullable = false, length = 30)
    private String name;

    @Column(name = "description", unique = false, nullable = false, length = 2000)
    private String description;

    @Column(name = "moderatorId", unique = false, nullable = true)
    private Long moderatorId;

    @Column(name = "comment", unique = false, nullable = true, length = 2000)
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", unique = false, nullable = false)
    private TicketType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", unique = false, nullable = false)
    private TicketStatus status;

    @CreationTimestamp
    @Column(name = "create_date", unique = false, nullable = false)
    private LocalDateTime date;



    public TicketEntity() {

    }

    public TicketEntity(CreateTicketRequest request) {
        this.name = request.getName();
        this.description = request.getDescription();
        this.type = request.getType();
    }

}
