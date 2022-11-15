console.log("main.js loaded");

//Ctrl+f5 : 캐시 삭제하고 새로고침

// 아이디 저장 체크박스가 체크 되었을 때 동작
const saveId = document.getElementById("saveId");

if (saveId != null) {
    // radio, checkbox값이 변할 때 발생하는 이벤트 : change
    saveId.addEventListener("change", function (event) {

        console.log(event);

        // change는 체크가 되거나, 해제될 때 이벤트 발생
        // -> 체크 되었는지 별도 검사 필요

        // 아이디 저장 체크박스 == this
        console.log(this.checked);

        // 체크박스.checked : 체크 O == true, 체크 X == false 반환, 대입가능
        if (this.checked) {
            const str = "개인정보 보호를 위해 개인PC에서의 사용을 권장합니다."
                + "개인PC가 아닌 경우 취소를 눌러주세요. ";
            // window.confirm() : 확인=true/취소=false 버튼이 있는 팝업창
            if (!confirm(str)) { // 취소 버튼 클릭 시
                this.checked = false; // 체크박스 해제
            }
        }
    });
}

// 로그인 유효성 검사
// 로그인 form 태그 submit 이벤트 취소
function loginValidate() {
    //Validate : 유효하다

    //document.querySelector("CSS선택자") 
    // - CSS선택자와 일치하는 첫번째 요소 반환

    // 이메일 입력 input 요소
    const memberEmail = document.querySelector("[name= 'memberEmail']");
    // 비밀번호 입력 input 요소
    const memberPw = document.querySelector("[name= 'memberPw']");

    // 이메일이 입력되지 않았을 때 false 반환
    if (memberEmail.value.trim().length == 0) {
        //이메일 양쪽 공백 제거 후 길이가 0인 경우 == 이메일 미작성
        alert("이메일을 입력해주세요.");
        memberEmail.focus(); // 이메일 입력 input 요소에 포커스
        memberEmail.value = ""; // 이메일 입력 input 요소의 값 초기화
        return false;
    }
    // 비밀번호가 입력되지 않았을 때 false 반환
    if (memberPw.value.trim().length == 0) {
        //비밀번호 양쪽 공백 제거 후 길이가 0인 경우 == 이메일 미작성
        alert("비밀번호를 입력해주세요.");
        memberPw.focus(); // 비밀번호 입력 input 요소에 포커스
        memberPw.value = ""; // 비밀번호 입력 input 요소의 값 초기화
        return false;
    }
    return true;
}

// 이메일로 회원 정보 조회(AJAX)
const inputEmail = document.getElementById("inputEmail");
const selectEmail = document.getElementById("selectEmail");

selectEmail.addEventListener("click", (e) => {
    //아무것도 입력되지 않은 경우
    if (inputEmail.value.trim().length == 0) {
        alert("이메일을 입력해주세요.");
        inputEmail.focus();
        inputEmail.value = "";
        return;
    }
    $.ajax({
        url: "/selectEmail",
        data: { "email": inputEmail.value },
        type: "POST",
        dataType: "json", //응답데이터의 형식이 JSON이다.
        success: (member) => {
            console.log(member);
            // 1. JSON 형태의 문자열로 반환된 경우(JSON -> JS객체)
            // 방법 1) JSON.parse() : JSON 문자열 -> JS객체
            //console.log(JSON.parse(member));
            // 방법 2) dataType: "json" 설정
            //console.log(member);
            // 방법 3) jQuery.parseJSON() : JSON 문자열 -> JS객체
            //console.log($.parseJSON(member));

            //2. Jackson 라이브러리를 이용

            if (member == null) { //일치X (Jackson 사용시 member == ""; 로 수정)
                const h4 = document.createElement("h4");
                h4.innerText = inputEmail.value + "은/는 존재하지 않습니다.";

                //append(요소) : 마지막 자식으로 추가
                //prepend(요소) : 첫번째 자식으로 추가
                //after(요소) : 다음 형제로 추가
                //before(요소) : 이전 형제로 추가

                // selectEmail 다음 요소가 존재한다면 삭제
                if (selectEmail.nextElementSibling != null) {
                    selectEmail.nextElementSibling.remove();
                }
                //selectEmail의 다음 요소로 추가(.after(요소))
                selectEmail.after(h4);

            } else { //일치O
                // ul 요소 생성
                const ul = document.createElement("ul");
                // li 요소 생성
                const li1 = document.createElement("li");
                li1.innerText = "회원번호 : " + member.memberNo;
                const li2 = document.createElement("li");
                li2.innerText = "이메일 : " + member.memberEmail;
                const li3 = document.createElement("li");
                li3.innerText = "닉네임 : " + member.memberNickname;
                const li4 = document.createElement("li");
                li4.innerText = "주소 : " + member.memberAddress;
                const li5 = document.createElement("li");
                li5.innerText = "가입일 : " + member.enrollDate;
                const li6 = document.createElement("li");
                li6.innerText = "탈퇴여부 : " + member.memberDeleteFlag;

                // ul 요소에 li 요소 추가
                ul.append(li1, li2, li3, li4, li5, li6);

                // selectEmail 다음 요소가 존재한다면 삭제
                if (selectEmail.nextElementSibling != null) {
                    selectEmail.nextElementSibling.remove();
                }
                // selectEmail 다음 요소로 추가
                selectEmail.after(ul);
            }
        },
        error: () => {
            console.log("이메일로 조회하기 실패");
        }
    });
});

// 비동기로 회원 전체 조회 함수 선언 및 정의
function selectMemberList() {
    const tbody = document.getElementById("tbody");
    //tbody 이전 내용 삭제
    tbody.innerHTML = "";
    $.ajax({
        url: "/selectMemberList",
        dataType: "json",
        success: memberList => {
            console.log(memberList);
            for (let member of memberList) {
                const tr = document.createElement("tr");
                if (member.memberDeleteFlag == "Y") {
                    tr.classList.add("secession");
                }
                const th = document.createElement("th");
                th.innerText = member.memberNo;
                const td1 = document.createElement("td");
                td1.innerText = member.memberEmail;
                const td2 = document.createElement("td");
                td2.innerText = member.memberDeleteFlag;
                // tr 요소에 th, td 요소 추가
                tr.append(th, td1, td2);
                // tbody 요소에 tr 요소 추가
                tbody.append(tr);
            }

            //회원 수 출력
            document.getElementById("memberCount");
            memberCount.innerText = memberList.length + "명";
        },
        error: () => {
            console.log("회원 목록 조회 실패");
        }

    });
}

//HTML문서가 모두 읽어진 후 selectMemberList() 함수 호출 그 다음 10초마다 호출

//HTML 로딩이 끝났을때
document.addEventListener("DOMContentLoaded", () => {
    selectMemberList();
    setInterval(selectMemberList, 10000);
});