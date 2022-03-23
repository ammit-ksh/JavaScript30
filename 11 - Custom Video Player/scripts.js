const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenBtn = player.querySelector(".fullscreen__button");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updatePlayButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skipVideo() {
  const skipTime = this.dataset.skip;
  video.currentTime += parseFloat(skipTime);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function openFullScreen() {
  isFullScreen = true;
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) {
    /* Safari */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE11 */
    player.msRequestFullscreen();
  } else {
    player.classList.toggle("is__fullscreen");
  }
}

function closeFullscreen() {
  isFullScreen = false;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  } else {
    player.classList.toggle("is__fullscreen");
  }
}

function toggleFullScreen() {
  !isFullScreen ? openFullScreen() : closeFullscreen();
}

// toggle plays the video when play button clicked
toggle.addEventListener("click", togglePlay);
// toggle plays the video when play video clicked
video.addEventListener("click", togglePlay);

video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((btn) => btn.addEventListener("click", skipVideo));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

let isFullScreen = false;
fullscreenBtn.addEventListener("click", toggleFullScreen);
