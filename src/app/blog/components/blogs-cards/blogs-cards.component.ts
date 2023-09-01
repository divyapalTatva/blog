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
import { BlogCardService } from '../../Service/blog-card.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-blogs-cards',
  templateUrl: './blogs-cards.component.html',
  styleUrls: ['./blogs-cards.component.css'],
})
export class BlogsCardsComponent implements OnInit, AfterViewInit {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private blogService: BlogCardService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cardObservableData!: Observable<any>;
  searchControl = new FormControl();

  private searchInputValue = new Subject<string>();

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.blogService.getCardData()
  );

  ngOnInit(): void {
    this.blogService.getCardData();
    this.blogService.ngOnInit();
    this.cardObservableData = this.dataSource.connect();

    this.searchInputValue
      .pipe(
        debounceTime(1000) // Adjust the debounce time as needed
      )
      .subscribe((value) => {
        this.dataSource.filter = value.trim().toLowerCase();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.changeDetector.detectChanges();
  }

  search(value: string) {
    this.searchInputValue.next(value);
  }
}
