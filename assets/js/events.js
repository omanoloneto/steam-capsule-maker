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
                const aspectRatio = img.width / img.height;

                canvas.width = 300;
                canvas.height = 300 / aspectRatio;

                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, 300 / aspectRatio);
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

            const canvas = document.querySelector(`${selectors.previewWindow} canvas`);
            if (canvas) {
                canvas.style.position = 'relative';
                canvas.style.top = `${state.offsetY}px`;
                canvas.style.left = `${state.offsetX}px`;

                state.offsetX += deltaX;
                state.offsetY += deltaY;
            }

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
        const aspectRatio = img.width / img.height;

        const newWidth = 300 * level;
        const newHeight = (300 / aspectRatio) * level;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.clearRect(0, 0, newWidth, newHeight);

        ctx.drawImage(img, state.offsetX, state.offsetY, img.width, img.height, 0, 0, newWidth, newHeight);
    }
}

function downloadImage() { 
    const previewContainer = document.querySelector(selectors.previewWindow);
    const currentWidth = previewContainer.offsetWidth;
    const currentHeight = previewContainer.offsetHeight;

    htmlToImage.toJpeg(previewContainer, { 
        quality: 0.92, 
        canvasWidth: currentWidth * 2, 
        canvasHeight: currentHeight * 2 
    }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;

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
