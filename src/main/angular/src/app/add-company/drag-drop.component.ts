import {Component, OnInit} from "@angular/core";
import {ImageUploadService} from "../_services/image-upload.service";

const cloudName = 'dwvirsr0i';
const unsignedUploadPreset = 'vgffszgq';

let fileSelect;
let fileElem;
let gallery = document.getElementById('gallery');
let uploadCallback = function(url) {
  let img = new Image();
  img.src = url;
  gallery.appendChild(img);
};

@Component({
  selector: 'drag-and-drop',
  template: `<div id="dropbox">
    <h1>Add images</h1>
    <form class="my-form">
      <div class="form_line">
        <h4>Upload files with the file dialog or by dragging and dropping images onto the dashed region</h4>
        <div class="form_controls">
          <div class="upload_button_holder">
            <input type="file" id="fileElem" multiple accept="image/*" style="display:none" (change)="handleFiles($event.target.files)">
            <a href="" id="fileSelect">Select files</a>
          </div>
        </div>
      </div>
    </form>
    <div id="gallery"></div>
  </div>`,
  styleUrls: ['./dragdrop.css'],
  providers: [ImageUploadService]
})
export class DragDropComponent implements OnInit {
  ngOnInit() {


    fileSelect = document.getElementById("fileSelect");
    fileElem = document.getElementById("fileElem");

    fileSelect.addEventListener("click", function(e) {
      if (fileElem) {
        fileElem.click();
      }
      e.preventDefault(); // prevent navigation to "#"
    }, false);

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

    let dropbox = document.getElementById("dropbox");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  }

  public handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]); // call the function to upload the file
    }
  };

  public uploadFile(file) {
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // тут можно было бы добавить крутилку пока файл загружается...
    //xhr.upload.addEventListener();

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_340,c_scale');
        url = tokens.join('/');
        var img = new Image();
        img.src = url;
        img.alt = response.public_id;
        document.getElementById('gallery').appendChild(img);
      }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }
}
