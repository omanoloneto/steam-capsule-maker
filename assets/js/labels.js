// just add a new item in that array to add a new label
const labelsInfo = [
    { id: 'labelToggle-ps1-classic', class: 'ps1-classic', text: 'SteamStation' },
    { id: 'labelToggle-ps1-modern', class: 'ps1-modern', text: 'SteamStation' },
    { id: 'labelToggle-ps2', class: 'ps2', text: 'SteamStation 2' },
    { id: 'labelToggle-ps3-classic', class: 'ps3-classic', text: 'SteamStation 3' },
    { id: 'labelToggle-ps3-modern', class: 'ps3-modern', text: 'SS3' },
    { id: 'labelToggle-gba-classic', class: 'gba-classic', text: 'steam ADVANCE' },
    { id: 'labelToggle-gba-modern', class: 'gba-modern', text: 'steam ADVANCE' },
    { id: 'labelToggle-pc-classic', class: 'pc-classic', text: 'PC steam' },
    { id: 'labelToggle-pc-modern', class: 'pc-modern', text: 'Games for Steam' },
];

function setupToggles(labelsInfo) {
    const topBar = document.getElementById('topBar');
    const inputContainer = document.querySelector('.input-container');

    labelsInfo.forEach(label => {
        document.getElementById(label.id).addEventListener('change', function () {
            const wasChecked = this.checked;

            labelsInfo.forEach(label => {
                document.getElementById(label.id).checked = false;
                topBar.classList.remove(label.class);
            });

            if (!wasChecked) {
                topBar.style.visibility = "hidden";
                inputContainer.style.display = 'none';
                topBar.textContent = "";
                customTextLabel.value = "";
            } else {
                this.checked = true;
                topBar.classList.add(label.class);
                topBar.style.visibility = "visible";
                inputContainer.style.display = 'flex';
                topBar.textContent = label.text;
                customTextLabel.value = label.text;
            }
        });
    });
}

setupToggles(labelsInfo);

document.getElementById('customTextLabel').addEventListener('input', function () {
    let lines = this.value.split('\n');
    
    document.querySelector('.top-bar .linef').textContent = lines[0] || '';
    document.querySelector('.top-bar .lines').textContent = lines[1] || '';
});