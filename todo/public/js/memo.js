function saveMemo(){
    alert("save");
}


const todo_list = document.querySelector(".todo-list");


async function setUpTodoList(){
    console.log("setUpTodoList 중");

    // JSON 데이터 서버에서 가져옴
    var data = await getJSONData();

    // 가져온 데이터로 형식에 맞추어 todo_list 밑에 붙여넣음
    await setUp(data);

}

async function getJSONData() {
    const response = await fetch("http://127.0.0.1:8000/previewCashBoard");
    console.log(response);
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

function setUp(data){
    console.log("setUP : "+ data.length);
    for(var i =0; i < data.length; i++){
        my_var = 
            '    <div class="todo-list-content">'+
                data[i].cashData+
            '    </div>'+
            '    <div class="todo-list-btn">'+
            '        <i class="icon fa-solid fa-check"></i>'+
            '        <i class="icon fa-solid fa-trash-can"></i>'+
            '    </div>'
        var temp = document.createElement("div");
        temp.className = "todo-list-box";
        temp.draggable = true;
        temp.innerHTML = my_var;
        todo_list.appendChild(temp);
    }
    
    
}




setUpTodoList();
