package edu.kh.project.member.model.service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.common.Util;
import edu.kh.project.member.model.dao.MyPageDAO;
import edu.kh.project.member.model.vo.Member;

@Service // bean등록
public class MyPageServiceImpl implements MyPageService{
	@Autowired
	private MyPageDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	
	/**
	 * 회원 정보 수정 서비스
	 */
	@Transactional
	@Override
	public int updateInfo(Member inputMember) {
		int result = dao.updateInfo(inputMember);
		
		return result;
	}


	/**
	 * 비밀번호 변경 서비스
	 */
	@Override
	public int changePw(Map<String, Object> paramMap) {
		// 현재 비밀번호 일치 시 새 비밀번호로 변경
		// 1. 회원번호를 이용해 DB에서 암호와된 비밀번호 조회
		String encPw = dao.selectEncPw( (int)paramMap.get("memberNo"));
		
		
		// 2. matches(입력PW, 암호화PW) 결과가 true인 경우 
		//    새 비밀번호로 UPDATE하는 DAO코드 호출
		if( bcrypt.matches( (String)paramMap.get("currentPw"), encPw)) {
			// 새 비밀번호 암호화
			String newPw = bcrypt.encode( (String)paramMap.get("newPw"));
			paramMap.put("newPw", newPw);
			// paramMap에 존재하는 기존 "newPw"를 덮어쓰기
			
			// DAO 호출
			int result =  dao.changePw(paramMap);
			
			return result;
		}
		
		return 0; // 비밀번호 불일치 시 0 반환
	}

//	public int memberDelete(int memberNo) {
//		int result = dao.memberDelete(memberNo);
//		return result;}

	/**
	 *회원 탈퇴 서비스
	 */
	@Transactional
	@Override
	public int memberDelete(int memberNo, String memberPw) {
		String encPw = dao.selectEncPw(memberNo);
		if(bcrypt.matches(memberPw, encPw)) {
			int result=dao.memberDelete(memberNo);
			return result;
		}
		
		
		return 0;
	}

	//프로필 이미지 수정
	//예외가 발생하면 롤백
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateProfile(String webPath, String filePath, MultipartFile profileImage, Member loginMember) throws Exception {
		// 실패를 대비해 이전 이미지 경로 저장
		String temp = loginMember.getProfileImage();
		//중복 파일명 업로드를 대비하기 위해 파일명 변경
		String rename = null;
		
		if(profileImage.getSize()==0) {//업로드된 파일이 없는 경우
			loginMember.setProfileImage(null);
		}else { //업로드된 파일이 있는 경우
			 //원본 파일명을 이용해 새로운 파일명 생성
			 rename= Util.fileRename(profileImage.getOriginalFilename());
			 loginMember.setProfileImage(webPath + rename);
			 // /resources/images/memberProfile/변경된파일명
		}
		int result = dao.updateProfile(loginMember); // 0 또는 1
		
		
		if(result > 0) { // DB 수정 성공 시 -> 실제로 서버에 파일 저장
			if(rename != null) {
				//변경된 이미지 명이 있다 == 새로운 파일이 업로드 되었다
				profileImage.transferTo(new File(filePath+rename));
				//메모리에 임시 저장된 파일을 지정된 경로에 파일 형태로 변환 == 서버 파일 업로드
			}
		}else {
			//실패 시 다시 이전 이미지를 세팅
			loginMember.setProfileImage(temp);
			throw new Exception("파일 업로드 실패");
		}
		
		return result;
	}
}
