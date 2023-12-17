const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
</style>
<table>
    <tr>
        <th>Nummer</th>
        <th>Artiest</th>
        <th>Duur</th>
        <th>BPM</th>
    </tr>
    <tr class="currentNumber">
        <td>Nummer 1</td>
        <td>Artiest 1</td>
        <td>Duur 1</td>
        <td>BPM 1</td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 2</td>
        <td>Artiest 2</td>
        <td>Duur 2</td>
        <td>BPM 2</td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 3</td>
        <td>Artiest 3</td>
        <td>Duur 3</td>
        <td>BPM 3</td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 4</td>
        <td>Artiest 4</td>
        <td>Duur 4</td>
        <td>BPM 4</td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 5</td>
        <td>Artiest 5</td>
        <td>Duur 5</td>
        <td>BPM 5</td>
    </tr>
</table>
`;

class CustomAfspeellijst extends HTMLElement {
    constructor() {
        super();

<<<<<<< HEAD
        this.attachShadow({"mode": "open"});
=======
        this.attachShadow({ "mode": "open" });
>>>>>>> f84c5387ee76d48fe0fcc100cef234e74b0fdc91
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

<<<<<<< HEAD
customElements.define('custom-afspeellijst', customAfspeellijst);
=======
customElements.define('afspeellijst', CustomAfspeellijst);
>>>>>>> f84c5387ee76d48fe0fcc100cef234e74b0fdc91
