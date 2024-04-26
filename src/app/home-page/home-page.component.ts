import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AboutComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
