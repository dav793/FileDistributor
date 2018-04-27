
# FileDistributor

HTTP server to put local files up for download.

Made originally to share files to other devices in my local network.

## What it does

Allows other devices in the same network as the server running this program, to view the contents of certain directories and to download files from said directories, to which the server has allowed access beforehand.

## How to run

1. 	Clone this repo
	```bash
	git clone https://github.com/dav793/FileDistributor.git
	```

2. 	Install dependencies
	```bash
	npm install
	```

3. 	Rename `config/environment.template.js` to `config/environment.js`

4. 	Configure server IP address and port to serve the application in `config/environment.js`
	```javascript
	module.exports = {
	    IPADDR: '192.168.0.134',
	    PORT: 80
	};
	```

3. 	Rename `config/dirPaths.template.js` to `config/dirPaths.js`

4. 	Configure directories to allow access in `config/dirPaths.js`
	```javascript
	module.exports = {
	    podcasts: 'C:/Users/David/Documents/podcasts',
	    books: 'C:/Users/David/Documents/books'
	};
	```

	Note that all files under the allowed directories will be available for download. Also multi-level directories are not yet supported, sorry!

5.	Start the server application
	```bash
	npm start
	```

6.	Enter your server URL from any browser (here http://192.168.0.134:80)