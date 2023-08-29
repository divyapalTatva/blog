import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  navLinks: any[] = [
    { title: 'view books', link: '' },
    { title: 'manage books', link: 'books/manageBooks' },
  ];
}