package com.vti.testing.service;

import com.vti.testing.entity.Group;
import com.vti.testing.form.CreatingGroupForm;
import com.vti.testing.form.GroupFilterForm;
import com.vti.testing.form.UpdatingGroupForm;
import com.vti.testing.repository.GroupRepository;
import com.vti.testing.specification.GroupSpecificatoin;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class GroupService implements IGroupService{
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IUserService userService;

    @Override
    public Page<Group> getAllGroups(Pageable pageable, GroupFilterForm form) {
        Specification bWhere = GroupSpecificatoin.buildWhere(form);
        return groupRepository.findAll(bWhere, pageable);
    }

    @Override
    public Group getGroupById(long id) {
        return groupRepository.findById(id).get();
    }

    @Override
    public Group createGroup(CreatingGroupForm form) throws Exception {
        TypeMap<CreatingGroupForm, Group> typeMap = modelMapper.getTypeMap(CreatingGroupForm.class, Group.class);
        if(typeMap == null){
            modelMapper.addMappings(new PropertyMap<CreatingGroupForm, Group>() {
                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }
        Group group = modelMapper.map(form, Group.class);
        group.setCreateDate(new Date());
        group.setUser(userService.getUserById(form.getUserId()));
        System.out.println(group);
        return groupRepository.save(group);
    }

    @Override
    public Group updateGroup(UpdatingGroupForm form) {
        Group group = groupRepository.findById(form.getId()).get();
        group.setGroupName(form.getGroupName());
        group.setGroupMember(form.getGroupMember());

        return groupRepository.save(group);
    }


    @Override
    public void deleteGroupById(long id) {
        Group group = groupRepository.findById(id).get();
        groupRepository.delete(group);
    }
}
