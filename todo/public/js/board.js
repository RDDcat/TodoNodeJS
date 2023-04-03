const todo_list = document.querySelector(".list");


async function setUpBoard(){
    console.log("setUpBoard 시작");

    // JSON 데이터 서버에서 가져옴
    var data = await getJSONData();

    // 가져온 데이터로 형식에 맞추어 todo_list 밑에 붙여넣음
    await setUp(data);

    console.log("setUpBoard 끝");

}

async function getJSONData() {
    const response = await fetch("http://127.0.0.1:8000/previewCashBoard");
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
        temp.innerHTML = my_var;
        todo_list.appendChild(temp);
    }
    
    // 클릭이벤트
    let items = document.querySelectorAll(".item");
    console.log("items" + items);
    items.forEach((item)=> item.addEventListener("click", function(){
        ClickMemo(item);
    })
    );
}




setUpBoard();