package com.vti.testing.configuration.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encode {
    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("hieu1102"));
    }
}
