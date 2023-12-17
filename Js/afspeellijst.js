class PlaylistComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});

      this.currentSongIndex = 0;
      this.songs = JSON.parse(this.getAttribute('songs'));

      const songList = document.createElement('ul');
      this.songListElement = songList;

      this.updatePlaylist();

      this.shadowRoot.appendChild(songList);

      // Initialize the timer with a dummy function (will be updated on play)
      this.timerId = setTimeout(() => {}, 0);
    }

    updatePlaylist() {
      this.songListElement.innerHTML = '';

      this.songs.forEach((song, index) => {
        const { title, artist, duration, playing } = song;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${title}</strong> by ${artist} (${duration}) ${playing ? '(Playing)' : ''}
        `;

        this.songListElement.appendChild(listItem);

        // If this is the current song, highlight it
        if (index === this.currentSongIndex) {
          listItem.style.backgroundColor = '#e0e0e0';
        }
      });
    }

    onSongFinished() {
      // Toggle the 'playing' attribute for the current song
      this.songs[this.currentSongIndex].playing = false;

      // Move to the next song in the playlist
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;

      // Toggle the 'playing' attribute for the next song
      this.songs[this.currentSongIndex].playing = true;

      // Update the playlist display
      this.updatePlaylist();

      // Set a timer for the duration of the next song
      const nextSongDuration = this.parseDuration(this.songs[this.currentSongIndex].duration);
      this.timerId = setTimeout(() => this.onSongFinished(), nextSongDuration * 1000);
    }

    // Helper function to parse duration in the format "mm:ss"
    parseDuration(duration) {
      const [minutes, seconds] = duration.split(':').map(Number);
      return minutes * 60 + seconds;
    }

    connectedCallback() {
      // Set the 'playing' attribute for the first song to true
      this.songs[this.currentSongIndex].playing = true;

      // Simulate starting playback of the first song
      this.onSongFinished();
    }
  }

  customElements.define('playlist-component', PlaylistComponent);