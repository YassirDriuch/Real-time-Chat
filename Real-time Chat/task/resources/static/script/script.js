let stompClient = null;

function connect() {
    let socket = new SockJS('http://'+ document.location.host +'/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);
}
function onMessageReceived(payload) {
    console.log(payload);
    addMessage(JSON.parse(payload.body).content);
}

function onError(event) {
    console.log(event);
    console.log("onError");
}

function sendMessage(event) {
    let messageContent = document.getElementById("input-msg").value.trim();
    if(messageContent && stompClient) {
        let chatMessage = {
            content: messageContent
        };
        stompClient.send(
            '/app/chat.sendMessage',
            {},
            JSON.stringify(chatMessage)
        );
        document.getElementById("input-msg").value = "";
    }
    event.preventDefault();
}

function addMessage(text) {
    if (text.length > 0){
        const newNode = document.createElement("div");
        newNode.classList.add("message");
        newNode.textContent = text;
        let messageContainer = document.getElementById("messages");
        if (document.querySelector(".message") != null) {
            messageContainer.insertAdjacentHTML("beforeend", "<hr>");
        }
        messageContainer.appendChild(newNode);
        newNode.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }
}

const setup = () => {
    document.getElementById("send-msg-btn").addEventListener("click", sendMessage);
    document.addEventListener("keydown", ev => {
        if (ev.key === "Enter") sendMessage(ev);
    });
    connect();
}

setup();

