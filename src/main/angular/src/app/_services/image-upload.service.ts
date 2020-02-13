import {Injectable, OnInit} from '@angular/core';

const cloudName = 'dwvirsr0i';
const unsignedUploadPreset = 'vgffszgq';
let onUploadedCallback;

@Injectable()
export class ImageUploadService {

  public setOnUploadedCallback(callback) {
    onUploadedCallback = callback;
  }

  public processDropboxSelect(dropbox) {
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    let context: ImageUploadService = this;
    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;
      for (var i = 0; i < files.length; i++) {
        context.uploadFile(files[i]); // call the function to upload the file
      }
    }

    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', drop, false);
  }

  public processDirectSelect(fileSelectButton, fileInputElement) {
    if (fileSelectButton) {
      fileSelectButton.addEventListener('click', function (e) {
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
  }

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

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_350,c_scale');
        url = tokens.join('/');
        onUploadedCallback(url);
      }
    };
  }
}
