const video = document.querySelector("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeRange = document.getElementById("volumeRange");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    playPauseBtn.className = "fas fa-pause";
  } else {
    video.pause();
    playPauseBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    muteBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    muteBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    muteBtn.className = "fas fa-volume-off";
  } else {
    muteBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleloadedmetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    // video.width = 800;
    // video.height = 600;
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    // video.width = window.screen.availWidth;
    // video.height = window.screen.availHeight;
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};
const handleHotkeys = (event) => {
  const key = event.code;
  console.log(key);
  if (key === "KeyF") {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
  if (key === "Space") {
    handlePlayAndStop();
  }
};

playPauseBtn.addEventListener("click", handlePlayAndStop);
muteBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleloadedmetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
window.addEventListener("keyup", handleHotkeys);
