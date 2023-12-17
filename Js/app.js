import "./navbar.js"
import "./muziek.js"
import "./hartslag.js"

const template = document.createElement("template")
template.innerHTML = /*html*/`

    <nav-comp></nav-comp>
    <my-counter></my-counter>
    <chart-element></chart-element>
    <customAfspeellijst></customAfspeellijst>
`

class app extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" }) // zorgt ervoor dat het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))

    }
}

customElements.define('app-comp', app)