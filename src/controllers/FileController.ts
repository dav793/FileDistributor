import {Router, Request, Response, NextFunction} from 'express';

const fs = require('fs');
const mime = require('mime-types');

module.exports.getIndexPage = (callback) => {
    fs.readFile('./public/index.html', 'utf8', function (err, data) {
        if (err) 
            callback(err, null);
        else
            callback(null, data);
    });
};

module.exports.getFileListPage = (files, dir, callback) => {

    let fileList = `<ul>`;
    files.forEach(file => {

      let iconClass = this.getIconClass(file.mime);
      fileList +=  `<li>
                      <i class="fa ` + iconClass + `"></i> <a href=` + dir + `/` + encodeURI(file.name) + `>` + file.name + `</a>
                    </li>`;

    });
    fileList += `</ul>`;

    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>

          <!-- Basic Page Needs
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <meta charset="utf-8">
          <title>File Distributor</title>
          <meta name="description" content="">
          <meta name="author" content="">

          <!-- Mobile Specific Metas
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <!-- FONT
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">

          <!-- CSS
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link rel="stylesheet" href="/css/normalize.css">
          <link rel="stylesheet" href="/css/skeleton.css">
          <link rel="stylesheet" href="/css/file-icons.css">
          <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css">

          <!-- Favicon
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link rel="icon" type="image/png" href="/images/favicon.png">

        </head>
        <body>

          <!-- Primary Page Layout
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <div class="container">
            <div class="row">
              <div class="one-half column" style="margin-top: 5%">
                <h4>Choose a file in ` + dir + `:</h4>
                ` + fileList + `
              </div>
            </div>
          </div>

        <!-- End Document
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        </body>
        </html>
    `;

    callback(null, html);

};

module.exports.getDirListPage = (dirs, callback) => {

    let linkList = `<ul>`;
    dirs.forEach(link => {
        linkList += `<li><a href=download/` + link + `>` + link + `</a></li>`;
    });
    linkList += `</ul>`;

    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>

          <!-- Basic Page Needs
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <meta charset="utf-8">
          <title>File Distributor</title>
          <meta name="description" content="">
          <meta name="author" content="">

          <!-- Mobile Specific Metas
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <!-- FONT
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">

          <!-- CSS
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link rel="stylesheet" href="/css/normalize.css">
          <link rel="stylesheet" href="/css/skeleton.css">

          <!-- Favicon
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <link rel="icon" type="image/png" href="/images/favicon.png">

        </head>
        <body>

          <!-- Primary Page Layout
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
          <div class="container">
            <div class="row">
              <div class="one-half column" style="margin-top: 5%">
                <h4>Choose a directory to download from:</h4>
                ` + linkList + `
              </div>
            </div>
          </div>

        <!-- End Document
          –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        </body>
        </html>
    `;

    callback(null, html);

};

module.exports.getFileMIME = (url) => {
    var type = mime.lookup(url) || 'application/octet-stream';
    return type;
};

module.exports.getIconClass = (mime) => {
  switch(mime) {

    case 'application/pdf':
        return 'fa-file-pdf-o';

    case 'application/vnd.oasis.opendocument.spreadsheet':
        return 'fa-file-excel-o';

    case 'application/msword':
    case 'application/vnd.oasis.opendocument.text':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'fa-file-word-o';

    case 'text/plain':
    case 'application/rtf':
        return 'fa-file-text-o';

    case 'vnd.ms-powerpoint':
    case 'application/vnd.oasis.opendocument.presentation':
        return 'fa-file-powerpoint-o';

    case 'video/mpeg':
    case 'video/ogg':
        return 'fa-file-video-o';

    case 'audio/midi':
        return 'fa-file-audio-o';

    case 'image/gif':
    case 'image/x-icon':
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/bmp':
        return 'fa-file-image-o';

    case 'application/octet-stream':
    case 'application/javascript':
    case 'application/json':
    case 'application/typescript':
        return 'fa-file-code-o';

    case 'application/zip':
    case 'application/vnd.rar':
        return 'fa-file-archive-o';

    default: 
        return 'fa-file-archive-o';

  }
};