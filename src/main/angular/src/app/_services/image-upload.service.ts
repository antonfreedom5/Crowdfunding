import {Injectable, OnInit} from '@angular/core';

const cloudName = 'dwvirsr0i';
const unsignedUploadPreset = 'vgffszgq';

@Injectable()
export class ImageUploadService {
  constructor(private onUploaded) { }

  public processDropbox(dropbox) {
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;

      this.handleFiles(files);
    }

    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  }

  public processDirectSelect(fileSelectButton, fileInputElement) {
    if (fileSelectButton) {
      fileSelectButton.addEventListener("click", function (e) {
        if (fileInputElement) {
          fileInputElement.click();
        }
        e.preventDefault();
      }, false);
    }
  }

  public handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]); // call the function to upload the file
    }
  };

  public uploadFile(file) {
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    var fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);

    // тут можно было бы добавить крутилку пока файл загружается...
    //xhr.upload.addEventListener();

    function onUploadedFunction(url: any) {
      this.onUploaded(url);
    }

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_340,c_scale');
        url = tokens.join('/');
        onUploadedFunction(url);
      }
    };
  }
}
