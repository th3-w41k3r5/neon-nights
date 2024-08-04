document.querySelectorAll('.song').forEach((songElement) => {
    const audio = songElement.querySelector('audio');
    const playPauseBtn = songElement.querySelector('.play-pause');
    const seekBar = songElement.querySelector('.seek-bar');
    const timer = songElement.querySelector('.timer');

    const updateTimer = () => {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);

        timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    };

    const loadAudio = async () => {
        const response = await fetch(audio.dataset.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        audio.src = url;
    };

    playPauseBtn.addEventListener('click', async () => {
        document.querySelectorAll('.song').forEach((otherSongElement) => {
            const otherAudio = otherSongElement.querySelector('audio');
            const otherPlayPauseBtn = otherSongElement.querySelector('.play-pause img');
            if (otherAudio !== audio) {
                otherAudio.pause();
                otherPlayPauseBtn.src = 'assets/play.svg';
            }
        });

        if (!audio.src) {
            await loadAudio();
        }

        if (audio.paused) {
            audio.play();
            playPauseBtn.querySelector('img').src = 'assets/pause.svg';
        } else {
            audio.pause();
            playPauseBtn.querySelector('img').src = 'assets/play.svg';
        }
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        updateTimer();
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
        updateTimer();
    });

    audio.addEventListener('loadedmetadata', updateTimer);

    audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        alert('Audio loading error: ' + e.message);
    });

    audio.addEventListener('loadeddata', updateTimer);
});













