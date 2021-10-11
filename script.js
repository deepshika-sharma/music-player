const audio = document.querySelector("audio");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const playPause = document.querySelector(".fa-play");
const next = document.querySelector(".fa-forward");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const img = document.querySelector("img");
const prev = document.querySelector(".fa-backward");
const progress = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const container = document.querySelector(".container");

// Song Variable
let num = 0;

let songs = [
  {
    artist: "A Chord",
    song: "Love Doesn't Need",
    duration: "3:52",
  },
  {
    artist: "One Ok Rock",
    song: "Can't Wait",
    duration: "3:19",
  },
  {
    artist: "One Ok Rock",
    song: "Listen",
    duration: "3:39",
  },
  {
    artist: "One Ok Rock",
    song: "Worst In Me",
    duration: "3:09",
  },
];

// --> Play Pause Event Listener
playPause.addEventListener("click", () => {
  if (playPause.classList.contains("fa-play")) {
    playPause.classList.replace("fa-play", "fa-pause");
    playPause.setAttribute("title", "Pause");
    audio.play();
  } else {
    playPause.classList.replace("fa-pause", "fa-play");
    playPause.setAttribute("title", "Play");
    audio.pause();
  }
});

// Updating Progress Bar
const updateProgress = () => {
  let per = ((audio.currentTime / audio.duration) * 100).toFixed(2);
  // console.log(per);
  progress.style.width = `${per}%`;
};

// Update Time
const updateTime = (time, update = false) => {
  if (time < 10) {
    start.textContent = `0:0${time}`;
  } else if (time < 60) {
    start.textContent = `0:${time}`;
  } else if (time >= 60) {
    let minutes = Math.floor((time / 60).toFixed(2));
    let seconds = time % 60;
    if (seconds < 10) {
      start.textContent = `${minutes}:0${seconds}`;
    } else {
      start.textContent = `${minutes}:${seconds}`;
    }
  }

  if (update) {
    audio.currentTime = time;
  }
};

//--> Updating Time Event Listener
audio.addEventListener("timeupdate", () => {
  let time = Math.floor(audio.currentTime.toFixed(2));
  updateTime(time);
  updateProgress();
});

// Changing tracks --> Prev/Next
const changeTrack = (track) => {
  if (track < 0) {
    track = 3;
  } else if (track === songs.length) {
    track = 0;
  }
  progress.style.width = "0%";
  audio.src = `./music/music-${track + 1}.mp3`;
  img.src = `./img/img-${track + 1}.jpg`;
  title.textContent = `${songs[track].song}`;
  artist.textContent = `${songs[track].artist}`;
  stop.textContent = `${songs[track].duration}`;

  if (playPause.classList.contains("fa-play")) {
    audio.pause();
  } else {
    audio.play();
  }
};

// Song has ended
audio.addEventListener("ended", () => {
  num++;
  changeTrack(num);
  audio.play();
});

// Prev Button
prev.addEventListener("click", () => {
  num--;
  changeTrack(num);
});

// Next Button
next.addEventListener("click", () => {
  num++;
  changeTrack(num);
});

// loading on start
const loadMusic = () => {
  let { song, artist, duration } = songs[0];
  img.src = "./img/img-1.jpg";
  audio.src = "./music/music-1.mp3";
  title.textContent = `${song}`;
  artist.textContent = `${artist}`;
  stop.textContent = `${duration}`;
};

// Changing progress for the player / seeking
progressContainer.addEventListener("click", (e) => {
  let width = e.offsetX;
  let totalWidth = e.target.clientWidth;
  let percentage = (width / totalWidth) * 100;
  progress.style.width = `${percentage}%`;

  // Changing time according to the percentage
  let newTime = parseInt(
    (percentage / 100) * Math.floor(audio.duration.toFixed(2))
  );
  updateTime(newTime, true);
});

// on Load
loadMusic();
