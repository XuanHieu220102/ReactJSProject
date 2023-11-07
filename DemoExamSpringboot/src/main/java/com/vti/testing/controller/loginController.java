package com.vti.testing.controller;
//
//import com.vti.testing.DTO.JwtRequest;
//import com.vti.testing.DTO.JwtResponse;
import com.vti.testing.DTO.UserDTO;
//import com.vti.testing.configuration.security.JwtTokenUtil;
import com.vti.testing.configuration.security.JwtTokenProvider;
import com.vti.testing.configuration.security.RamdomPassword;
import com.vti.testing.entity.*;
import com.vti.testing.form.ForgetPasswordForm;
import com.vti.testing.service.IUserService;
import com.vti.testing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class loginController {
    @Autowired
    private UserService userService;
//    @GetMapping("/login")
//    public ResponseEntity<?> login(Principal principal){
//        String username = principal.getName();
//        User entity = userService.getUserByUsername(username);
//        UserDTO dto = new UserDTO(entity.getId(),entity.getUsername());
//        return new ResponseEntity<>(dto, HttpStatus.OK);
//    }
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//
//    @PostMapping("/resgister")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody UserDTO user) throws Exception{
//        return ResponseEntity.ok(userService.save(user));
//    }
//
//    private void authenticate(String username, String password) throws Exception{
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//        }catch (DisabledException e){
//            throw new Exception("User Disable", e);
//        }catch (BadCredentialsException e){
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//    }
//
//    @PostMapping(path = "/authenticate")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception{
//        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
//        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
//        final String token = jwtTokenUtil.generateToken(userDetails);
//        return ResponseEntity.ok(new JwtResponse(token));
//    }

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public String authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userService.getUserByUsername(loginRequest.getUsername());
        String userId = String.valueOf(user.getId());
        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        String respone = userId + "/" + jwt;
        return respone;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody LoginRequest loginRequest) {
        if(userService.getUserByUsername(loginRequest.getUsername()) != null){
            return ResponseEntity.badRequest().body("Tài khoản này đã tồn tại");
        }
        User user = new User();
        user.setUsername(loginRequest.getUsername());
        user.setPassword(new BCryptPasswordEncoder().encode(loginRequest.getPassword()));
        userService.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }


    @PostMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword (@Valid @RequestBody ForgetPasswordForm form){
        if (userService.getUserByUsername(form.getUsername()) == null){
            return ResponseEntity.badRequest().body("Tài khoản này không tồn tại");
        }
        User user = userService.getUserByUsername(form.getUsername());
        String pass = RamdomPassword.RamdomPass();
        user.setPassword(new BCryptPasswordEncoder().encode(pass));
        userService.save(user);
        return ResponseEntity.ok(pass);
    }
}
