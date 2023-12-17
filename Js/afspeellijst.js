const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
    table, th, td{
        border: 1px solid black;
    }
    #currentlyPlaying{
        background-color: green;
    }
    .currentlyNotPlaying{
        background-color: red;
    }
    .nextNumber{
        opacity: 60%
    }
</style>
<table>
    <tr>
        <th>Nummer</th>
        <th>Artiest</th>
        <th>Duur</th>
        <th>BPM</th>
        <th>Aan het afspelen</th>
    </tr>
    <tr class="currentNumber">
        <td>Nummer 1</td>
        <td>Artiest 1</td>
        <td>Duur 1</td>
        <td>BPM 1</td>
        <td id="currentlyPlaying"></td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 2</td>
        <td>Artiest 2</td>
        <td>Duur 2</td>
        <td>BPM 2</td>
        <td class="currentlyNotPlaying"></td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 3</td>
        <td>Artiest 3</td>
        <td>Duur 3</td>
        <td>BPM 3</td>
        <td class="currentlyNotPlaying"></td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 4</td>
        <td>Artiest 4</td>
        <td>Duur 4</td>
        <td>BPM 4</td>
        <td class="currentlyNotPlaying"></td>
    </tr>
    <tr class="nextNumber">
        <td>Nummer 5</td>
        <td>Artiest 5</td>
        <td>Duur 5</td>
        <td>BPM 5</td>
        <td class="currentlyNotPlaying"></td>
    </tr>
</table>
`;

class CustomAfspeellijst extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('custom-afspeellijst', CustomAfspeellijst);
