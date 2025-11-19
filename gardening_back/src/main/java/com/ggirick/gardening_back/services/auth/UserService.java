package com.ggirick.gardening_back.services.auth;


import com.ggirick.gardening_back.dto.auth.AuthDTO;
import com.ggirick.gardening_back.dto.auth.UserInfoDTO;
import com.ggirick.gardening_back.dto.auth.UsersDTO;
import com.ggirick.gardening_back.mappers.auth.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public void completeProfile(UserInfoDTO dto) {
        // UID가 이미 존재하는지 확인
        UsersDTO exists = userMapper.selectUserByUid(dto.getUuid());

        if (exists != null) {
            // 이미 존재하면 update
            userMapper.updateUserInfo(dto);
        } else {
            // 존재하지 않으면 insert
            userMapper.insertUserInfo(dto);
        }
    }
    public UserInfoDTO getUserInfo(String uid) {
       return userMapper.selectUserInfoByUid(uid);
    }

    public AuthDTO getUserAuthByPhone(String phone) {
        return userMapper.selectUserByPhone(phone);
    }
}
