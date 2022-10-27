package edu.kh.project.member.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.member.model.vo.Member;

@Repository // Spring이 bean등록 + 관리(IOC)
public class MyPageDAO {
	
	@Autowired // Spring에서 bean을 주입받음(DI)
	private SqlSessionTemplate sqlSession;

	/** 회원 정보 수정 DAO
	 * @param inputMember
	 * @return result
	 */
	public int updateInfo(Member inputMember) {
		return sqlSession.update("myPageMapper.updateInfo", inputMember);
	}

	/** 암호화된 비밀번호 조회 DAO
	 * @param memberNo
	 * @return encPw
	 */
	public String selectEncPw(int memberNo) {
		
		return sqlSession.selectOne("myPageMapper.selectEncPw", memberNo);
	}

	/** 비밀번호 변경 DAO
	 * @param paramMap
	 * @return result
	 */
	public int changePw(Map<String, Object> paramMap) {
		
		return sqlSession.update("myPageMapper.changePw",paramMap);
	}

	/** 회원 탈퇴 DAO
	 * @param memberNo
	 * @param memberPw
	 * @return result
	 */
	public int memberDelete(int memberNo) {
		
		return sqlSession.update("myPageMapper.memberDelete", memberNo);
	}
}
