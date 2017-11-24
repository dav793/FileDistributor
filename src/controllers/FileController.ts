import {Router, Request, Response, NextFunction} from 'express';

const fs = require('fs');

module.exports.getIndexPage = (callback) => {
    fs.readFile('./public/index.html', 'utf8', function (err, data) {
        if (err) 
            callback(err, null);
        else
            callback(null, data);
    });
};

module.exports.getFileListPage = (links, dir, callback) => {

    let linkList = `<ul>`;
    links.forEach(link => {
        linkList += `<li><a href=` + dir + `/` + encodeURI(link) + `>` + link + `</a></li>`;
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
                <h4>Choose a file in ` + dir + `:</h4>
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