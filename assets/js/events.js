const ZOOM_STEP = 0.1;
const MIN_ZOOM_LEVEL = 1;
const INITIAL_STATE = {
    zoomLevel: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
};

let state = { ...INITIAL_STATE };
let imgData;
let img = new Image();

const selectors = {
    imageUpload: '#imageUpload',
    zoomInButton: '#zoomInButton',
    zoomOutButton: '#zoomOutButton',
    previewWindow: '.preview-window',
    previewContainer: '.preview-container',
    downloadButton: '#downloadButton',
};

function loadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgData = e.target.result;
            img.src = imgData;
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 300;
                canvas.height = 450;
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, 450);
                document.querySelector(selectors.previewContainer).innerHTML = '';
                document.querySelector(selectors.previewContainer).appendChild(canvas);
            }
        }
        reader.readAsDataURL(file);
    }
}

function zoomIn() {
    state.zoomLevel += ZOOM_STEP;
    applyZoom(state.zoomLevel);
}

function zoomOut() {
    state.zoomLevel = Math.max(MIN_ZOOM_LEVEL, state.zoomLevel - ZOOM_STEP);
    applyZoom(state.zoomLevel);
}

function startDragging(event) {
    state.isDragging = true;
    state.previousMousePosition = { x: event.clientX, y: event.clientY };
}

function dragImage(event) {
    if (state.isDragging) {
        requestAnimationFrame(() => {
            const deltaX = (event.clientX - state.previousMousePosition.x) * state.zoomLevel;
            const deltaY = (event.clientY - state.previousMousePosition.y) * state.zoomLevel;

            state.offsetX -= deltaX;
            state.offsetY -= deltaY;

            applyZoom(state.zoomLevel);

            state.previousMousePosition = { x: event.clientX, y: event.clientY };
        });
    }
}

function stopDragging() {
    state.isDragging = false;
}

function applyZoom(level) {
    const canvas = document.querySelector(`${selectors.previewWindow} canvas`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 300;
        canvas.height = 450;
        ctx.drawImage(img, state.offsetX, state.offsetY, img.width / level, img.height / level, 0, 0, 300, 450);
    }
}

function downloadImage() {
    const previewContainer = document.querySelector(selectors.previewWindow);

    html2canvas(previewContainer, {
        scale: 2,
        logging: true,
        useCORS: true,
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.92);

        const timestamp = new Date();
        const formattedTime = `${timestamp.getFullYear()}${String(timestamp.getMonth() + 1).padStart(2, '0')}${String(timestamp.getDate()).padStart(2, '0')}${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}${String(timestamp.getSeconds()).padStart(2, '0')}`;

        link.download = `custom_cover_${formattedTime}.jpg`;
        link.click();
    });
}

document.querySelector(selectors.imageUpload).addEventListener('change', loadImage);
document.querySelector(selectors.zoomInButton).addEventListener('click', zoomIn);
document.querySelector(selectors.zoomOutButton).addEventListener('click', zoomOut);
document.querySelector(selectors.previewWindow).addEventListener('mousedown', startDragging);
document.querySelector(selectors.previewWindow).addEventListener('mousemove', dragImage);
document.querySelector(selectors.previewWindow).addEventListener('mouseup', stopDragging);
document.querySelector(selectors.previewWindow).addEventListener('mouseleave', stopDragging);
document.querySelector(selectors.downloadButton).addEventListener('click', downloadImage);
