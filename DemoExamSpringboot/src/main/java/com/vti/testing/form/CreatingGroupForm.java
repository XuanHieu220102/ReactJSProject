package com.vti.testing.form;

import com.vti.testing.DTO.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatingGroupForm {
    @NotNull(message = "Group name not null")
    @Length(max = 50, message = "Name length must less than 50")
    private String groupName;

    @PositiveOrZero(message = "Total member must greater than 0")
    private int groupMember;

    private long userId;
}
