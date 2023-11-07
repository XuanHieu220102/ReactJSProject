package com.vti.testing.controller;

import com.vti.testing.DTO.GroupDTO;
import com.vti.testing.entity.Group;
import com.vti.testing.form.CreatingGroupForm;
import com.vti.testing.form.GroupFilterForm;
import com.vti.testing.form.UpdatingGroupForm;
import com.vti.testing.service.IGroupService;
import com.vti.testing.service.IUserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/group")
@CrossOrigin(origins = "*")
public class GroupController {
    @Autowired
    private IGroupService groupService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IUserService userService;
    @GetMapping
    public Page<GroupDTO> getAllGroup(Pageable pageable, GroupFilterForm form){
        Page<Group> groups = groupService.getAllGroups(pageable, form);
        List<Group> groupList = groups.getContent();
        List<GroupDTO> groupDTOS = modelMapper.map(groupList, new TypeToken<List<GroupDTO>>(){}.getType());
        return new PageImpl<>(groupDTOS, pageable, groups.getTotalElements());
//        groupList.stream().map(e->modelMapper.map(e, GroupDTO.class));
//        return new PageImpl<>(groupList, pageable, groups.getTotalElements());
    }

    @GetMapping("/{id}")
    public GroupDTO getGroupById(@PathVariable(name = "id") long id){
        return modelMapper.map(groupService.getGroupById(id), GroupDTO.class);
    }

    @PostMapping("/add")
    public Group addGroup(@RequestBody CreatingGroupForm form) throws Exception {
        System.out.println(form);
        return groupService.createGroup(form);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable(name = "id") long id, @RequestBody UpdatingGroupForm form){
        form.setId(id);
        return ResponseEntity.ok(modelMapper.map(groupService.updateGroup(form), GroupDTO.class));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGroupById(@PathVariable(name = "id") long id){
        groupService.deleteGroupById(id);
//        return ResponseEntity.ok("Group delete successfully");
    }
}
