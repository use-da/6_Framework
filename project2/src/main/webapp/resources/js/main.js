console.log("main.js loaded");

//Ctrl+f5 : 캐시 삭제하고 새로고침

// 아이디 저장 체크박스가 체크 되었을 때 동작
const saveId = document.getElementById("saveId");

// radio, checkbox값이 변할 때 발생하는 이벤트 : change
saveId.addEventListener("change", function () {

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