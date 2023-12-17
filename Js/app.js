import "./navbar.js"
import "./muziek.js"
import "./hartslag.js"
import "./afspeellijst.js"
import "./bpm.js"

const template = document.createElement("template")
template.innerHTML = /*html*/`

    <nav-comp></nav-comp>
    <my-counter></my-counter>
    <chart-element></chart-element>
    <playlist-component songs='[
        {"title": "Song 1", "artist": "Artist 1", "duration": "3:45", "playing": false},
        {"title": "Song 2", "artist": "Artist 2", "duration": "4:20", "playing": false},
        {"title": "Song 3", "artist": "Artist 3", "duration": "2:55", "playing": false},
        {"title": "Song 4", "artist": "Artist 4", "duration": "5:10", "playing": false},
        {"title": "Song 5", "artist": "Artist 5", "duration": "3:30", "playing": false}
      ]'></playlist-component>
`

class app extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" }); // zorgt ervoor dat het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true));

    }
}

customElements.define('app-comp', app)