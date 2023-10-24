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
  selectedId?: number | null = null;

  constructor(private diostoryService: DiostoryService) {
    this.diostoryService.list().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.diostories = response;
      }
    });
  }
}
