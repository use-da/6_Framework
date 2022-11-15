<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수업용 프로젝트</title>
    <link rel="stylesheet" href="/resources/css/main-style.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <!--
        기존 영역 분할에 사용한 div, span태그는 태그의 이름만 봤을 때
        나눈다는 것 이외의 의미를 파악할 수 없다.
        -> id 또는 class 속성을 추가해야하는 번거로움이 있다.

        이러한 문제를 해결하기 위해 HTML5부터 태그의 이름만으로 어떤 역할을 하는지 알 수 있고
        추가적으로 웹 접근성 향상에 도움이 되는 시맨틱 태그(semantic tag)가 추가되었다.

        * 시맨틱 태그는 div 태그가 이름만 바뀐 것으로 생각하는게 좋다.

        [시맨틱 태그 종류]
        <main>    : 문서의 주요 내용을 작성하는 영역
        <header>  : 문서의 제목, 머리말 영역
        <footer>  : 문서의 하단 부분, 꼬리말 영역
        <nav>     : 문서의 네비게이션(다른 페이지, 사이트 이동) 링크 영역
        <aside>   : 문서의 사이드바, 광고 등의 영역
        <section> : 문서의 구역 구분을 위한 영역
        <article> : 문서의 본문 영역
    -->
    <main>
        <!--header.jsp추가(포함)
            jsp 액션 태그 중 include 
            - 해당 위치 page속성으로 지정된 jsp파일의 내용이 포함됨
            - jsp 파일-->
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>



        <section class="content">
            <section class="content-1">
                <div>
                    <h3>이메일로 회원정보 조회(AJAX)</h3>
                    이메일 : <input type="text" id="inputEmail">
                    <button id="selectEmail">조회</button>
                </div>
                <div id="content-1-2">
                    <h3>10초마다 모든 회원 정보 조회(AJAX)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>회원번호</th>
                                <th>이메일</th>
                                <th>탈퇴여부</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>회원 수</th>
                                <th colspan="2" id="memberCount"></th>
                            </tr>
                    </table>
                </div>
            </section>
            <section class="content-2">
                <%-- 로그인 여부에 따라 출력 화면 변경--%>
                <c:choose>
                    <%-- 로그인 X인 경우 --%>
                    <c:when test="${empty sessionScope.loginMember}">
                        <form action="/member/login" name="login-frm" method="POST"
                            onsubmit="return loginValidate();">
                            <%-- form태그의 submit 이벤트를 취소시키는 방법1
                                인라인 이벤트 모델의 결과로 false를 반환하면 submit 이벤트가 취소됨
                            --%>
                            <!--아이디, 비번, 로그인 버튼-->
                            <fieldset id="id-pw-area">
                                <section>
                                    <input type="text" name="memberEmail" placeholder="이메일"
                                    autocomplete="off" value="${cookie.saveId.value}">
                                <!--자동완성off                쿠키 중 saveId에 저장된 값-->
                                    <input type="password" name="memberPw" placeholder="비밀번호"
                                    autocomplete="off">
                                </section>
                                <section>
                                    <button>로그인</button> <!--submit이 기본값-->
                                </section>
                            </fieldset>
                            
                            <!--쿠키 중 saveId에 값이 있으면 체크-->
                            <c:if test="${!empty cookie.saveId}">
                                <c:set var="temp" value="checked"/> 
                                <%--c:set -> page scope == if문 나가도 사용--%>
                            </c:if>
                            <label>
                                <input type="checkbox" id="saveId" name="saveId" ${temp}>아이디 저장
                            </label><!--label태그 내부에 input태그를 작성하면 자동 연결된다-->
                            <!-- 회원가입/ ID / PW 찾기-->
                            <article id="signUp-find-area">
                                <a href="/member/signUp">회원가입</a>
                                <span>|</span>
                                <a href="#">ID/PW 찾기</a>
                            </article>
                        </form>
                    </c:when>
                    <%-- 로그인 O인 경우 --%>
                    <c:otherwise>
                        <article class="login-area">
                            <!-- 회원프로필 이미지-->
                            <a href="/member/myPage/profile">
                                <c:if test="${empty loginMember.profileImage}">
                                    <img id="member-profile" src="/resources/images/user.png" alt="프로필 이미지">
                                </c:if>
                                <c:if test="${not empty loginMember.profileImage}">
                                    <img id="member-profile" src=${loginMember.profileImage} alt="프로필 이미지">
                                </c:if>
                            </a>
                            <!-- 회원 닉네임, 로그아웃-->
                            <div class="my-info">
                                <div>
                                    <a href="/member/myPage/info" id="nickname">${loginMember.memberNickname}</a>
                                    <a href="/member/logout" id="logout-btn">로그아웃</a>
                                </div>
                                <p>${loginMember.memberEmail}</p>
                            </div>
                        </article>
                    </c:otherwise>
                </c:choose>
            </section>
        </section>
    </main>
    
    <!-- footer.jsp추가(포함) -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <!--jQuery 라이브러리(.js 파일) 추가 (CDN방식) (회사에선 속도문제로 다운로드해서 폴더에 넣는다)-->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
            integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
            crossorigin="anonymous"></script>
    <script src="/resources/js/main.js"></script>

</body>
</html>