# File Upload Chrome Extension with QR Code

This is a simple Chrome extension and Node.js server that allows users to upload files from their mobile devices by scanning a QR code. Both the device and the computer must be on the same Wi-Fi network for the connection to work.

## Features
- Chrome extension generates a QR code for file uploading.
- Upload files from your phone by scanning the QR code.
- Files are stored locally in the `uploads` directory.
- Works with local network connections.

## How It Works
1. The user scans the QR code from the Chrome extension using their mobile device.
2. The mobile device is directed to a web page where the user can upload a file.
3. The file is uploaded to the local Node.js server running on the same Wi-Fi network.
4. The file is saved in the `uploads` folder on the server.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your computer.
- Chrome browser.
- Local Wi-Fi network (both devices must be connected to the same network).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/repositoryname.git
cd repositoryname
```



### 2. Install Dependencies

Install the required Node.js packages using npm:

```bash
Copy code
npm install
```

### 3. Start the Server
To start the local file upload server, run:

``` bash
Copy code
node server.js
```
The server will start on http://localhost:8000.

 ### 4. Install the Chrome Extension
Open Chrome and navigate to chrome://extensions/.
Enable Developer mode.
Click Load unpacked and select the chrome-extension folder from this repository.
The extension will appear in the toolbar.
5. Upload a File
Click the extension icon to generate the QR code.
Scan the QR code with your phone (make sure both the computer and phone are on the same Wi-Fi network).
Select a file on the mobile device to upload.
The file will be saved in the uploads folder on your local server.
File Storage
By default, files are uploaded to the uploads folder inside the project directory. If you need to upload files to cloud storage (e.g., AWS S3, Google Cloud Storage), you will need to modify the server.js file accordingly. Future versions may include cloud storage support.

Folder Structure
plaintext
Copy code
repositoryname/
│
├── chrome-extension/      # Chrome extension files
│   ├── icon16.png
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│
├── node_modules/          # Installed node packages
│
├── uploads/               # Directory where uploaded files are saved
│
├── package.json           # Dependencies and project metadata
├── server.js              # Node.js server to handle file uploads
└── README.md              # Project documentation
Known Issues
File upload is limited to local storage: Currently, files are uploaded to the local filesystem of the server. In future updates, we may add support for cloud storage services (e.g., AWS, Google Cloud).
Error when devices are not on the same network: Ensure that both your computer and mobile device are connected to the same Wi-Fi network.
Future Enhancements
Add cloud storage integration (AWS S3, Google Cloud Storage).
Improve error handling and upload feedback.
Provide a better user interface for mobile uploads.
License
This project is licensed under the MIT License.

vbnet
Copy code

### Customization
- Replace `https://github.com/yourusername/repositoryname.git` with your actual repository URL.
- Add any other relevant details, such as contributing guidelines, if needed.

This README will help users understand how to set up and use your file-upload service on localhos
