package cc.whyy0u.v2.repository.news;

import org.springframework.data.repository.CrudRepository;

import cc.whyy0u.v2.entity.news.NewsEntity;

public interface NewsRepository extends CrudRepository<NewsEntity, Long> {
    
}
