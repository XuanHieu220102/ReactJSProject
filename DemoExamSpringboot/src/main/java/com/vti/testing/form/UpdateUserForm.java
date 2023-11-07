package com.vti.testing.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserForm {
    private String username;
    private String fullname;
    private String sex;
    private String phone;
    private String email;
}
