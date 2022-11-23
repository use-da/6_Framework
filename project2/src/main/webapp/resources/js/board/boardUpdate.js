//이미지 미리보기
const inputImage = document.getElementsByClassName("inputImage");
const preview = document.getElementsByClassName("preview");
const deleteImage = document.getElementsByClassName("delete-image");



//기존에 존재하다가 삭제된 이미지의 순서를 기록--------------------------------------------------
const deleteSet = new Set();  //순서X


//미리보기와 관련된 모든 요소의 개수는 5개로 동일
//== 인덱스 번호를 통해 하나의 그룹을 지정할 수 있다.
//inputImage[0]  preview[0]  deleteImage[0]

for(let i=0; i<inputImage.length; i++){
    //inputImage[i] 요소의 값이 변했을 때
    inputImage[i].addEventListener("change",event=>{
        
        //event.target.files : 선택된 파일이 들어있는 배열
        if(event.target.files[0] != undefined){   //선택된 파일이 있을 때

            const reader = new FileReader();   //파일을 읽어오는 객체
            reader.readAsDataURL(event.target.files[0]);  
            // 지정된 input type="file"의 파일을 읽어와 URL형태로 저장

            reader.onload = e => {  //파일을 다 읽어온 후           
                //e.target == reader
                //e.target.result : 읽어온 파일의 URL
                preview[i].setAttribute("src",e.target.result);

                // 미리보기가 추가됨 == 파일이 추가됨                --------------------------------------
                // 삭제하면 안된다 == deleteSet에서 해당 순번을 제거
                deleteSet.delete(i);

            }

        }else{    // 취소를 누를 경우
            //미리보기 지우기
            preview[i].removeAttribute("src");   //src속성 제거
        }
    });

    //삭제 버튼을 누를 경우
    deleteImage[i].addEventListener("click",()=>{
        //미리보기 이미지가 존재할 때만 삭제
        if(preview[i].getAttribute("src") != ""){
            //미리보기 이미지 삭제
            preview[i].removeAttribute("src");
            //input type="file"의 파일 삭제
            inputImage[i].value = "";

            //삭제된 이미지의 순번을 기록 --------------------------------------------------------------
            deleteSet.add(i) 
        }
    });
}

// 게시글 수정 유효성 검사  --------------------------------------------------------------------------
function updateValidate(){
    const boardTitle = document.querySelector("[name=boardTitle]");
    const boardContent = document.querySelector("[name=boardContent]");

    if(boardTitle.value.trim().length == 0){
        alert("제목을 입력하세요.");
        boardTitle.value = "";
        boardTitle.focus();
        return false;
    }

    if(boardContent.value.trim().length == 0){
        alert("내용을 입력하세요.");
        boardContent.value = "";
        boardContent.focus();
        return false;
    }

    //deleteSet의 값을 "0,1,2"의 형태로 변환하여 form태그 내부 input태그로 추가해 같이 제출---------------
    
    // Array.from(deleteSet) : deleteSet을 배열로 변환
    // JS배열 특징 : 배열의 HTML요소 또는 console.log()로 출력하면 요소,요소,요소 형태의 문자열로 변환
    document.getElementById("deleteList").value = Array.from(deleteSet);


    return true;
}
