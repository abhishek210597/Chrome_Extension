// Function to get the local IP address using WebRTC
function getLocalIP(callback) {
  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel(""); // Create a bogus data channel

  pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      const ipMatch = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.exec(ice.candidate.candidate);
      if (ipMatch) {
          callback(ipMatch[1]);
          pc.onicecandidate = null; // Stop listening after we get the local IP
      }
  };

  pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((err) => console.error("Error creating offer: ", err));
}

// Function to start a basic file upload server using the browser's fetch API
function startFileUploadServer(port) {
  // Simulated server behavior for handling file upload
  const uploadEndpoint = `http://localhost:${port}/upload`;

  console.log(`File upload server started at ${uploadEndpoint}`);

  // Mocking file upload handler, replace with actual logic or a server-side solution
  window.addEventListener('message', async (event) => {
      if (event.data.type === 'UPLOAD_FILE') {
          const file = event.data.file;
          const formData = new FormData();
          formData.append('file', file);

          // Simulate file upload request
          try {
              const response = await fetch(uploadEndpoint, {
                  method: 'POST',
                  body: formData,
              });
              if (response.ok) {
                  console.log('File uploaded successfully!');
              } else {
                  console.error('Failed to upload file.');
              }
          } catch (error) {
              console.error('Error during file upload:', error);
          }
      }
  });
}

// DOM content loaded event to initialize the popup
document.addEventListener('DOMContentLoaded', function () {
  getLocalIP((localIp) => {
      if (!localIp) {
          alert("Could not find local IP address");
          return;
      }

      const port = 8000; // You can choose any available port
      const uploadUrl = `http://${localIp}:${port}/upload`;

      // Start the file upload server
      startFileUploadServer(port);

      // Generate the QR code with the upload URL
      const qrCodeContainer = document.getElementById('qr-code');
      new QRCode(qrCodeContainer, {
          text: uploadUrl,
          width: 256,
          height: 256
      });
  });
});
