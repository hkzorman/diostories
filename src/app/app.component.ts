import { Component } from '@angular/core';
import { Diostory, DiostoryPanel } from './diostory';
import { DiostoryService } from './diostory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diostories';
  diostories?: Diostory[];
  selectedId?: number = undefined;
  viewerEditMode: boolean;
  showNavMenu: boolean;

  currentView: View;
  public View = View;

  constructor(private diostoryService: DiostoryService) {
    this.currentView = View.Home;
    this.viewerEditMode = false;
    this.showNavMenu = false;
    this.loadDiostoryList();
  }
  
  loadDiostoryList(): void {
    this.diostories = new Array<Diostory>();
    this.selectedId = undefined;
    this.diostoryService.list().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.diostories = response;
      }
    });
  }

  diostoryTitleClick(clickedDiostory: Diostory): void {
    this.selectedId = clickedDiostory.id
    this.currentView = View.Viewer;
    this.viewerEditMode = false;
  }

  createButtonClick(): void {
    this.currentView = View.Viewer;
    this.viewerEditMode = true;
  }

  editButtonClick(): void {
    this.currentView = View.Viewer;
    this.viewerEditMode = true;
  }

  saveButtonClick(): void {

  }

  cancelButtonClick(): void {

  }

  homeNavbarOptionClick(): void {
    this.currentView = View.Home;
    this.selectedId = undefined;
    this.viewerEditMode = false;
    this.loadDiostoryList();
  }

  handleCancelButtonClick(event: any): void {
    if (event === true) {
      this.currentView = View.Home;
    }
  }
}

export enum View {
  Home,
  Viewer
}
