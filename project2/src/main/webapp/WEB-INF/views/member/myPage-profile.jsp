<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- 문자열 관련 메서드를 제공하는 JSTL (EL 형식) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지-프로필</title>
    <link rel="stylesheet" href="/resources/css/main-style.css">
    <link rel="stylesheet" href="/resources/css/myPage-style.css">
</head>

<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>
        
        <section class="myPage-content">
            <jsp:include page="/WEB-INF/views/member/sideMenu.jsp"/>
            <section class="myPage-main">
                <h1 class="myPage-title">프로필</h1>
                <span class="myPage-subtitle">
                    프로필 이미지를 변경할 수 있습니다.
                </span>

                <!--
                    현재경로 : /member/myPage/profile
                    요청경로 : /member/myPage/updateProfile
                -->
                <!--
                    form태그의 enctype 속성
                    - 서버로 제출되는 데이터의 인코딩 방법을 지정

                    1) application/x-www-form-urlencoded(기본값)
                        -> 모든 문자를 서버로 전송하기 전에 인코딩
                        == 제출되는 데이터를 모두 문자열 형식으로 인코딩
                        == 문자형식만 제출가능(파일 x)
                        - 키와 값이 '='로 연결되고, 각 쌍은 '&'로 연결
                        - 예) name=홍길동&age=20&addr=서울시 강남구
                    
                    2) multipart/form-data (파일 업로드를 위한 인코딩 방식)
                        *무조건 POST방식으로 전송해야함
                        -> 모든 문자를 인코딩 하지 않음
                        == 제출되는 데이터를 인코딩하지 않음
                        == 파일은 파일, 문자열은 문자열로 전달(단, 서버에서 파일/문자열에 대한 별도 처리가 필요) 
                        - 파일 업로드시 form태그에 반드시 enctype 속성을 지정해야 함
                    
                    3) text/plain
                        - 키와 값이 '='로 연결되고, 각 쌍은 개행문자로 연결

                    4) application/json
                        - JSON 형식의 데이터를 전송할 때 사용
                        - JSON 형식의 데이터를 전송할 때는 반드시 contentType 속성을 지정해야 함
                        - contentType 속성의 기본값은 "application/x-www-form-urlencoded" 이므로
                            반드시 contentType 속성을 "application/json"으로 지정해야 함

                -->
                <form action="updateProfile" method="post" name="myPage-frm" 
                enctype="multipart/form-data" onsubmit="return profileValidate()">

                    <div class="profile-image-area">
                        <c:if test="${empty loginMember.profileImage}">
                            <img id="profile-image" src="/resources/images/user.png" alt="프로필 이미지">
                        </c:if>
                        <c:if test="${not empty loginMember.profileImage}">
                            <img id="profile-image" src=${loginMember.profileImage} alt="프로필 이미지">
                        </c:if>
                    </div>
                    <span id="delete-image">&times;</span>

                    <div class="profile-btn-area">
                        <label for="image-input">이미지 선택</label>
                        <input type="file" id="image-input" name="profile-image" accept="image/*">
                        <!--accept 속성 : 업로드파일의 타입을(확장자) 제한 -->
                        <button>변경하기</button>
                    </div>
                    <div class="myPage-row">
                        <label>이메일</label>
                        <span>${loginMember.memberEmail}</span>
                    </div>
                    <div class="myPage-row">
                        <label>가입일</label>
                        <span>${loginMember.enrollDate}</span>
                    </div>

                </form>

            </section>

        </section>

    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <script src="/resources/js/member/myPage.js"></script>
    <!-- 다음 주소 api 추가-->
</body>

</html>