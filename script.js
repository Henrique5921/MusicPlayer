const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const coverArt = document.querySelector('.cover-art');

// Playlist (Você pode adicionar seus próprios arquivos locais aqui, ex: 'musica.mp3')
const songs = [
    {
        title: 'Brisa Suave',
        artist: 'SoundHelix Artist 1',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        title: 'Ritmo Noturno',
        artist: 'SoundHelix Artist 2',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        title: 'Jornada Épica',
        artist: 'SoundHelix Artist 3',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
];

let songIndex = 0;

// Carregar música inicial na tela
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Muda ícone para Pause
    coverArt.classList.add('playing'); // Faz o disco girar
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Muda ícone para Play
    coverArt.classList.remove('playing'); // Para o disco
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; // Volta para a última se estiver na primeira
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; // Volta para a primeira se estiver na última
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Atualiza a barra de progresso e o tempo
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    // Atualiza a largura da barra
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calcula e formata o tempo atual
    let currentMins = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs < 10) currentSecs = `0${currentSecs}`;
    currentTimeEl.innerText = `${currentMins}:${currentSecs}`;

    // Calcula e formata a duração total (evita mostrar NaN no início)
    if (duration) {
        let durMins = Math.floor(duration / 60);
        let durSecs = Math.floor(duration % 60);
        if (durSecs < 10) durSecs = `0${durSecs}`;
        durationEl.innerText = `${durMins}:${durSecs}`;
    }
}

// Pular para outra parte da música clicando na barra
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners (Ouvintes de eventos)
playBtn.addEventListener('click', () => {
    const isPlaying = !audio.paused;
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Ouve o tempo da música passando para atualizar a barra
audio.addEventListener('timeupdate', updateProgress);

// Clica na barra de progresso
progressContainer.addEventListener('click', setProgress);

// Passa para a próxima música automaticamente quando a atual termina
audio.addEventListener('ended', nextSong);