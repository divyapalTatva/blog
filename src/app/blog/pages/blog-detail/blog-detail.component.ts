import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlogCardService } from '../../service/blog-local/blog-card.service';
import { BlogRxjsService } from '../../service/blog-rxjs/blog-rxjs.service';
import { BlogApiService } from '../../service/blog-api/blog-api.service';
import { ToastrService } from 'ngx-toastr';
import { BlogStaticMessage } from '../../shared/static/blogResponseMessage';

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
    private route: Router,
    private blogService: BlogApiService,
    private blogRxjs: BlogRxjsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.blogId = +res['id'];
    });
    this.blogData = this.blogService.getBlogDataById(this.blogId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.blogData = res.data;
        } else {
          this.route.navigate(['']);
        }
      },
    });
  }
}
