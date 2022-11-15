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


//-----------------------------------------------------------------------------------
//프로필 수정

const profileImage = document.getElementById("profile-image");
const deleteImage = document.getElementById("delete-image");
const imageInput = document.getElementById("image-input");

//초기 프로필 이미지 상태를 저장하는 변수
//(true : 업로드된 이미지 있음, false : 기본 이미지)
let initCheck;

//이미지가 업로드 되었거나 삭제되었음을 나타내는 변수
//(-1 : 초기값(취소), 0 : 삭제(x버튼 클릭), 1 : 새 이미지 업로드)
let deleteCheck = -1;


//프로필 수정 페이지에 처음 들어왔을 때의 이미지 경로
const originalImage = profileImage.getAttribute("src");

//프로필 수정 화면일 경우
if (imageInput != null) {

    //해당 화면 진입 시 프로필 이미지 상태를 저장(initCheck)
    if (profileImage.getAttribute("src") == "/resources/images/user.png") {
        //기본 이미지일 경우
        initCheck = false;
    } else {
        initCheck = true;
    }

    // 이미지가 선택되었을 때 미리보기

    //input type="file" 요소는 값이 없을 때 ''(빈칸)
    //input type="file" 요소는 이전에 선택한 파일이 있어도 취소하면 다시 ''(빈칸)
    //input type="file" 요소로 파일을 선택하면 change이벤트 발생

    imageInput.addEventListener("change", e => {
        //e.target : 이벤트가 발생한 요소(==imageInput)
        //화살표 함수에서 this는 window객체
        console.log(e.target.files);
        console.log(e.target.files[0]);

        if (e.target.files[0] != undefined) {

            const reader = new FileReader();
            //FileReader(파일 읽는 객체)
            //웹 애플리케이션이 비동기적으로 파일 내용을 읽을 수 있도록 해주는 File객체
            //읽은 파일의 내용을 저장할 수 있는 속성

            reader.readAsDataURL(e.target.files[0]);
            //FileReader.readAsDataURL("파일") 
            //지정된 파일을 읽고 base64 인코딩된 Data URL 문자열로 리턴

            //FileReader.onload : 읽기가 완료되면 load이벤트 발생
            reader.onload = event => {

                //event.target.result : 읽은 파일 결과의 경로
                event.target.result;

                //img 태그의 src속성에 읽은 파일 결과의 경로를 저장 == 이미지 미리보기
                profileImage.setAttribute("src", event.target.result);
                deleteCheck = 1;
            };

        } else { //취소가 눌러진 경우
            //이전 이미지 경로를 저장했다가 다시 불러오기
            profileImage.setAttribute("src", originalImage);
            deleteCheck = -1;
        }
    });

    //x버튼 클릭 시 이미지 삭제 -> 기본 이미지로 변경
    deleteImage.addEventListener("click", () => {
        profileImage.setAttribute("src", "/resources/images/user.png");
        imageInput.value = "";
        deleteCheck = 0;
    });
}

function profileValidate() {
    //이미지가 없음 -> 있음
    if (!initCheck && deleteCheck == 1) {
        return true;
    }

    //이미지가 있음 -> 없음(x버튼)
    if (initCheck && deleteCheck == 0) {
        return true;
    }

    // 있음 -> 있음(새로운 이미지 업로드)
    if (initCheck && deleteCheck == 1) {
        return true;
    }

    alert("이미지 변경 후 클릭하세요.");
    return false;
}