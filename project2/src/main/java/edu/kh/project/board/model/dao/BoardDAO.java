package edu.kh.project.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Pagination;

@Repository
public class BoardDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	//Spring이 트랜잭션제어를 하게하는 객체

	
	/**게시판 이름 목록 조회 DAO
	 * @return boardTypeList
	 */
	public List<Map<String,Object>> selectBoardType() {
		
		return sqlSession.selectList("boardMapper.selectBoardType");
	}

	
	/**게시글 수 조회 DAO
	 * @param boardCode
	 * @return listCount
	 */
	public int getListCount(int boardCode) {
		
		return sqlSession.selectOne("boardMapper.getListCount", boardCode);
	}


	/**특정 게시판 목록 조회
	 * @param pagination
	 * @param boardCode
	 * @return boardList
	 */
	public List<Board> selectBoardList(Pagination pagination, int boardCode) {
		
		// RowBounds 객체(마이바티스)
		// - 여러 행 조회 결과 중 특정 위치부터 지정된 행의 개수만 조회하는 객체
		//                  (몇 행을 건너 뛸 것인가?)
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectBoardList", boardCode, rowBounds);
									//namespace.id          ,파라미터(없을경우 null), RowBounds객체
	}


	/**게시글 상세 조회 + 이미지 목록 조회 + 댓글 목록 조회
	 * @param boardNo
	 * @return
	 */
	public Board selectBoardDetail(int boardNo) {
		
		return null;
	}

	
	
	
}
