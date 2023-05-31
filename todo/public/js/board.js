const todo_list = document.querySelector(".list");
const modal_memo = document.querySelector(".modal-memo");
const modal_update = document.querySelector(".modal-update");
const modal_overlay = document.querySelector(".modal-overlay");
const modal_title = document.querySelector(".modal-title");
const modal_body = document.querySelector(".modal-body");

const modal_input_title = document.querySelector(".modal-input-title");
const modal_input_body = document.querySelector(".modal-input-body");

async function setUpBoard(){
    console.log("setUpBoard 시작");

    // JSON 데이터 서버에서 가져옴
    var data = await getJSONData();

    // 가져온 데이터로 형식에 맞추어 todo_list 밑에 붙여넣음
    await setUp(data);

    console.log("setUpBoard 끝");

}

async function getJSONData() {
    const response = await fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/cashBoards/user/"+getCookie("user"));
    const jsonData = await response.json();
    return jsonData;
}

function setUp(data){
    console.log("setUP : "+ data.length);
    for(var i =0; i < data.length; i++){
        my_var = data[i].cashData;
        var temp = document.createElement("li");
        temp.className = "item";
        temp.draggable = true;
        temp.id = data[i].id;
        temp.innerHTML = my_var;
        todo_list.appendChild(temp);
    }
    
    // 클릭이벤트
    let items = document.querySelectorAll(".item");
    console.log("items" + items);

    items.forEach((item)=> item.addEventListener("click", function(){
        showMemo(item);
    })
    );
}

// modal_overlay.addEventListener("click", function(){
//         console.log("오버레이 클릭");
//         modal_memo.classList.add("hidden");            
// });

async function showMemo(item){
    console.log("item : " + item.id); 

    // 데이터 가져옴
    var url = new URL('http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/board/'+ item.id +'/user/'+ getCookie("user"));
    // var params = { id: item.id };
    // url.search = new URLSearchParams(params).toString();

    var responseDetail;
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        responseDetail = data;
    });
    console.log('responseDetail : ', responseDetail);

    modal_title.innerHTML = responseDetail.title;
    modal_body.innerHTML = responseDetail.content;

    // 보이기
    modal_memo.classList.remove("hidden");       
}; 



setUpBoard();


function updateBoard(e){
    console.log("updateBoard : ", modal_body.value);

    // 데이터 가져옴
    modal_input_title.value= modal_title.innerHTML;
    modal_input_body.value= modal_body.innerHTML;

    modal_update.classList.remove("hidden");
    modal_memo.classList.add("hidden");
}

function submitUpdate(e){
    console.log("submitUpdate");
    // modal_title.innerHTML = document.getElementById('myText').value;

    modal_update.classList.add("hidden");      
    modal_memo.classList.remove("hidden");



    // 백엔드에 데이터 업데이트

    
}

function addText()
{
    
}


function closeBoard()
{
    console.log("헤으응");
    modal_memo.classList.add("hidden");    
}