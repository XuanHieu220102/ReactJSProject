package com.vti.testing.controller;

import com.vti.testing.DTO.UserDTO;
import com.vti.testing.configuration.security.RamdomPassword;
import com.vti.testing.entity.User;
import com.vti.testing.form.ChangePasswordForm;
import com.vti.testing.form.ForgetPasswordForm;
import com.vti.testing.form.UpdateUserForm;
import com.vti.testing.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;

    @GetMapping
    public Page<UserDTO> getALlUser(Pageable pageable){
            Page<User> users = userService.getAllUsers(pageable);
            List<User> list = users.getContent();
            List<UserDTO> userDTOS = modelMapper.map(list, new TypeToken<List<UserDTO>>(){}.getType());
            return new PageImpl<>(userDTOS, pageable, users.getTotalElements());
    }

    @GetMapping("/{id}")
    public UserDTO getInforUserById(@PathVariable(name = "id") long id){
        User user = userService.getInforByUserId(id);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

//    @PostMapping("/forgetPassword")
//    public ResponseEntity<?> forgetPassword (@Valid @RequestBody ForgetPasswordForm form){
//        if (userService.getUserByUsername(form.getUsername()) == null){
//            return ResponseEntity.badRequest().body("Tài khoản này không tồn tại");
//        }
//        User user = userService.getUserByUsername(form.getUsername());
//        String pass = RamdomPassword.RamdomPass();
//        user.setPassword(new BCryptPasswordEncoder().encode(pass));
//        userService.save(user);
//        return ResponseEntity.ok(pass);
//    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateInfoUser(@RequestBody UpdateUserForm form, @PathVariable(name = "id") long id) throws Exception {
        userService.saveNewInforUser(form, id);
        return ResponseEntity.ok("Update thanh cong");
    }

    @PostMapping("/changePass/{id}")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordForm form, @PathVariable(name = "id") long id) {
        if(userService.changPassword(id, form)){
            return ResponseEntity.ok("Thay đổi mật khẩu thành công");
        }
        return ResponseEntity.badRequest().body("Mật khẩu cũ không chính xác, vui lòng nhập lại");
    }
}
