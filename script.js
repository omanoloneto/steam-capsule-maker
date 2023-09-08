let imgData;
let zoomLevel = 1; 
let offsetX = 0;   
let offsetY = 0;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let img = new Image();

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgData = e.target.result;
            img.src = imgData;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 300;
                canvas.height = 450;
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, 450);
                document.querySelector('.preview-window').innerHTML = '';
                document.querySelector('.preview-window').appendChild(canvas);
            }
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('zoomInButton').addEventListener('click', function() {
    zoomLevel += 0.1;
    applyZoom(zoomLevel);
});

document.getElementById('zoomOutButton').addEventListener('click', function() {
    zoomLevel = Math.max(1, zoomLevel - 0.1);
    applyZoom(zoomLevel);
});

document.querySelector('.preview-window').addEventListener('mousedown', function(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.querySelector('.preview-window').addEventListener('mousemove', function(event) {
    if (isDragging) {
        requestAnimationFrame(() => {
            const deltaX = (event.clientX - previousMousePosition.x) * zoomLevel;
            const deltaY = (event.clientY - previousMousePosition.y) * zoomLevel;

            offsetX -= deltaX;
            offsetY -= deltaY;

            applyZoom(zoomLevel);

            previousMousePosition = { x: event.clientX, y: event.clientY };
        });
    }
});

document.querySelector('.preview-window').addEventListener('mouseup', function() {
    isDragging = false;
});

document.querySelector('.preview-window').addEventListener('mouseleave', function() {
    isDragging = false;
});

function applyZoom(level) {
    const canvas = document.querySelector('.preview-window canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        canvas.width = 300;
        canvas.height = 450;
        ctx.drawImage(img, offsetX, offsetY, img.width / level, img.height / level, 0, 0, 300, 450);
    }
}

document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.querySelector('.preview-window canvas');
    if (canvas) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = 600;
        tempCanvas.height = 900;

        tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 600, 900);

        const dataURL = tempCanvas.toDataURL('image/jpeg', 0.92);

        const link = document.createElement('a');
        link.href = dataURL;

        const timestamp = new Date();
        const formattedTime = `${timestamp.getFullYear()}${String(timestamp.getMonth() + 1).padStart(2, '0')}${String(timestamp.getDate()).padStart(2, '0')}${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}${String(timestamp.getSeconds()).padStart(2, '0')}`;

        link.download = `custom_cover_${formattedTime}.jpg`;
        link.click();
    }
});


