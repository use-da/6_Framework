package edu.kh.project.member.model.service;

import edu.kh.project.member.model.vo.Member;

//서비스 인터페이스 이유 : 설계, 유지보수성 향상, AOP때문에
public interface AjaxService {

	/**이메일 중복검사 서비스
	 * @param memberEmail
	 * @return result
	 */
	int emailDupCheck(String memberEmail);

	/**닉네임 중복검사 서비스
	 * @param memberNickname
	 * @return result
	 */
	int nicknameDupCheck(String memberNickname);

	/**이메일로 회원조회
	 * @param email
	 * @return
	 */
	Member selectEmail(String email);

	java.util.List<Member> selectMemberList();

	

}
