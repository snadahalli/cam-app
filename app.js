var deviceId;

navigator.mediaDevices.enumerateDevices().then((devices) => {

    // Iterate over all the list of devices (InputDeviceInfo and MediaDeviceInfo)
    devices.forEach((device) => {
        // According to the type of media device
        switch(device.kind){
            // Append device to list of Cameras
            case "videoinput":
                deviceId = device.deviceId;
                break;
        }
    });
}).catch(function (e) {
    console.log(e.name + ": " + e.message);
});

const constraints = {
            video: {
                deviceId: deviceId ? {exact: deviceId} : undefined
            }
        };

navigator.mediaDevices.getUserMedia(constraints).then(function(stream){

  vid.onloadedmetadata = function(){
    this.width = overlay.width = this.videoWidth;
    this.height = overlay.height = this.videoHeight;
    }
  vid.srcObject = stream;
  vid.play();
  overlay.onclick = function(){
    var c = document.createElement('canvas');
    c.width = vid.videoWidth;
    c.height = vid.videoHeight;
    c.getContext('2d').drawImage(vid, 0,0);
    c.toBlob(doWhatYouWantWithTheCapturedImage);
    };
  });

function doWhatYouWantWithTheCapturedImage(blob){
  var url = URL.createObjectURL(blob);
  var img = new Image();
  img.onload = function(){URL.revokeObjectURL(url);};
  img.src = url;
  URL.revokeObjectURL(vid.src);
  overlay.parentNode.appendChild(img);
  vid.parentNode.removeChild(vid);
  overlay.parentNode.removeChild(overlay);
  }
