const sendMessage = () => {
    let text = document.getElementById("input-msg").value;
    if (text.length > 0){
        const newNode = document.createElement("div");
        newNode.classList.add("message");
        newNode.textContent = text;
        let messageContainer = document.getElementById("messages");
        if (document.querySelector(".message") != null) {
            messageContainer.insertAdjacentHTML("beforeend", "<hr>");
        }
        messageContainer.appendChild(newNode);
        document.getElementById("input-msg").value = "";
        newNode.scrollIntoView({ block: 'end',  behavior: 'smooth' });

    }
}

const setupEventListeners = () => {
    document.getElementById("send-msg-btn").addEventListener("click", sendMessage);
    document.addEventListener("keydown", ev => {
        if (ev.key === "Enter") sendMessage();
    });
}

setupEventListeners();

