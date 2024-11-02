package cc.whyy0u.v2.repository.news;

import org.springframework.data.repository.CrudRepository;

import cc.whyy0u.v2.entity.news.EventEntity;

public interface EventRepository extends CrudRepository<EventEntity, Long>{
    
}
