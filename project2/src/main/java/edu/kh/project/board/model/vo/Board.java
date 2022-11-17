package edu.kh.project.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// mybatis-config에서 별칭 부여
@Getter
@Setter
@ToString
public class Board {
    private int boardNo;
    private String boardTitle;
    private String boardContent;
    private String boardCreateDate;
    private String boardUpdateDate;
    private int readCount;
    private int commentCount;
    private int likeCount;
    private String memberNickname;
    private String thumbnail;
    
    private int memberNo;
    private String profileImage;
}