<?php

header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

?>
<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="Steam, Cover Maker, Custom covers, Games">
    <meta name="description"
        content="Create custom covers for your Steam games with Steam Cover Maker. Choose varied styles and easily download your creation.">

    <link rel="stylesheet" href="assets/css/fonts.css?v=<?=date('YmdHis')?>">
    <link rel="stylesheet" href="assets/css/components.css?v=<?=date('YmdHis')?>">
    <link rel="stylesheet" href="assets/css/labels.css?v=<?=date('YmdHis')?>">
    <link rel="stylesheet" href="assets/css/responsive.css?v=<?=date('YmdHis')?>">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

    <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon" />

    <title>Steam Cover Maker</title>
</head>

<body>
    <div class="sidebar">
        <h1>Steam Cover Maker</h1>

        <h2>Select your label style</h2>

        <div id="consoleOptions">
            <!-- The consoles will showed here -->
        </div>

        <div class="created-by">
            Created by <a href="https://twitter.com/realAfonso" target="_blank"
                rel="noopener noreferrer">@realAfonso</a>
        </div>
    </div>
    <div class="container">
    
        <div class="header">
            <button class="btn-toggle toggle-left">
                <i class="fas fa-bars"></i>
            </button>

            <input type="file" id="imageUpload" accept="image/*" />
            
            <button class="btn-toggle toggle-right">
                <i class="fas fa-tags"></i>
            </button>
        </div>

        <div class="preview-border">
            <div class="preview-window" id="preview-window">
                <div class="top-bar" id="topBar">
                    <span id="linef"></span>
                    <span id="lines"></span>
                </div>
                <div class="preview-container">
                    <!--The image will showed here-->
                </div>
            </div>
        </div>
        <div class="button-container">
            <button id="zoomInButton">Zoom In</button>
            <button id="zoomOutButton">Zoom Out</button>
            <button id="downloadButton">Download</button>
        </div>
    </div>
    <div class="sidebar-right" id="sidebarRight">
        <div class="style-options" id="styleOptions">
            <h1>Style Options</h1>

            <div class="input-container menu-item">
                <input type="text" id="customTextLabel" value="Your label here!" disabled />
            </div>

            <!-- The options will showed here -->

        </div>
    </div>

    <script src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js"></script>
    <script src="assets/js/consoles.js?v=<?=date('YmdHis')?>"></script>
    <script src="assets/js/events.js?v=<?=date('YmdHis')?>"></script>
    <script src="assets/js/labels.js?v=<?=date('YmdHis')?>"></script>

</body>

</html>