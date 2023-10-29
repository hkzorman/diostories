import { Component } from '@angular/core';
import { Diostory, DiostoryPanel } from './diostory';
import { DiostoryService } from './diostory.service';
import { raceInit } from 'rxjs/internal/observable/race';

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

  currentView: View;
  public View = View;

  constructor(private diostoryService: DiostoryService) {
    this.currentView = View.Home;
    this.viewerEditMode = false;
    this.loadDiostoryList();
  }
  
  loadDiostoryList(): void {
    this.diostories = new Array<Diostory>();
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
  }

  createButtonClick(): void {
    this.currentView = View.Viewer;
    this.viewerEditMode = true;
  }

  homeNavbarOptionClick(): void {
    this.currentView = View.Home;
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
