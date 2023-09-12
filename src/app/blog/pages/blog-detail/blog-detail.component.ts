import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCardService } from '../../service/blog-local/blog-card.service';
import { BlogRxjsService } from '../../service/blog-rxjs/blog-rxjs.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blogId!: number;
  blogData: any;
  constructor(
    private router: ActivatedRoute,
    private blogService: BlogCardService,
    private blogRxjs: BlogRxjsService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.blogId = +res['id'];
    });
    // this.blogData = this.blogService.getBlogDataById(this.blogId);
    this.blogData = this.blogRxjs.getBlogDataById(this.blogId);
  }
}
