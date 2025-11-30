package com.medvault.backend.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.medvault.backend.dto.LoginDto;
import com.medvault.backend.dto.UserDto;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final String USERS_FILE = "src/main/resources/users.json";
    private final Gson gson = new Gson();

    public boolean register(UserDto userDto) throws IOException {
        List<UserDto> users = getUsers();
        boolean userExists = users.stream().anyMatch(u -> u.getEmail().equals(userDto.getEmail()));
        if (userExists) {
            return false;
        }
        users.add(userDto);
        saveUsers(users);
        return true;
    }

    public boolean login(LoginDto loginDto) throws IOException {
        List<UserDto> users = getUsers();
        return users.stream().anyMatch(u -> u.getEmail().equals(loginDto.getEmail()) && u.getPassword().equals(loginDto.getPassword()));
    }

    private List<UserDto> getUsers() throws IOException {
        try (FileReader reader = new FileReader(USERS_FILE)) {
            Type userListType = new TypeToken<ArrayList<UserDto>>(){}.getType();
            List<UserDto> users = gson.fromJson(reader, userListType);
            return users == null ? new ArrayList<>() : users;
        }
    }

    private void saveUsers(List<UserDto> users) throws IOException {
        try (FileWriter writer = new FileWriter(USERS_FILE)) {
            gson.toJson(users, writer);
        }
    }
}
