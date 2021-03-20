const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

 // 수정사항 : 삭제하고 새로운 입력을 하면 아이디 넘버가 겹쳐서 오류를 일으킴. 이에 대해 아이디 넘버를 따로 변이되는 넘버로 수정. 수정되는 걸 '수정 1'이라 명명.

 let idNumbers = 1;

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    // const newId = toDos.length + 1; (수정해야할 사항)
    const newId = idNumbers // 수정
    idNumbers += 1; // 수정 (추가)
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function  handlesubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null) {
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handlesubmit);
}

init();