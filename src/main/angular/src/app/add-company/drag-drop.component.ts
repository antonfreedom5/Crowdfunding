import {Component, OnInit} from "@angular/core";
import {ImageUploadService} from "../_services/image-upload.service";

let imageSet: String[] = [];

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
  constructor(private uploadService:ImageUploadService) {}

  ngOnInit() {
    let gallery = document.getElementById('gallery');
    this.uploadService.setOnUploadedCallback(this.onUploadedCallback);
    this.uploadService.processDirectSelect(document.getElementById("fileSelect"),
      document.getElementById("fileElem"));
    this.uploadService.processDropboxSelect(document.getElementById("dropbox"));
  }

  public onUploadedCallback(url) {
    imageSet.push(url);
    let img = new Image();
    img.src = url;
    let gallery = document.getElementById('gallery');
    gallery.appendChild(img);
  }

  public handleFiles(files) {
    this.uploadService.handleFiles(files);
  }

  public getImageSet(): String[] {
    let copy = imageSet.slice();
    imageSet = [];
    return copy;
  }
}
