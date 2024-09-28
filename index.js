// Getting elements from the DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const seekSlider = document.getElementById('seek-slider');
const currentTimeElem = document.getElementById('current-time');
const totalTimeElem = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
const songImage = document.querySelector('.song-image');

// Playlist array with songs
const playlist = [
    { title: 'LOML - Taylor Swift', src: 'song1.mp3', image: 'imageofcat.jpg' },
];

let currentTrackIndex = 0;
let isPlaying = false;

// Load the first track by default
loadTrack(currentTrackIndex);

// Function to load the track
function loadTrack(index) {
    audioPlayer.src = playlist[index].src;
    songImage.src = playlist[index].image;
    document.querySelector('.song-name').textContent = playlist[index].title;
}

// Play or pause the audio when clicking the play button
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Go to the next track
nextBtn.addEventListener('click', () => {
    nextTrack();
});

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Go to the previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// Update seek slider as the audio plays
audioPlayer.addEventListener('timeupdate', () => {
    seekSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
    totalTimeElem.textContent = formatTime(audioPlayer.duration);
});

// Seek functionality
seekSlider.addEventListener('input', () => {
    audioPlayer.currentTime = (seekSlider.value / 100) * audioPlayer.duration;
});

// Mute/unmute audio
muteBtn.addEventListener('click', () => {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
        audioPlayer.muted = true;
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
});

// Change the volume based on volume slider input
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Helper function to format time (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = Math.floor(seconds % 60);
    return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
}
