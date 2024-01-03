import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiostoryService } from '../diostory.service';
import { Diostory, DiostoryPanel } from '../diostory';

const unititled: string = "Sin Titulo";

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
  file?: File;
  isFileUploading: boolean;
  isSaving: boolean;
  imgSize: string;

  @Input()
  set diostoryId(object: number) {
    if (object) {
      this.id = object;
      this.diostoryService.get(this.id).subscribe((response: any) => {
        console.log(response);
        console.log(this.id);
        this.diostory = Diostory.fromObject(response);
        this.diostory.id = this.id;
        this.original = this.diostory.clone(); // Clone diostory as backup
        this.currentPanel = this.diostory.firstPanel();
      });
    }
  }

  @Input()
  set editorMode(input: boolean) {
    console.log(this.id);
    if (input === true && this.id === undefined) {
      // This signals the creation of a new story
      this.diostory = new Diostory(unititled);
      this.diostory.addPanel("", "");
      this.currentPanel = this.diostory.firstPanel();
      this.original = this.diostory.clone();
      this.isEditMode = true;
    }
    else {
      this.isEditMode = input;
    }
  }

  @Output() onCancelButtonClick = new EventEmitter<any>();

  constructor(private diostoryService: DiostoryService) {
    this.isEditMode = false;
    this.file = undefined;
    this.isSaving = false;
    this.isFileUploading = false;
    this.imgSize = "fullwidth";
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
    if (this.original!.id === undefined && this.original!.title === unititled) {
      // User clicked cancel on a new story, so go back to home screen
      this.diostory = undefined;
      this.original = undefined;
      this.isEditMode = false;
      this.onCancelButtonClick.emit(true);
      return;
    }

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

  hasNextPanel(): boolean {
    return this.diostory!.getCurrentPanelIndex() < this.diostory!.getPanelCount();
  }

  prevButtonClick(): void {
    let prevPanel = this.diostory!.prevPanel();
    if (prevPanel) {
      this.currentPanel = prevPanel;
    }
  }

  hasPrevPanel(): boolean {
    return this.diostory!.getCurrentPanelIndex() > 1;
  }

  addPanelButtonClick(): void {
    this.diostory!.addPanel(unititled, "");
    const nextPanel = this.diostory!.nextPanel();
    if (nextPanel) this.currentPanel = nextPanel;
  }

  deletePanelButtonClick(): void {
    this.diostory!.removePanel();
    const prevPanel = this.diostory!.prevPanel();
    if (prevPanel) this.currentPanel = prevPanel;
  }

  isFirstPanel(): boolean {
    return this.diostory!.getCurrentPanelIndex() === 1;
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];

    this.isFileUploading = !this.isFileUploading; 
    console.log(this.file);
    this.diostoryService.uploadImage(this.file, true).subscribe( 
        (response: any) => { 
            if (typeof (response) === 'object') { 
                this.isFileUploading = false;
                this.currentPanel!.imageUrl = response.url;
            } 
        } 
    );
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
