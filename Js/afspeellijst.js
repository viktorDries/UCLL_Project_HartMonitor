class PlaylistComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Create a template element for the component's styles
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          :host {
            display: block;
            max-width: 400px;
            margin: 20px;
            font-family: 'Arial', sans-serif;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            transition: background-color 0.3s;
            cursor: pointer;
          }

          li:hover {
            background-color: #f0f0f0;
          }

          .playing {
            background-color: #e0e0e0;
          }
        </style>
      `;

      this.shadowRoot.appendChild(template.content.cloneNode(true));

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
        const { title, artist, duration, bpm, playing } = song;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${title}</strong> by ${artist} (${duration}) - ${bpm} BPM ${playing ? '(Playing)' : ''}
        `;

        listItem.classList.toggle('playing', index === this.currentSongIndex);

        // Add a click event listener to jump to the clicked song
        listItem.addEventListener('click', () => this.jumpToSong(index));

        this.songListElement.appendChild(listItem);
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

    jumpToSong(index) {
      // Stop the current timer
      clearTimeout(this.timerId);

      // Toggle the 'playing' attribute for the current song
      this.songs[this.currentSongIndex].playing = false;

      // Set the 'playing' attribute for the clicked song to true
      this.songs[index].playing = true;

      // Update the current song index
      this.currentSongIndex = index;

      // Update the playlist display
      this.updatePlaylist();

      // Set a timer for the duration of the clicked song
      const clickedSongDuration = this.parseDuration(this.songs[index].duration);
      this.timerId = setTimeout(() => this.onSongFinished(), clickedSongDuration * 1000);
    }

    parseDuration(duration) {
      const [minutes, seconds] = duration.split(':').map(Number);
      return minutes * 60 + seconds;
    }

    connectedCallback() {
      // Set the 'playing' attribute for the first song (index 0) to true
      this.songs[0].playing = true;

      // Simulate starting playback of the first song
      //this.onSongFinished();
    }
  }

  customElements.define('playlist-component', PlaylistComponent);