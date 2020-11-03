window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let video = document.querySelector('#video-player');
  let progress = document.querySelector('#progress'); 
  let timePicker = document.querySelector('#timer');
  let leftTime = document.querySelector('#left-timer');

  document.querySelector('#play').onclick = play;
  document.querySelector('#pause').onclick = pause;
  document.querySelector('#stop').onclick = stop;
  document.querySelector('#speed-up').onclick = speedUp;
  document.querySelector('#speed-down').onclick = speedDown;
  document.querySelector('#speed-normal').onclick = speedNormal;
  document.querySelector('#volume').oninput = videoVolume;
  document.querySelector('#sec-up').onclick = sekUp;
  document.querySelector('#sec-down').onclick = sekDown;
  document.querySelector('#volume-muted').onclick = volumeMuted;
  document.querySelector('#full-screen').onclick = fullScreen;

  video.ontimeupdate = progressUpdate;
  progress.onclick = videoRewind;

  // control buttons
  function play() {
    video.play();
  }

  function pause() {
    video.pause();
  }

  function stop() {
    video.pause();
    video.currentTime = 0;
  }

  function speedUp() {
    video.play();
    video.playbackRate += 0.2;
  }

  function speedDown() {
    video.play();
    video.playbackRate -= 0.2;
  }

  function speedNormal() {
    video.play();
    video.playbackRate = 1;
  }

  function sekUp() {
    video.currentTime += 10;
  }

  function sekDown() {
    video.currentTime -= 10;
  }

  function videoVolume() {
    let v = this.value;
    video.volume = v / 100;
  }

  // Sound on / off
  function volumeMuted() {
    video.muted = !video.muted;
    let vol = document.querySelector('#volume-muted');

    if (!video.muted) {
      document.getElementById('volmute').classList.remove('fa-volume-mute');
      document.getElementById('volmute').classList.add('fa-volume-up');
      vol.dataset.speed = "VOLUME MUTED";

    } else if (video.muted) {
      document.getElementById('volmute').classList.remove('fa-volume-up');
      document.getElementById('volmute').classList.add('fa-volume-mute');
      vol.dataset.speed = "VOLUME ON";
    }
  }

  // Full Screen
  function fullScreen () {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  }

  // Video progress bar, view time output
  function progressUpdate() {
    let duration = video.duration;
    let currentTime = video.currentTime;
    let l = video.duration - video.currentTime;
    progress.value = (100 * currentTime) / duration;
    timePicker.innerHTML = secondsToTime(video.currentTime);
    leftTime.innerHTML = secondsToTime(l);
  }

  function videoRewind(e) {
    let w = this.offsetWidth;
    let o = e.offsetX;
    this.value = 100 * o / w;
    video.currentTime = video.duration * (o / w);
    video.play();
  }

  // calculate displayed time
  function secondsToTime(time) {
    let h = Math.floor(time / (60 * 60)),
        dm = time % (60 * 60),
        m = Math.floor(dm / 60),
        ds = dm % 60,
        s = Math.ceil(ds);

    let fulltime = '00:00';
        
    if (s === 60) {
    s = 0;
    m = m + 1;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (m === 60) {
      m = 0;
      h = h + 1;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (h === 0) {
      fulltime = m + ':' + s;
    } else {
      fulltime = h + ':' + m + ':' + s;
    }
    return fulltime;
  }

  window.onunload = function() {
    localStorage.setItem ("currentTime", video.currentTime);
  }

  if (localStorage.currentTime) {
    video.currentTime = localStorage.currentTime;
  }

});