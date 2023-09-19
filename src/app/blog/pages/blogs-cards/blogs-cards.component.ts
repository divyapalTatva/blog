import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  takeUntil,
} from 'rxjs';
import { BlogCardService } from '../../service/blog-local/blog-card.service';
import { FormControl } from '@angular/forms';
import { ConfirmBoxService } from '../../shared/service/confirm-box/confirm-box.service';
import { ToastrService } from 'ngx-toastr';
import { BlogStaticMessage } from '../../shared/static/blogResponseMessage';
import { BlogRxjsService } from '../../service/blog-rxjs/blog-rxjs.service';
import { BlogApiService } from '../../service/blog-api/blog-api.service';
import { AuthService } from '../../shared/service/auth/auth.service';

@Component({
  selector: 'app-blogs-cards',
  templateUrl: './blogs-cards.component.html',
  styleUrls: ['./blogs-cards.component.css'],
})
export class BlogsCardsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cardObservableData!: Observable<any>;
  searchControl = new FormControl();
  dataReceived = new Subject<boolean>();
  private searchInputValue = new Subject<string>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private blogService: BlogApiService,
    private confirmBox: ConfirmBoxService,
    private toaster: ToastrService,
    private blogRxjs: BlogRxjsService,
    private authService: AuthService
  ) {}
  blogData: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getBlogData();
    this.searchInputValue.pipe(debounceTime(500)).subscribe((value) => {
      this.blogService.getCardData(value).subscribe((res: any) => {
        this.blogData = res.data;
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.cardObservableData = this.dataSource.connect();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.changeDetector.detectChanges();
        }, 100);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataReceived.subscribe((res) => {
      if (res) {
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.changeDetector.detectChanges();
        }, 100);
      }
    });
  }

  //get blog data
  getBlogData() {
    this.blogService.getCardData('').subscribe((res: any) => {
      this.blogData = res.data;
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.cardObservableData = this.dataSource.connect();

      if (res.statusCode == 200) {
        this.dataReceived.next(true);
      }
    });
  }

  //function for searching
  search(value: string) {
    this.searchInputValue.next(value);
  }

  // delete blog data from its id
  deleteBlog(id: number) {
    if (this.authService.getToken() == null) {
      this.confirmBox
        .openAuthDialogue(BlogStaticMessage.PleaseEnterCredentials)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.delete(id);
          } else {
            this.toaster.error(BlogStaticMessage.SomethingWentWrong);
          }
        });
    } else {
      this.delete(id);
    }
  }

  //ask for confirmation before deleting
  delete(id: number) {
    this.confirmBox
      .openConfirmDialogue(BlogStaticMessage.BlogDeleteConfirmation)
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.blogService.deleteBlog(id).subscribe({
            next: (res) => {
              if (res.statusCode == 200) {
                this.dataSource.data = this.dataSource.data.filter((data) => {
                  return data.id == id ? false : true;
                });
                this.dataSource._updateChangeSubscription();
                this.toaster.success(res.message);
              } else {
                this.toaster.error(res.message);
              }
            },
          });
        } else {
          this.toaster.error(BlogStaticMessage.NoBlogDeleted);
        }
      });
  }
}
