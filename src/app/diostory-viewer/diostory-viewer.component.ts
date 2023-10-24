import { Component, Input } from '@angular/core';
import { DiostoryService } from '../diostory.service';
import { Diostory, DiostoryPanel } from '../diostory';

@Component({
  selector: 'diostory-viewer',
  templateUrl: './diostory-viewer.component.html',
  styleUrls: ['./diostory-viewer.component.css']
})
export class DiostoryViewerComponent {
  id?: number;
  original?: Diostory;
  diostory?: Diostory;
  currentPanel?: DiostoryPanel;
  isEditMode: boolean;
  file: File | null;
  isFileUploading: boolean;
  isSaving: boolean;

  @Input()
  set diostoryId(object: number) {
    if (object) {
      this.id = object;
      this.diostoryService.get(this.id).subscribe((response: any) => {
        console.log(response);
        console.log(this.id);
        this.diostory = Diostory.fromObject(response);
        this.original = this.diostory.clone(); // Clone diostory as backup
        this.currentPanel = this.diostory.firstPanel();
      });
    }
  }


  constructor(private diostoryService: DiostoryService) {
    this.isEditMode = false;
    this.file = null;
    this.isSaving = false;
    this.isFileUploading = false;
  }

  editButtonClick(): void {
    this.original = this.diostory!.clone();
    this.isEditMode = true;
  }

  saveButtonClick(): void {
    this.isSaving = true;
    this.diostoryService.save(this.diostory!).subscribe((response: any) => {
      this.isEditMode = false;
      this.isSaving = false;
    });
  }

  cancelButtonClick(): void {
    this.diostory = this.original!.clone();
    this.currentPanel = this.diostory.firstPanel();
    this.isEditMode = false;
  }

  nextButtonClick(): void {
    let nextPanel = this.diostory!.nextPanel();
    if (nextPanel) {
      this.currentPanel = nextPanel;
    }
  }

  prevButtonClick(): void {
    let prevPanel = this.diostory!.prevPanel();
    if (prevPanel) {
      this.currentPanel = prevPanel;
    }
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  uploadButtonClick() { 
    this.isFileUploading = !this.isFileUploading; 
    console.log(this.file); 
    this.diostoryService.uploadImage(this.file).subscribe( 
        (response: any) => { 
            if (typeof (response) === 'object') { 
                this.isFileUploading = false;
                this.currentPanel!.imageUrl = response.url;
            } 
        } 
    );
  }

  getAbsoluteImageUrl(relativeUrl: string): string {
    return this.diostoryService.getAbsoluteImageUrl(relativeUrl);
  }
}
