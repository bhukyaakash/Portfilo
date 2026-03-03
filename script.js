// --- PARTICLES.JS INITIALIZATION ---
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f0ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});

// --- TAB SYSTEM LOGIC ---
function opentab(tabname, element) {
    let tablinks = document.getElementsByClassName("tab");
    let tabcontents = document.getElementsByClassName("tab-content");
    for (tablink of tablinks) tablink.classList.remove("active");
    for (tabcontent of tabcontents) tabcontent.classList.remove("active");
    element.classList.add("active");
    document.getElementById(tabname).classList.add("active");
}

// --- MOBILE MENU LOGIC ---
const sidemenu = document.getElementById("sidemenu");
function openmenu() { sidemenu.style.right = "0"; }
function closemenu() { sidemenu.style.right = "-250px"; }

// --- CONTACT FORM SUBMISSION (Google Sheets) ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbx5bFznDBk8cqPKuFxBtupWmHsMbL5nvUOI29lANyHZi9h5Qa5CE8I_R0vZTi8JbCDc/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        msg.innerHTML = "Submitting message...";
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML = "Message Sent Successfully! ✅";
                setTimeout(() => msg.innerHTML = "", 5000);
                form.reset();
            })
            .catch(error => {
                msg.innerHTML = "Oops! Error sending message. ❌";
                console.error('Error!', error.message);
            });
    });
}

// --- AI CHATBOT INTERACTION ---
function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.style.display = (chat.style.display === "flex") ? "none" : "flex";
}

function handleChat(e) {
    if(e.key === "Enter") {
        let input = document.getElementById("chatInput");
        let body = document.getElementById("chatBody");
        if(input.value.trim() !== "") {
            body.innerHTML += `<p class="user">${input.value}</p>`;
            let reply = generateReply(input.value.toLowerCase());
            setTimeout(() => {
                body.innerHTML += `<p class="bot">${reply}</p>`;
                body.scrollTop = body.scrollHeight;
            }, 600);
            input.value = "";
        }
    }
}

function generateReply(msg) {
    if(msg.includes("resume") || msg.includes("cv")) return "You can download my latest resume directly from the Home or About section!";
    if(msg.includes("skills")) return "I am proficient in MERN stack, Python/Flask, Machine Learning, and UI/UX design.";
    if(msg.includes("project") || msg.includes("work")) return "I've built the Agri Surgeon plant disease detection system, banking applications, and tourism platforms.";
    if(msg.includes("contact") || msg.includes("email")) return "You can reach me at bhukyaakash99@gmail.com or via the contact form on this page!";
    if(msg.includes("education")) return "I'm a B.Tech CSE graduate from IIIT Kottayam.";
    return "That's interesting! Feel free to ask more about my technical background or how to get in touch.";
}
