// Accessing DOM elements
const inputText = document.getElementById('input-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcribedText = document.getElementById('transcribed-text');

// Variables to store audio recording and recognition objects
let recognition;
let audioChunks = [];

// Initializing the speech recognition
window.onload = function () {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            startBtn.disabled = true;
            stopBtn.disabled = false;
        };

        recognition.onend = () => {
            startBtn.disabled = false;
            stopBtn.disabled = true;
        };

        recognition.onresult = (event) => {
            const interimTranscript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join('');
            inputText.value = interimTranscript;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopRecognition();
        };
    } else {
        console.error('Speech recognition not supported in this browser.');
        startBtn.disabled = true;
    }
};

// Start speech recognition
function startRecognition() {
    audioChunks = [];
    recognition.start();
}

// Stop speech recognition
function stopRecognition() {
    recognition.stop();
}

// Event listeners for the buttons
startBtn.addEventListener('click', startRecognition);
stopBtn.addEventListener('click', stopRecognition);
