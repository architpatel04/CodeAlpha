document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeControl = document.getElementById('volume');
    const searchInput = document.getElementById('search');
    const playlistElement = document.getElementById('playlist');
    
    let audio = new Audio();
    let currentTrackIndex = 0;
    let isPlaying = false;
    let playlist = [
        { title: "Maan Meri Jaan", artist: "King", url: "song/Maan Meri Jaan.mp3" },
        { title: "Tu Aake Dekhle", artist: "King", url: "song/Tu Aake Dekhle.mp3" },
        { title: "Ranjha", artist: "B Praak", url: "song/Ranjha.mp3" },
        { title: "Nayan Ne Bandh Rakhine", artist: "Darshan Raval", url: "song/Nayan Ne Bandh Rakhine.mp3" },
        // more songs... 
    ];

    const loadTrack = (index) => {
        const track = playlist[index];
        audio.src = track.url;
        document.getElementById('song-title').innerText = track.title;
        document.getElementById('artist-name').innerText = track.artist;
        if (isPlaying) {
            audio.play();
        }
    };

    const playPause = () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerText = 'Play';
        } else {
            audio.play();
            playPauseBtn.innerText = 'Pause';
        }
        isPlaying = !isPlaying;
    };

    const prevTrack = () => {
        currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : playlist.length - 1;
        loadTrack(currentTrackIndex);
    };

    const nextTrack = () => {
        currentTrackIndex = (currentTrackIndex < playlist.length - 1) ? currentTrackIndex + 1 : 0;
        loadTrack(currentTrackIndex);
    };

    const setVolume = (event) => {
        audio.volume = event.target.value;
    };

    const searchMusic = (event) => {
        const query = event.target.value.toLowerCase();
        const filteredPlaylist = playlist.filter(track => 
            track.title.toLowerCase().includes(query) || 
            track.artist.toLowerCase().includes(query)
        );
        displayPlaylist(filteredPlaylist);
    };

    const displayPlaylist = (tracks) => {
        playlistElement.innerHTML = '';
        tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.innerText = `${track.title} - ${track.artist}`;
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(index);
                playPause();
            });
            playlistElement.appendChild(li);
        });
    };

    playPauseBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    volumeControl.addEventListener('input', setVolume);
    searchInput.addEventListener('input', searchMusic);

    // Initial load
    loadTrack(currentTrackIndex);
    displayPlaylist(playlist);
});
