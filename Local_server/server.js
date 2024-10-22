const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const port = 8000;
const uploadDir = path.join(__dirname, '/uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    console.log('Receiving upload...');

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing the file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error while uploading');
        return;
      }

      // Log the entire `files` object to understand its structure
      console.log('Parsed Files object:', JSON.stringify(files, null, 2));

      // Access the first file in the array (since `files.file` is an array)
      const uploadedFile = files.file[0];
      if (!uploadedFile) {
        console.error('No file found in the upload.');
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No file uploaded');
        return;
      }

      // Extract the file path (formidable uses `filepath`)
      const oldPath = uploadedFile.filepath;
      const newPath = path.join(uploadDir, uploadedFile.originalFilename || 'uploaded_file');

      if (!oldPath) {
        console.error('No valid oldPath found for the file.');
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error with file path');
        return;
      }

      // Move the file to the final destination
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Error moving the file:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error while saving file');
          return;
        }

        console.log('File uploaded successfully:', newPath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      });
    });
  } else {
    // Serve a basic HTML form for file upload (for browser testing)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Upload</title>
          <style>
              /* Basic styling */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f5;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
    
              .upload-container {
                  background-color: white;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                  max-width: 400px;
                  text-align: center;
              }
    
              .upload-container h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
    
              .upload-container input[type="file"] {
                  margin: 20px 0;
              }
    
              .upload-container input[type="submit"] {
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
              }
    
              .upload-container input[type="submit"]:hover {
                  background-color: #45a049;
              }
          </style>
      </head>
      <body>
          <div class="upload-container">
              <h1>Upload Your File</h1>
              <form action="/upload" method="post" enctype="multipart/form-data">
                  <input type="file" name="file" required><br><br>
                  <input type="submit" value="Upload">
              </form>
          </div>
      </body>
      </html>
    `);
    
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
