package com.vti.testing.service;

import com.vti.testing.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService extends UserDetailsService {
    Page<User> getAllUsers(Pageable pageable);
    User getUserById(long id) throws Exception;

    boolean isKTAccount(String username, String pass);
    User getUserByUsername(String username);
}
