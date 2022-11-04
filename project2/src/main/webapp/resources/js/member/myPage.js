// 비밀번호 변경 유효성 검사

// 비밀번호 변경 form요소
const changePwForm = document.getElementById("changePwForm");

if (changePwForm != null) {
    // 이벤트 핸들러 매개변수 e == event  
    // -> 현재 발생한 이벤트 정보를 가지고 있는 event 객체 전달
    changePwForm.addEventListener("submit", function (event) {

        console.log(event);

        const currentPw = document.getElementById("currentPw");
        const newPw = document.getElementById("newPw");
        const newPwConfirm = document.getElementById("newPwConfirm");

        // 현재 비밀번호
        if (currentPw.value.trim().length == 0) {
            alertAndFocus(currentPw, "현재 비밀번호를 입력해주세요.");

            //return false; --> 인라인 이벤트 모델 onsubmit="return 함수명()"; 에서 사용
            event.preventDefault(); // --> 이벤트를 수행하지 못하게 하는 함수, 기본 이벤트 삭제
            return;
        }

        // 새 비밀번호
        if (newPw.value.trim().length == 0) {
            alertAndFocus(newPw, "새 비밀번호를 입력해주세요.");
            event.preventDefault();
            return;
        }

        // 새 비밀번호 확인
        if (newPwConfirm.value.trim().length == 0) {
            alertAndFocus(newPwConfirm, "새 비밀번호 확인을 입력해주세요.");
            event.preventDefault();
            return;
        }

        // 비밀번호 정규식 검사



        // 새 비밀번호와 새 비밀번호 확인 일치 여부
        if (newPw.value != newPwConfirm.value) {
            alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            newPwConfirm.focus();
            event.preventDefault();
            return;
        }

    }


    );

}

// 경고창 출력 + 포커스 이동 + 값 삭제 
function alertAndFocus(input, str) {
    alert(str);
    input.focus();
    input.value = "";
}


//****************************************************************** *

// 회원 탈퇴 유효성 검사
// 인라인 이벤트 모델 또는 표준 이벤트 모델

// 1) 비밀번호 미작성 -> "비밀번호를 입력해주세요." alert출력 후 포커스 이동(내용 삭제)
// 2) 동의 체크가 되지 않은 경우 -> "탈퇴 동의하시면 체크를 눌러주세요." alert출력 후 포커스 이동
// 3) 1번, 2번이 모두 유효할 때 정말 탈퇴를 진행할 것인지 확인하는 confirm출력 (확인 클릭 -> 탈퇴 / 취소-> 탈퇴 취소)

//표준 이벤트 모델
const memberDeleteForm = document.getElementById("memberDeleteForm");

if (memberDeleteForm != null) {
    memberDeleteForm.addEventListener("submit", function (event) {
        const memberPw = document.getElementById("memberPw");
        const agree = document.getElementById("agree");
        // 비밀번호 미작성
        if (memberPw.value.trim().length == 0) {
            alertAndFocus(memberPw, "비밀번호를 입력해주세요.");
            event.preventDefault();
            return;
        }
        // 동의 체크가 되지 않은 경우
        if (!agree.checked) {
            alert("탈퇴 동의하시면 체크를 눌러주세요.");
            agree.focus();
            event.preventDefault();
            return;
        }
        //1)2) 모두 유효할 때 정말 탈퇴를 진행할 것인지 확인하는 confirm출력 
        //    (확인 클릭 -> 탈퇴 / 취소-> 탈퇴 취소)
        //if (agree.checked && memberPw.value.trim().length != 0) {    
        if (!confirm("정말 탈퇴하시겠습니까?")) {
            alert("탈퇴 취소");
            event.preventDefault();
            return;
        }
    });
}

// 인라인 이벤트 모델
// function memberDeleteValidate() {

//     const memberPw = document.getElementById("memberPw");
//     if (memberPw.value.trim().length == 0) {
//         alertAndFocus(memberPw, "비밀번호를 입력해주세요.");
//         return false;
//     }

//     const agree = document.getElementById("agree");
//     if (!agree.checked) {
//         alert("탈퇴 동의하시면 체크를 눌러주세요.");
//         agree.focus();
//         return false;
//     }

//     if (!confirm("정말 탈퇴하시겠습니까?")) {
//         alert("탈퇴 취소");
//         return false;
//     }

//     return true;
// }
