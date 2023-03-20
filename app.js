navigator.mediaDevices.getUserMedia({
  video: true
})
.then(function(stream) {

  vid.onloadedmetadata = function() {
    this.width = overlay.width = this.videoWidth;
    this.height = overlay.height = this.videoHeight;
  }
  vid.srcObject = stream;
  vid.play();
  overlay.onclick = function() {
    var c = document.createElement('canvas');
    c.width = vid.videoWidth;
    c.height = vid.videoHeight;
    c.getContext('2d').drawImage(vid, 0, 0);
    c.toBlob(doWhatYouWantWithTheCapturedImage);
  };
})
.catch(function(err) {
  console.error(err);
  document.body.innerHTML = '<a href="https://jsfiddle.net/3m4gj7dq/">Please try from jsfiddle</a>';
});

function doWhatYouWantWithTheCapturedImage(blob) {
  var url = URL.createObjectURL(blob);
  var img = new Image();
  img.onload = function() {
    URL.revokeObjectURL(url);
  };
  img.src = url;
  URL.revokeObjectURL(vid.src);
  overlay.parentNode.appendChild(img);
  vid.parentNode.removeChild(vid);
  overlay.parentNode.removeChild(overlay);
}

// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

