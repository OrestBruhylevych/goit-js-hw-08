import Player from '@vimeo/player';
import throttle  from'lodash.throttle';

const refs = {
iframe: document.querySelector('#vimeo-player')
};

const CURRENTTIME_KEY = "videoplayer-current-time";
const player = new Player(refs.iframe);

startPage();

player.on('timeupdate', throttle(onSaveStorageTime, 1000));

function onSaveStorageTime({seconds}) {
    localStorage.setItem(CURRENTTIME_KEY, seconds);
}

function startPage() {
    const currentTime = localStorage.getItem(CURRENTTIME_KEY);
    if (currentTime) {
        player.setCurrentTime(currentTime);
    }
}