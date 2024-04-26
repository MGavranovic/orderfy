import { Component } from '@angular/core';
import { SidebarModule, Sidebar } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  collapsed: boolean = true;
  navData = navbarData;
}
