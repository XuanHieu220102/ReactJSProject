package com.vti.testing.specification;

import com.vti.testing.entity.Group;
import com.vti.testing.entity.User;
import com.vti.testing.form.GroupFilterForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class GroupSpecificatoin {
    private static final String SEARCH = "search";

    public static Specification<Group> buildWhere(GroupFilterForm form){
        if(form==null){
            return null;
        }
        Specification<Group> whereName = new CustomSpecification(SEARCH, form.getSearch());
        return Specification.where(whereName);
    }

    @Data
    @AllArgsConstructor
    private static class CustomSpecification implements Specification<Group>{
        private String key;
        private Object value;
        @Override
        public Predicate toPredicate(Root<Group> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            if (value == null){
                return null;
            }
            switch (key){
                case SEARCH :
                    return criteriaBuilder.like(root.get("groupName"),"%"+value+"%");
                default:
                    return null;
            }
        }

    }
}
