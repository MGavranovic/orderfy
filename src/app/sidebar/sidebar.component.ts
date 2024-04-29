import { Component, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(e: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidebar.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSidebar() {
    this.collapsed = false;
    this.onToggleSidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
