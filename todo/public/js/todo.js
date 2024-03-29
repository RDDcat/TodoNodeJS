const todo_log = document.querySelector(".todo-log");
const todo_list = document.querySelector(".todo-list");
const todo_input = document.querySelector(".todo-input");

let todoListBoxes;

setUpTodoList();
async function setUpTodoList(){
    console.log("setUpTodoList 중");

    // JSON 데이터 서버에서 가져옴
    var data = await getJSONData("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/todo/list/"+getCookie("user"));
    var history_data = await getJSONData("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/finishTodo/list/"+getCookie("user"));

    // 가져온 데이터로 형식에 맞추어 todo_list 밑에 붙여넣음
    await setUp(data);
    await setUpHistory(history_data);
}

async function getJSONData(url) {
    var flag = true;
    const response = await fetch(url)
    .catch(() => {
        flag = false;
    });
    if(flag){
        const jsonData = await response.json();
        return jsonData;
    }
}

async function setUpHistory(history_data){
    // 히스토리 셋업
    for(var i =0; i < history_data.length; i++){
        console.log(history_data[i]);
        var my_var =   '<div class="todo-log-content">'+
                            history_data[i].content +
                        '</div>'+
                        '<div class="todo-log-btn">'+
                        '    <i class="icon fa-solid fa-trash-can"></i>'+
                        '</div>';
        var temp = document.createElement("div");
        temp.className = "todo-log-box";    
        temp.innerHTML = my_var;
        temp.draggable = true;
        temp.id = history_data[i].id;
        todo_log.appendChild(temp);

        // 히스토리 휴지통 버튼
        const trash_can = temp.querySelector('.fa-trash-can');
        trash_can.addEventListener("click", (event) => {
            const id = event.target.closest('.todo-log-box').id;
            console.log("trash bin clicked : ", id);            
            var data = {id: id,
                        userId: getCookie("user")
            };

            fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/finishTodo", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "DELETE",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            
            event.target.closest(".todo-log-box").remove();
        });
    }
}
async function setUp(data){
    console.log("setUP : "+ data.length);
    for(var i =0; i < data.length; i++){
        my_var = 
            '    <div class="todo-list-content">'+
                data[i].content+
            '    </div>'+
            '    <div class="todo-list-btn" id="'+data[i].id +'">'+
            '        <i class="icon fa-solid fa-check"></i>'+
            '        <i class="icon fa-solid fa-trash-can"></i>'+
            '    </div>'
        var temp = document.createElement("div");
        temp.className = "todo-list-box";
        temp.draggable = true;
        temp.innerHTML = my_var;
        temp.id = data[i].id;
        todo_list.appendChild(temp);

        const check_icon = temp.querySelector('.fa-check');
        const trash_icon = temp.querySelector('.fa-trash-can');
        console.log("check clicked : ", data[i].id);
        check_icon.addEventListener("click", (event) => {
            // 투두 체크 버튼
            console.log("check clicked : ", event.target.closest('.todo-list-btn').id);

            var data = {
                id: event.target.closest('.todo-list-btn').id,
                userId: getCookie('user')
                };
            console.log("data clicked : ", data);
            fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/finishTodo", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
        });
        
        trash_icon.addEventListener("click", (event) => {
            // 투두 휴지통 버튼
            const id = event.target.closest('.todo-list-btn').id;
            deleteTodo(id);

            event.target.closest(".todo-list-box").remove();
        });
    }


    // 할일 추가 셋업
    my_var = '<div class="todo-list-content">'+
'                        <label for="inp" class="inp">'+
'                            <input type="text" id="inp" placeholder="&nbsp;">'+
'                            <span class="label">할일</span>'+
'                            <span class="focus-bg"></span>'+
'                        </label>'+
'                        </div>'+
'                        <div class="todo-list-btn">'+
'                            <i class="icon fa-solid fa-plus"></i>'+
'                        </div>';
    var temp = document.createElement("div");
    temp.className = "todo-list-add-box";
    temp.draggable = true;
    temp.innerHTML = my_var;
    todo_input.appendChild(temp);

    const plus_icon = temp.querySelector('.fa-plus');
    const inpText = document.getElementById('inp');

    plus_icon.addEventListener("click", (event) => {
        // + 버튼 클릭시
        console.log("plus clicked " + inpText);
        my_var = 
            '    <div class="todo-list-content">'+
                inpText.value +
            '    </div>'+
            '    <div class="todo-list-btn" id="">'+
            '        <i class="icon fa-solid fa-check"></i>'+
            '        <i class="icon fa-solid fa-trash-can"></i>'+
            '    </div>'

        var temp = document.createElement("div");
        temp.className = "todo-list-box";
        temp.draggable = true;
        temp.innerHTML = my_var;
        todo_list.appendChild(temp);

        var data = {
            userId: getCookie('user'),
            content: inpText.value 
        };

        fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/todo", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
    });

    todoListBoxes = document.querySelectorAll('.todo-list-box');
    
    // Make all todo-list-box elements draggable and droppable
    todoListBoxes.forEach((element) => {
        makeDraggable(element);
        makeDroppable(element);
    });

    
}

async function deleteTodo(id){
    var data = {
        id: id,
        userId: getCookie('user')
    };

    console.log(data);

    fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/todo", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}


// Define the function to make an element draggable
function makeDraggable(element) {
    // Set the element's draggable attribute to true
    element.draggable = true;

    // Define the dragstart event listener to set the data transfer
    element.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.style.opacity = "0.4";
    });

    element.addEventListener('dragend', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.style.opacity = "1";
    });
}

// Define the function to make an element droppable
function makeDroppable(element) {
    // Define the dragover event listener to allow dropping
    element.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    element.addEventListener('drop', (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        console.log("id", id);
        const draggableElement = document.getElementById(id);
        console.log("draggableElement", draggableElement);
        const dropzone = event.target.closest('.todo-list-box');

        // Only insert the draggableElement if it exists
        if (draggableElement && dropzone) {
            const draggableIndex = Array.from(todoListBoxes).indexOf(draggableElement);
            const dropzoneIndex = Array.from(todoListBoxes).indexOf(dropzone);
        
            // Swap the positions of the two elements
            if (draggableIndex < dropzoneIndex) {
                dropzone.parentElement.insertBefore(draggableElement, dropzone.nextSibling);
            } else {
                dropzone.parentElement.insertBefore(draggableElement, dropzone);
            }
        }
    });
    
}




// 내가 만든 쿠키~ 
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);  
    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

// setCookie('user', '1234', 1);

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}






