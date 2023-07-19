// Accessing DOM elements (same as your existing script)
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcribedText = document.getElementById('transcribed-text');
const downloadBtn = document.getElementById('download-btn');

// Variables to store audio recording and recognition objects (same as your existing script)
let recognition;
let audioChunks = [];

// Function to handle updating the transcribed text and enabling the "Download Text" button
function updateTranscribedText(event) {
    const interimTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
    transcribedText.innerText = interimTranscript;
    if (interimTranscript.trim() !== '') {
        downloadBtn.disabled = false;
    } else {
        downloadBtn.disabled = true;
    }
}

// Initializing the speech recognition (updated version)
window.onload = function () {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            startBtn.disabled = true;
            stopBtn.disabled = false;
            downloadBtn.disabled = true;
        };

        recognition.onend = () => {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            if (transcribedText.innerText.trim() !== '') {
                downloadBtn.disabled = false;
            }
        };

        recognition.onresult = updateTranscribedText;

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

function downloadText() {
    const textToDownload = transcribedText.value; // Use the textarea's value instead of innerText
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });

    // Create a download link for the Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcribed_text.txt';
    a.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(url);
}


// Event listeners for the buttons
startBtn.addEventListener('click', startRecognition);
stopBtn.addEventListener('click', stopRecognition);
downloadBtn.addEventListener('click', downloadText);

