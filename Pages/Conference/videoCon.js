// WebRTC variables
let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

// DOM elements
const cameraButton = document.getElementById('cameraButton');
const startButton = document.getElementById('startButton');
const stopCameraButton = document.getElementById('stopCameraButton');
const joinButton = document.getElementById('joinButton');
const endButton = document.getElementById('endButton');
const consultationInput = document.getElementById('consultationInput');
const patientVideo = document.getElementById('patientVideo');
const doctorVideo = document.getElementById('doctorVideo');

// Event listeners
cameraButton.onclick = startCamera;
stopCameraButton.onclick = stopCamera;

startButton.onclick = startConsultation;
joinButton.onclick = joinConsultation;
endButton.onclick = endConsultation;

async function startCamera() {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      patientVideo.srcObject = localStream;
      cameraButton.disabled = true;
      stopCameraButton.disabled = false;
      updateStartJoinButtonsState();
      updateStatus('Camera started. Ready to begin or join a consultation.');
    } catch (error) {
      console.error('Error accessing media devices.', error);
      updateStatus('Failed to start camera. Please check your permissions.');
    }
  }
  
  function stopCamera() {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      patientVideo.srcObject = null;
      localStream = null;
      cameraButton.disabled = false;
      stopCameraButton.disabled = true;
      updateStartJoinButtonsState();
      updateStatus('Camera stopped. You can still start or join a consultation,
         but you\'ll need to start your camera when prompted.');
    }
  }
  
  function updateStartJoinButtonsState() {
    const canStartOrJoin = localStream !== null || cameraButton.disabled === false;
    startButton.disabled = !canStartOrJoin;
    joinButton.disabled = !canStartOrJoin;
  }
  
  async function startConsultation() {
    if (!localStream) {
      await startCamera();
    }
    // Rest of the startConsultation logic
    // ...
  }
  
  async function joinConsultation() {
    if (!localStream) {
      await startCamera();
    }
    // Rest of the joinConsultation logic
    // ...
  }
  
  function endConsultation() {
    // Implementation for ending the consultation
    // This will involve closing connections and resetting the UI
    stopCamera(); // Make sure to stop the camera when ending the consultation
    updateStartJoinButtonsState();
  }
  