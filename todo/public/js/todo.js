
const todo_list = document.querySelector(".todo-list");
let todoListBoxes;

setUpTodoList();
async function setUpTodoList(){
    console.log("setUpTodoList 중");

    // JSON 데이터 서버에서 가져옴
    var data = await getJSONData();

    // 가져온 데이터로 형식에 맞추어 todo_list 밑에 붙여넣음
    await setUp(data);
}

async function getJSONData() {
    var flag = true;
    const response = await fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/previewTodo")
    .catch(() => {
        flag = false;
    });
    if(flag){
        const jsonData = await response.json();
        return jsonData;
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
            // your code to handle the click event for the check icon
            console.log("check clicked : ", data[i]);
        });
        trash_icon.addEventListener("click", (event) => {
            // your code to handle the click event for the trash icon
            const id = event.target.closest('.todo-list-btn').id;
            deleteTodo(id);

            event.target.closest(".todo-list-box").remove();
        });
    }
    my_var = '<div class="todo-list-content">'+
'                            <label for="inp" class="inp">'+
'                                <input type="text" id="inp" placeholder="&nbsp;">'+
'                                <span class="label">할일</span>'+
'                                <span class="focus-bg"></span>'+
'                            </label>'+
'                        </div>'+
'                        <div class="todo-list-btn">'+
'                            <i class="icon fa-solid fa-plus"></i>'+
'                        </div>';
    var temp = document.createElement("div");
    temp.className = "todo-list-add-box";
    temp.draggable = true;
    temp.innerHTML = my_var;
    todo_list.appendChild(temp);

    const plus_icon = temp.querySelector('.fa-plus');
    plus_icon.addEventListener("click", (event) => {
        // your code to handle the click event for the plus icon
        console.log("plus clicked");
    });

    todoListBoxes = document.querySelectorAll('.todo-list-box');
    
    // Make all todo-list-box elements draggable and droppable
    todoListBoxes.forEach((element) => {
        makeDraggable(element);
        makeDroppable(element);
    });
}

async function deleteTodo(id){
    var data = {id: id};

    console.log(data);

    fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/todoDelete", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
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


