import { Component, OnInit, input } from '@angular/core';
import { GraphsComponent } from './graphs/graphs.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GraphsComponent, CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  userFullName: string = 'Milos Gavranovic';
  userParsedName: string = '';

  parseName(name: string): string {
    let userFirstName: string = name.split(' ')[0];
    let userLastName: string = name.split(' ')[1];
    this.userParsedName = `${userLastName}, ${userFirstName}`;
    return this.userParsedName;
  }

  ngOnInit(): void {
    this.parseName(this.userFullName);
  }
}
