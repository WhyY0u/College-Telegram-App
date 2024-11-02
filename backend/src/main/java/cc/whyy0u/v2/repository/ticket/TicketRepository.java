package cc.whyy0u.v2.repository.ticket;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import cc.whyy0u.v2.entity.ticket.TicketEntity;

public interface TicketRepository extends CrudRepository<TicketEntity, Long> {

        @Query("SELECT t FROM TicketEntity t WHERE t.creatorId = :userid ORDER BY t.date DESC")
        ArrayList<TicketEntity> findByCreatorId(@Param("userid") Long userid);

        @Query("SELECT t FROM TicketEntity t ORDER BY " +
         "CASE t.status " +
         "WHEN 'InProgress' THEN 1 " +
         "WHEN 'Expectation' THEN 2 " +
         "WHEN 'Ready' THEN 3 " +
         "WHEN 'Denied' THEN 4 " +
         "END, " +
         "t.date DESC")
        Page<TicketEntity> findAllOrdered(Pageable pageable);

        @Query("SELECT t FROM TicketEntity t ORDER BY " +
         "CASE t.type " +
         "WHEN 'Offer' THEN 1 " +
         "WHEN 'Complaint' THEN 2 " +
         "END, " +
         "t.date DESC")
        Page<TicketEntity> findAllOrderedByType(Pageable pageable);

        @Query("SELECT t FROM TicketEntity t WHERE t.name LIKE %:name%")
        ArrayList<TicketEntity> findByNameContaining(@Param("name") String name);
}