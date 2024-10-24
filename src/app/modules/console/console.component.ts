import {Component, OnInit} from '@angular/core';
import {NgFor} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [NgFor,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './console.component.html',
  styleUrl: './console.component.css'
})
export default class ConsoleComponent implements OnInit {

  ngOnInit(): void {

  }

}
