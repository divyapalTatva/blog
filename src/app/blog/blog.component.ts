import { Component, OnInit } from '@angular/core';
import { BlogCardService } from './service/blog-local/blog-card.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  navLinks: any[] = [
    { title: 'All blogs', link: '/' },
    { title: 'View profile', link: '' },
  ];
  hideNavLink: boolean = true;
  constructor(
    private blogService: BlogCardService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    //this.blogService.isDataPresent();
    if (!this.blogService.isDataPresent()) {
      this.blogService.setCardData();
    }
    if (this.router.url != '/') {
      this.hideNavLink = false;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url == '/') {
          this.hideNavLink = true;
        } else {
          this.hideNavLink = false;
        }
      });
  }
}
