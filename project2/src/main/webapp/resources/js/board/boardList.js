//썸네일 클릭 시 Modal창으로 출력하기
//즉시 실행 함수
(() => {
    const thumbnailList = document.getElementsByClassName("list-thumbnail");

    if (thumbnailList.length > 0) {

        //Modal관련 요소 얻어오기
        const modal = document.querySelector(".modal");
        const modalClose = document.getElementById("modal-close");
        const modalImg = document.getElementById("modal-image");

        //썸네일 요소에 클릭 이벤트 추가
        for (let th of thumbnailList) {
            th.addEventListener("click", () => {
                //modal창에 show클래스가 없으면 추가(있으면 삭제) 
                modal.classList.toggle("show");

                //클릭한 썸네일의 src속성값을 얻어와 modal-image의 src속성값으로 설정
                modalImg.setAttribute("src", th.getAttribute("src"));

            });
        }

        //모달창 닫기
        modalClose.addEventListener("click", () => {
            //hide클래스를 추가해 0.5동안 투명해지는 애니메이션 수행
            modal.classList.toggle("hide");

            //0.5초 후에 show,hide클래스를 제거
            setTimeout(() => {
                modal.classList.remove("show");
                modal.classList.remove("hide");
            }, 500);
        });

    }
})();

//글쓰기 버튼
(()=>{
    const insertBtn = document.getElementById("insertBtn");
    if(insertBtn != null){  //버튼이 존재할 때만
        insertBtn.addEventListener("click",()=>{
            location.href="/write/"+boardCode;
        });
    }
})();


// 검색을 한 경우 검색창에 검색key, query 남겨놓기
(()=>{
    const select = document.getElementById("search-key");
    const input = document.getElementById("search-query");
    const option = document.querySelectorAll("#search-key > option");

//쿼리스트링에서 원하는 값만 얻어오기
    if(select != null){
        const params = new URL(location.href).searchParams; //주소에서 쿼리스트링만 분리한 객체
        const key = params.get("key");                      //key값 얻어오기
        const query = params.get("query");                  //query값 얻어오기

        // input에 이전 검색어를 값으로 추가
        input.value = query;

        // select에 이전 검색한 key값과 일치하는 option태그에 selected 속성 추가
        for(let op of option){
            //option의 value값과 key값이 같으면
            if(op.value == key){
                //op.setAttribute("selected", true);
                op.selected = true;
            }
        }
    }
})();
