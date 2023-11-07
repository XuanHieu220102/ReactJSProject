package com.vti.testing.service;

import com.vti.testing.DTO.UserDTO;
import com.vti.testing.entity.CustomUserDetails;
import com.vti.testing.entity.User;
import com.vti.testing.form.ChangePasswordForm;
import com.vti.testing.form.UpdateUserForm;
import com.vti.testing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService implements IUserService{
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder brycptEncode
//
//    @Autowired
//    BCryptPasswordEncoder passwordEncoder;
    @Override
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User getUserById(long id) throws Exception {
        return userRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found user have UserID = " + id));
    }

    @Override
    public boolean isKTAccount(String username, String pass) {
        System.out.println(pass);
        User user = userRepository.findByUsernameAndPassword(username, pass);
        if(user != null){
            return true;
        }
        return false;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null){
            throw  new UsernameNotFoundException(username);
        }
//        System.out.println(user.getUsername(loginRequest.getUsername()));
//        System.out.println(user.getPassword());
//        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), AuthorityUtils.createAuthorityList("user"));
        return new CustomUserDetails(user);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public User saveNewInforUser(UpdateUserForm newUser, long id) throws Exception {
        User user = getUserById(id);
        user.setUsername(newUser.getUsername());
        user.setFullname(newUser.getFullname());
        user.setSex(newUser.getSex());
        user.setPhone(newUser.getPhone());
        user.setEmail(newUser.getEmail());
        return userRepository.save(user);
    }
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User getInforByUserId (long id) {
        User user = userRepository.findById(id).get();
        return user;
    }

    public boolean changPassword(long id, ChangePasswordForm form){
        User user = userRepository.getById(id);
        if(BCrypt.checkpw(form.getOldPassword(), user.getPassword())){
            user.setPassword(new BCryptPasswordEncoder().encode(form.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
