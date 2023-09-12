import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogInitialData } from '../../shared/static/initialData';

@Injectable({
  providedIn: 'root',
})
export class BlogRxjsService {
  constructor() {}

  blogData = new BehaviorSubject(BlogInitialData);

  addNewBlogData(newBlog: any) {
    let existingData = this.blogData.getValue();
    if (existingData.length == 0) {
      newBlog.id = 1;
    } else {
      let latestBlogId = existingData[existingData.length - 1].id + 1;
      newBlog.id = latestBlogId;
    }
    this.blogData.next(this.blogData.getValue().concat([newBlog]));
    return true;
  }

  editBlogData(updatedBlog: any): boolean {
    const allBlogs = this.blogData.getValue();
    const indexOfObjectToReplace = allBlogs.findIndex(
      (obj: any) => obj.id === updatedBlog.id
    );
    if (indexOfObjectToReplace !== -1) {
      allBlogs[indexOfObjectToReplace] = updatedBlog;
      this.blogData.next(allBlogs);
      return true;
    } else {
      return false;
    }
  }

  deleteBlog(id: number) {
    const existingBlogData = this.blogData.getValue();
    const remainingDataAfterDelete = existingBlogData.filter(
      (item: any) => item.id !== id
    );
    this.blogData.next(remainingDataAfterDelete);
    return true;
  }

  getBlogDataById(id: number) {
    const AllBlogs = this.blogData.getValue();

    let blogData = AllBlogs.find((item: any) => {
      return item.id == id;
    });
    return blogData;
  }
}
