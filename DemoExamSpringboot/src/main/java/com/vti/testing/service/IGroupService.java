package com.vti.testing.service;

import com.vti.testing.entity.Group;
import com.vti.testing.form.CreatingGroupForm;
import com.vti.testing.form.GroupFilterForm;
import com.vti.testing.form.UpdatingGroupForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IGroupService {
    Page<Group> getAllGroups(Pageable pageable, GroupFilterForm form);
    Group getGroupById(long id);

    Group createGroup(CreatingGroupForm form) throws Exception;
    Group updateGroup(UpdatingGroupForm form);

    void deleteGroupById(long id);

}
