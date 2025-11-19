package com.ggirick.gardening_back.mappers.auth;

import com.ggirick.gardening_back.dto.auth.AuthDTO;
import com.ggirick.gardening_back.dto.auth.UserInfoDTO;
import com.ggirick.gardening_back.dto.auth.UsersDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    //uuid기반 유저 조회
    UsersDTO selectUserByUid(@Param("uid") String uid);


    int insertUserInfo(UserInfoDTO userInfo);
    
    //uuid 기반 user 테이블 등록 (회원가입)
    int insertUser(@Param("uuid") String uid);

    
    //uid에 따라 user정보 챙겨오기
    UserInfoDTO selectUserInfoByUid(@Param("uid") String uid);

    AuthDTO selectUserByPhone(@Param("phone") String phone);
    
    //랜덤 닉네임 정하기
    String randomUserNickName();

    int updateUserInfo(UserInfoDTO dto);
}
