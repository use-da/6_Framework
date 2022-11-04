// JS객체를 이용한 유효성 검사 결과 저장 객체
// JS 객체 = {"K":V , "K":V, ...} Map형식

// 변수명.key 또는 변수명["key"] 를 이용하면 객체 속성 접근 가능
const checkObj = {
    "memberEmail": false,
    "memberPw": false,
    "memberPwConfirm": false,
    "memberNickname": false,
    "memberTel": false
}

//회원 가입 양식이 제출 되었을 때
document.getElementById("signUp-frm").addEventListener("submit", function (event) {

    // checkObj에 속성 중 하나라도 false가 있으면 제출 이벤트 제거

    // for in 구문 : 객체의 key값을 순서대로 접근하는 반복문
    // [작성법] for ( let 변수명(==key) in 객체명) {실행문}
    // -> 객체에서 순서대로 key값을 가져와 왼쪽 변수에 저장하고 실행문 실행

    for (let key in checkObj) {
        let str;
        // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
        if (!checkObj[key]) {
            switch (key) {
                case "memberEmail": str = "이메일이 유효하지 않습니다."; break;
                case "memberPw": str = "비밀번호가 유효하지 않습니다."; break;
                case "memberPwConfirm": str = "비밀번호 확인이 유효하지 않습니다."; break;
                case "memberNickname": str = "닉네임이 유효하지 않습니다."; break;
                case "memberTel": str = "전화번호가 유효하지 않습니다."; break;
            }
            //대화상자 출력
            alert(str);
            //유효하지 않은 입력으로 포커스 이동
            document.getElementById(key).focus();
            event.preventDefault();
            return;

        }
    }
});

//************************************************************************************* */

// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.getElementById("emailMessage");

//input 이벤트 : 입력이 발생할 때마다 발생하는 이벤트(모든 입력 인식)
memberEmail.addEventListener("input", function () {
    // 문자가 입력되지 않은 경우
    if (memberEmail.value.trim().length == 0) {
        emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
        memberEmail.value = "";
        // confirm, error 클래스 제거
        emailMessage.classList.remove("confirm", "error");

        // 이메일 유효성 검사 결과 저장 객체에 현재상태 저장
        checkObj.memberEmail = false;
        return;
    }

    // 정규표현식을 이용한 유효성 검사
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    // .다음에 단어 반복이 1~3번
    if (regEx.test(memberEmail.value)) {
        emailMessage.innerText = "유효한 이메일 형식입니다.";
        emailMessage.classList.add("confirm");
        emailMessage.classList.remove("error");

        // 이메일 유효성 검사 결과 저장 객체에 true 저장
        checkObj.memberEmail = true;
    } else {
        emailMessage.innerText = "유효하지 않은 이메일 형식입니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");

        // 이메일 유효성 검사 결과 저장 객체에 false 저장
        checkObj.memberEmail = false;
    }

});

//************************************************************************************* */

// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

memberPw.addEventListener("input", function () {
    // 비밀번호가 입력되지 않은 경우
    if (memberPw.value.trim().length == 0) {
        pwMessage.innerText = "영어, 숫자, 특수문자(!,@,#,-,_) 를 포함한 6~20글자 사이로 입력해주세요.";
        memberPw.value = "";
        pwMessage.classList.remove("confirm", "error");

        checkObj.memberPw = false;
        return;
    }

    // 비밀번호 정규표현식 검사
    const regEx = /^[A-Za-z\d!@#\-\_]{6,20}$/;
    // /^[a-z][A-Za-z\d!@#\-\_]{5,19}$/; 특정 문자 추가 시 범위를 조절해야함
    if (regEx.test(memberPw.value)) {     //// 유효한 경우
        checkObj.memberPw = true;

        // 유효한 비밀번호 + 확인 작성 X
        if (memberPwConfirm.value.trim().length == 0) {
            pwMessage.innerText = "유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

        } else {// 유효한 비밀번호 + 확인 작성 O -> 같은지 비교

            // 문제점 
            // 비밀번호 확인 인풋에서 유효성검사를 완료 후
            // 다시 비밀번호 인풋을 변경하면
            // 실제로는 다르지만 비밀번호 확인 유효성값은 true가 유지됨

            // 비밀번호 == 비밀번호 확인 같은지 검사
            if (memberPw.value == memberPwConfirm.value) {
                pwMessage.innerText = "비밀번호가 일치합니다.";
                pwMessage.classList.add("confirm");
                pwMessage.classList.remove("error");

                checkObj.memberPwConfirm = true;
            } else {
                pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");

                checkObj.memberPwConfirm = false;
            }
        }
    } else {
        pwMessage.innerText = "유효하지 않은 비밀번호 형식입니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");

        checkObj.memberPw = false;
    }
});

// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input", function () {

    // 비밀번호가 유효할 경우에만 비밀번호 == 확인  같은지 비교

    if (checkObj.memberPw) { // 비밀번호가 유효한 경우
        // 비밀번호, 비밀번호 확인 같은지 검사
        if (memberPw.value == memberPwConfirm.value) {  // 같을 경우
            pwMessage.innerText = "비밀번호가 일치합니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            checkObj.memberPwConfirm = true;
        } else {     // 다를 경우
            pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.memberPwConfirm = false;
        }
    } else { // 비밀번호가 유효하지 않은경우
        checkObj.memberPwConfirm = false;
    }
});

//************************************************************************************* */

// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nicknameMessage = document.getElementById("nicknameMessage");

memberNickname.addEventListener("input", function () {
    // 닉네임이 입력되지 않은 경우
    if (memberNickname.value.trim().length == 0) {
        nicknameMessage.innerText = "한글, 영어, 숫자로 2~10자리를 입력해주세요.";
        nicknameMessage.classList.remove("confirm", "error");
        checkObj.memberNickname = false;
        return;
    }

    // 닉네임 정규표현식 검사
    // \w = [A-Za-z0-9_]
    const regEx = /^[가-힣\w]{2,10}$/;
    if (regEx.test(memberNickname.value)) { //유효한 경우
        // 닉네임 중복 검사 추가예정
        nicknameMessage.innerText = "유효한 닉네임입니다.";
        nicknameMessage.classList.add("confirm");
        nicknameMessage.classList.remove("error");
        checkObj.memberNickname = true;
    } else { // 유효하지 않은 경우
        nicknameMessage.innerText = "유효한 닉네임이 아닙니다.";
        nicknameMessage.classList.add("error");
        nicknameMessage.classList.remove("confirm");
        checkObj.memberNickname = false;
    }

});


//************************************************************************************* */
// 전화번호 유효성 검사

const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input", function () {
    // 문자가 입력되지 않은 경우
    if (memberTel.value.trim().length == 0) {
        telMessage.innerText = "전화번호를 입력해주세요.(-제외)";
        telMessage.classList.remove("confirm", "error");
        checkObj.memberTel = false;
        return;
    }

    // 전화번호 정규표현식 검사
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;
    // 010 1234 1234
    // 011  234 1234
    // 016 1234 1234
    // 017  234 1234
    //  02 1234 1234
    // 031 1234 1234
    // 042 1234 1234
    // 062 1234 1234
    // 070 132  1234
    if (regEx.test(memberTel.value)) { //유효한 경우
        telMessage.innerText = "유효한 전화번호 형식입니다.";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true;
    } else { // 유효하지 않은 경우
        telMessage.innerText = "유효한 전화번호 형식이 아닙니다.";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false;
    }
});

