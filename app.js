import "./navbar.js"
import "./hartslag.js"

const template = document.createElement("template")
template.innerHTML = /*html*/`

    <nav-comp></nav-comp>
    <muziek-comp></muziek-comp>
`

class app extends HTMLElement
{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))
        
        }
}

customElements.define('app-comp', app)