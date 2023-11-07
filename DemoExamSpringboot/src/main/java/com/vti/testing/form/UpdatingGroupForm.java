package com.vti.testing.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatingGroupForm {
    private long id;

    @NotNull(message = "Group name not null")
    @Length(max = 50, message = "Name length must less than 50")
    private String groupName;

    @PositiveOrZero(message = "Total member must greater than 0")
    private int groupMember;

}
