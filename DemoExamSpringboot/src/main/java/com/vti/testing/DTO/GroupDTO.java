package com.vti.testing.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vti.testing.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDTO {
    private int id;

    private String groupName;

    private int groupMember;

    private String userUsername;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date createDate;

}
