package edu.kh.project.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import edu.kh.project.member.model.service.AjaxService;
import edu.kh.project.member.model.vo.Member;

@Controller //요청 -> 알맞은 서비스 -> 결과 반환 -> 알맞은 view 응답 제어 + bean등록
public class AjaxController {
	@Autowired
	private AjaxService service;
	
	@GetMapping("/emailDupCheck")
	@ResponseBody  //반환된 값을 jsp경로가 아닌 값 자체로 인식 
	public int emailDupCheck(String memberEmail) {
		//System.out.println(memberEmail);
		
		//이메일 중복 검사 서비스 호출
		int result = service.emailDupCheck(memberEmail);
		
		// @ResponseBody 어노테이션 덕분에 result가 View Resolver로 전달되지 않고 호출했던 ajax로 반환
		return result;
	}
	
	@GetMapping("/nicknameDupCheck")
	@ResponseBody 
	public int nicknameDupCheck(String memberNickname) {
		int result = service.nicknameDupCheck(memberNickname);
		return result;
	}
	
	
//	//이메일로 회원정보 조회(JSON, GSON활용)
	@ResponseBody 
	@PostMapping("/selectEmail")
	public String selectEmail(String email) {
		Member member = service.selectEmail(email);
		//System.out.println(member);
		
		//JSON 형식으로 Member객체 작성
		//{"memberEmail" : member.getMemberEmail(), "memberNickname" : member.getMemberNickname()}
		//{"memberEmail" : "user01@kh.or.kr", "memberNickname" : "유저일"}
//		String result = "{\"memberEmail\" : \"user01@kh.or.kr\", \"memberNickname\" : \"123\"}";
//		return result;
		
		// GSON라이브러리를 이용해 Member객체 -> JSON변환(String)
		return new Gson().toJson(member);
	}
	
	//이메일로 회원정보 조회(jackson-databind활용)
//	@ResponseBody 
//	@PostMapping("/selectEmail")
//	public Member selectEmail(String email) {
//		
//		//jsckson이란?
//		//JS객체 <-> Java객체 <-> JSON  
//		Member member = service.selectEmail(email);
//		
//		return member;
//		//Java 객체 반환 시 Jackson 라이브러리가 JS객체로 변환
//		
//	}
	
	//회원 목록 조회
	@GetMapping("/selectMemberList")
	@ResponseBody
	public String selectMemberList() {
		List<Member>memberList = service.selectMemberList();
		
		//객체 1개를 표현 == JSON
		//객체 여러개가 담긴 배열 == JSONArray
		//"[{},{},{}]"
		
		return new Gson().toJson(memberList);
		
	}
}
