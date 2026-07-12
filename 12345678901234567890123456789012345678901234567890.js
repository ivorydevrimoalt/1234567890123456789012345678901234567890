document.documentElement.style.filter = "grayscale(1) contrast(1.8)";

setInterval(() => {
    const elements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, span, p, div, li, a, button, input, textarea, section, article, nav, header, footer, table, tr, td, img, label, select, form, pre"
    );

    elements.forEach(el => {
        el.childNodes.forEach(node => {
            if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim().length > 0
            ) {
                node.textContent = "NOTHING IS WORTH THE RISK";
            }
        });
    });
}, 1000);

const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
    sampleRate: 8000
});

document.addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}, { once: true });

const frequencies = [600, 800, 900, 1000];
const waveforms = ["square", "sawtooth", "triangle", "sine"];

let currentWaveform = "square";
let inverted = false;

// Every second: invert colors and pick a new waveform
setInterval(() => {
    inverted = !inverted;

    document.documentElement.style.filter = inverted
        ? "invert(1) grayscale(1) contrast(1.8)"
        : "grayscale(1) contrast(1.8)";

    currentWaveform =
        waveforms[Math.floor(Math.random() * waveforms.length)];
}, 1000);

function playRandomWave() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = currentWaveform;
    oscillator.frequency.value =
        frequencies[Math.floor(Math.random() * frequencies.length)];

    gainNode.gain.value = 1.0;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

const intervalId = setInterval(playRandomWave, 10);
