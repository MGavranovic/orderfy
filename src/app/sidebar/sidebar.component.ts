import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  collapsed: boolean = true;
  navData = navbarData;
}
