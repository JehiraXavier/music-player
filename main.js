let now_playing = document.querySelector(".now-playing");
let track_cover = document.querySelector(".track-cover");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let play_pause_button = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let is_playing = false;
let update_timer;

let current_track = document.createElement("audio");

let track_list = [
  {
    name: "On Top of the World",
    artist: "Imagine Dragons",
    image: "./images/On_Top_Of_The_World.jpg",
    path: "./audio/On_Top_Of_The_World.mp3",
  },
  {
    name: "Baila Baila Baila",
    artist: "Ozuna",
    image: "./images/Baila_Baila_Baila.png",
    path: "./audio/Baila_Baila_Baila.mp3",
  },
  {
    name: "I'm Good (Blue)",
    artist: "David Guetta, Bebe Rexha",
    image: "./images/Good.png",
    path: "./audio/I_m_Good_Blue_.mp3",
  },
  {
    name: "Whenever. Wherever",
    artist: "Shakira",
    image: "./images/Whenever_Wherever.jpg",
    path: "./audio/Whenever_Wherever.mp3",
  },
  {
    name: "Dreamers",
    artist: "Jungkook",
    image: "./images/Dreamers.jpeg",
    path: "./audio/Dreamers.mp3",
  },
  {
    name: "Calm Down",
    artist: "Rema, Selena Gomez",
    image: "./images/Calm_Down.png",
    path: "./audio/Calm_Down.mp3",
  },
  {
    name: "New Rules",
    artist: "Dua Lipa",
    image: "./images/New_Rules.png",
    path: "./audio/New_Rules.mp3",
  },
  {
    name: "Scooby Doo Pa Pa",
    artist: "DJ Kass",
    image: "./images/Scooby_Doo_Pa_Pa.jpg",
    path: "./audio/Scooby_Doo_Pa_Pa.mp3",
  },
];

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}

function load_track(track_index) {
  clearInterval(update_timer);
  reset_values();
  current_track.src = track_list[track_index].path;
  current_track.load();

  track_cover.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  update_timer = setInterval(seekUpdate, 1000);
  current_track.addEventListener("ended", next_track);
  random_bg_color();
}

function reset_values() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

load_track(track_index);

function play_pause_track() {
  if (!is_playing) play_track();
  else pause_track();
}

function play_track() {
  current_track.play();
  is_playing = true;
  play_pause_button.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pause_track() {
  current_track.pause();
  is_playing = false;
  play_pause_button.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function next_track() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  load_track(track_index);
  play_track();
}

function prev_track() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  load_track(track_index);
  play_track();
}

function seekTo() {
  let seekto = current_track.duration * (seek_slider.value / 100);
  current_track.currentTime = seekto;
}

function set_volume() {
  current_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(current_track.duration)) {
    seekPosition = current_track.currentTime * (100 / current_track.duration);

    seek_slider.value = seekPosition;

    let current_minutes = Math.floor(current_track.currentTime / 60);
    let current_seconds = Math.floor(
      current_track.currentTime - current_minutes * 60
    );
    let duration_minutes = Math.floor(current_track.duration / 60);
    let duration_seconds = Math.floor(
      current_track.duration - duration_minutes * 60
    );

    if (current_seconds < 10) {
      current_seconds = "0" + current_seconds;
    }
    if (duration_seconds < 10) {
      duration_seconds = "0" + duration_seconds;
    }
    if (current_minutes < 10) {
      current_minutes = "0" + current_minutes;
    }
    if (duration_minutes < 10) {
      duration_minutes = "0" + duration_minutes;
    }

    current_time.textContent = current_minutes + ":" + current_seconds;
    total_duration.textContent = duration_minutes + ":" + duration_seconds;
  }
}
