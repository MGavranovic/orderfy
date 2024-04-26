import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  currentText: string = '';

  changeText(): void {
    setTimeout(() => {
      this.currentText = 'Place';
    }, 0);
    setTimeout(() => {
      this.currentText = 'Track';
    }, 5000);
    setTimeout(() => {
      this.currentText = 'Update';
    }, 10000);
  }

  ngOnInit() {
    this.changeText();
  }
}
