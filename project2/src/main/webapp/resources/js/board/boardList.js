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