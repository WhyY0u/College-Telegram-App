package cc.whyy0u.v2.repository.ticket;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import cc.whyy0u.v2.entity.ticket.TicketEntity;

public interface TicketRepository extends CrudRepository<TicketEntity, Long> {

@Query("SELECT t FROM TicketEntity t WHERE t.creatorId = :userid " +
       "ORDER BY " +
       "CASE WHEN :sort = 'default' THEN t.date END DESC, " +
       "CASE WHEN :sort = 'status' THEN " +
       "CASE t.status " +
       "WHEN 'InProgress' THEN 1 " +
       "WHEN 'Expectation' THEN 2 " +
       "WHEN 'Ready' THEN 3 " +
       "WHEN 'Denied' THEN 4 " +
       "END END, t.date DESC, " +
       "CASE WHEN :sort = 'type' THEN " +
       "CASE t.type " +
       "WHEN 'Offer' THEN 1 " +
       "WHEN 'Complaint' THEN 2 " +
       "END END, t.date DESC")
Page<TicketEntity> findByCreatorId(@Param("userid") Long userid, @Param("sort") String sort, Pageable pageable);

@Query("SELECT t FROM TicketEntity t WHERE (LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND t.creatorId = :userid " +
       "ORDER BY " +
       "CASE WHEN :sort = 'default' THEN t.date END DESC, " +
       "CASE WHEN :sort = 'status' THEN " +
       "CASE t.status " +
       "WHEN 'InProgress' THEN 1 " +
       "WHEN 'Expectation' THEN 2 " +
       "WHEN 'Ready' THEN 3 " +
       "WHEN 'Denied' THEN 4 " +
       "END END, " +
       "CASE WHEN :sort = 'type' THEN " +
       "CASE t.type " +
       "WHEN 'Offer' THEN 1 " +
       "WHEN 'Complaint' THEN 2 " +
       "END END, " +
       "t.date DESC")
Page<TicketEntity> searchByNameOrDescriptionAndCreatorIdWithSort(@Param("search") String search, @Param("userid") Long userid, @Param("sort") String sort, Pageable pageable);

@Query("SELECT t FROM TicketEntity t WHERE (LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
       "ORDER BY " +
       "CASE WHEN :sort = 'default' THEN t.date END DESC, " +
       "CASE WHEN :sort = 'status' THEN " +
       "CASE t.status " +
       "WHEN 'InProgress' THEN 1 " +
       "WHEN 'Expectation' THEN 2 " +
       "WHEN 'Ready' THEN 3 " +
       "WHEN 'Denied' THEN 4 " +
       "END END, " +
       "CASE WHEN :sort = 'type' THEN " +
       "CASE t.type " +
       "WHEN 'Offer' THEN 1 " +
       "WHEN 'Complaint' THEN 2 " +
       "END END, " +
       "t.date DESC")
Page<TicketEntity> searchByNameOrDescriptionWithSort(@Param("search") String search, @Param("sort") String sort, Pageable pageable);



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