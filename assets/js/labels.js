// just add a new item in that array to add a new label
const labelsInfo = [
    { class: 'pc-classic', text: 'PC /// STEAM' },
    { class: 'pc-modern', text: 'Games /// for Steam' },
    { class: 'gba-classic', text: 'steam /// ADVANCE' },
    { class: 'gba-modern', text: 'steam /// ADVANCE' },
    { class: 'ps1-classic', text: 'SteamStation' },
    { class: 'ps1-modern', text: 'SteamStation' },
    { class: 'ps2', text: 'SteamStation 2' },
    { class: 'ps3-classic', text: 'SteamStation 3' },
    { class: 'ps3-modern', text: 'SS3' },
];

function setupToggles(labelsInfo) {
    const topBar = document.getElementById('topBar');
    const inputContainer = document.querySelector('.input-container');
    const linef = document.querySelector('.top-bar #linef');
    const lines = document.querySelector('.top-bar #lines');

    labelsInfo.forEach(label => {
        document.getElementById('labelToggle-' + label.class).addEventListener('change', function () {
            const wasChecked = this.checked;

            labelsInfo.forEach(label => {
                document.getElementById('labelToggle-' + label.class).checked = false;
                topBar.classList.remove(label.class);
                linef.classList.remove(label.class + '-linef');
                lines.classList.remove(label.class + '-lines');
            });

            if (!wasChecked) {
                topBar.style.visibility = "hidden";
                inputContainer.style.display = 'none';
                topBar.style.visibility = "hidden";
                linef.textContent = '';
                lines.textContent = '';
                customTextLabel.value = '';
            } else {
                this.checked = true;
                topBar.classList.add(label.class);
                linef.classList.add(label.class + '-linef');
                lines.classList.add(label.class + '-lines');
                topBar.style.visibility = "visible";
                inputContainer.style.display = 'flex';
                customTextLabel.value = label.text;

                let labelLines = label.text.split('///');
                linef.textContent = labelLines[0] || '';
                lines.textContent = labelLines[1] || '';
            }
        });
    });
}

setupToggles(labelsInfo);

document.getElementById('customTextLabel').addEventListener('input', function () {
    let lines = this.value.split('///');

    let linef = document.querySelector('.top-bar #linef');
    let linesElem = document.querySelector('.top-bar #lines');

    linef.textContent = lines[0] || '';
    linesElem.textContent = lines[1] || '';

    if (lines[0] && !lines[1] || !lines[0] && lines[1]) {
        linef.classList.add('single-line');
        linesElem.classList.add('single-line');
    } else {
        linef.classList.remove('single-line');
        linesElem.classList.remove('single-line');
    }
});
