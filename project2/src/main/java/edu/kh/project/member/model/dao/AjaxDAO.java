package edu.kh.project.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.member.model.service.List;
import edu.kh.project.member.model.vo.Member;

@Repository //DB연결하는 역할 + bean등록
public class AjaxDAO {
	@Autowired //같은 자료형이 bean으로 등록되어 있으면 자동으로 DI
	private SqlSessionTemplate sqlSession;
	//SqlSessoinTemplate : 커넥션 + 마이바티스 + 스프링TX 제어

	/**이메일 중복 검사 DAO
	 * @param memberEmail
	 * @return result
	 */
	public int emailDupCheck(String memberEmail) {
		
		return sqlSession.selectOne("ajaxMapper.emailDupCheck", memberEmail);
	}

	/**닉네임 중복 검사 DAO
	 * @param memberNickname
	 * @return result
	 */
	public int nicknameDupCheck(String memberNickname) {
		
		return sqlSession.selectOne("ajaxMapper.nicknameDupCheck",  memberNickname);
	}

	public Member selectEmail(String email) {
		
		return sqlSession.selectOne("ajaxMapper.selectEmail", email);
	}

	/**회원 목록 조회
	 * @return
	 */
	public java.util.List<Member> selectMemberList() {

		//.selectList()
		return sqlSession.selectList("ajaxMapper.selectMemberList");
	}
	
	
	
	
}