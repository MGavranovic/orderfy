import { Component, OnInit } from '@angular/core';
import { GraphsComponent } from './graphs/graphs.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GraphsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
