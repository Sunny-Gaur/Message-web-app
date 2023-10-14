console.log("it running");
let broadcastdata = document.getElementById("user-broadcast");
let messageContianer = document.getElementById('con');
let messageInput = document.getElementById('messageinp');
let form = document.getElementById('send-contianer');
let audio=new Audio('/public/message.mp3');
let datacon = document.getElementById("con");
let hours;
let min;
let getTimes=()=>{
     date=new Date();
     hours=date.getHours();
     min=date.getMinutes(); 
}

const socket = io();
let names = prompt('enter your name');

// let alers=()=>{
//      return names;
// }
// alers();
// if(!names){
//     alert("please enter name first");
//     alers();
// }
socket.emit('new-user-joined', names);
const append = (message, position) => {
    getTimes();
    if(position=="left"){
        audio.play();
    }
    const messageElement = document.createElement("div");
    const span=document.createElement("span");
    span.classList.add("times");
    min>=10?span.innerText=`${hours}:${min}`:span.innerText=`${hours}:0${min}`;
    messageElement.innerText = message;
    messageElement.classList.add('messages');
    messageElement.classList.add(position);
    messageElement.appendChild(span);
    messageContianer.appendChild(messageElement);

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let messagedatas = messageInput.value;
    if(messagedatas){
        append(`you:${messagedatas}`,'right')
        socket.emit("send", messagedatas);
        messageInput.value=" ";
    }
 
})


socket.on("user-joined", function (data) {
    append(`${data} joined the Chat`, 'right')
})

socket.on('receive', function (data) {
    append(`${data.name}:${data.message}`,'left')
})


socket.on('left-user',function(name){
    append(`${name}:left the chat`,"left");
})


socket.on("broadcast", function (data) {
    broadcastdata.innerHTML = data.msg;
    console.log(data)
})








