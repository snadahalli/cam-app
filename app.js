
let videoSourcesSelect = document.getElementById("video-source");
let audioSourcesSelect = document.getElementById("audio-source");
let videoPlayer = document.getElementById("vid");

videoSourcesSelect.onchange = function(){
    MediaStreamHelper.requestStream().then(function(stream){
        MediaStreamHelper._stream = stream;
        videoPlayer.srcObject = stream;
    });
};

audioSourcesSelect.onchange = function(){
    MediaStreamHelper.requestStream().then(function(stream){
        MediaStreamHelper._stream = stream;
        videoPlayer.srcObject = stream;
    });
};

navigator.mediaDevices.enumerateDevices().then((devices) => {
    let videoSourcesSelect = document.getElementById("video-source");
    let audioSourcesSelect = document.getElementById("audio-source");

    // Iterate over all the list of devices (InputDeviceInfo and MediaDeviceInfo)
    devices.forEach((device) => {
        let option = new Option();
        option.value = device.deviceId;

        // According to the type of media device
        switch(device.kind){
            // Append device to list of Cameras
            case "videoinput":
                option.text = device.label || `Camera ${videoSourcesSelect.length + 1}`;
                videoSourcesSelect.appendChild(option);
                break;
            // Append device to list of Microphone
            case "audioinput":
                option.text = device.label || `Microphone ${videoSourcesSelect.length + 1}`;
                audioSourcesSelect.appendChild(option);
                break;
        }

        console.log(device);
    });
}).catch(function (e) {
    console.log(e.name + ": " + e.message);
});

// Request streams (audio and video), ask for permission and display streams in the video element
MediaStreamHelper.requestStream().then(function(stream){
    console.log(stream);
    // Store Current Stream
    MediaStreamHelper._stream = stream;

    // Select the Current Streams in the list of devices
    audioSourcesSelect.selectedIndex = [...audioSourcesSelect.options].findIndex(option => option.text === stream.getAudioTracks()[0].label);
    videoSourcesSelect.selectedIndex = [...videoSourcesSelect.options].findIndex(option => option.text === stream.getVideoTracks()[0].label);

    // Play the current stream in the Video element
    videoPlayer.srcObject = stream;
    
    // You can now list the devices using the Helper
    MediaStreamHelper.getDevices().then((devices) => {
        // Iterate over all the list of devices (InputDeviceInfo and MediaDeviceInfo)
        devices.forEach((device) => {
            let option = new Option();
            option.value = device.deviceId;

            // According to the type of media device
            switch(device.kind){
                // Append device to list of Cameras
                case "videoinput":
                    option.text = device.label || `Camera ${videoSourcesSelect.length + 1}`;
                    videoSourcesSelect.appendChild(option);
                    break;
                // Append device to list of Microphone
                case "audioinput":
                    option.text = device.label || `Microphone ${videoSourcesSelect.length + 1}`;
                    audioSourcesSelect.appendChild(option);
                    break;
            }

            console.log(device);
        });
    }).catch(function (e) {
        console.log(e.name + ": " + e.message);
    });
}).catch(function(err){
    console.error(err);
}); 



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
