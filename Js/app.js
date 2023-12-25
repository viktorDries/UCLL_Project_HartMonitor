import "./navbar.js"
import "./muziek.js"
import "./hartslag.js"
import "./afspeellijst.js"
import "./bpm.js"
import "./bpm-display.js"

const template = document.createElement("template")
template.innerHTML = /*html*/`

    <nav-comp></nav-comp>
    <my-counter></my-counter>
    <chart-element></chart-element>
    <playlist-component songs='[
        {"title": "Song 1", "artist": "Artist 1", "duration": "0:01", "bpm": 120, "playing": false},
        {"title": "Song 2", "artist": "Artist 2", "duration": "0:01", "bpm": 140, "playing": false},
        {"title": "Song 3", "artist": "Artist 3", "duration": "0:01", "bpm": 100, "playing": false},
        {"title": "Song 4", "artist": "Artist 4", "duration": "0:01", "bpm": 90, "playing": false},
        {"title": "Song 5", "artist": "Artist 5", "duration": "0:01", "bpm": 110, "playing": false}
      ]'></playlist-component>
      <bpm-display></bpm-display bpmValue="80">
`

class app extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" }); // zorgt ervoor dat het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true));

    }
}

customElements.define('app-comp', app)