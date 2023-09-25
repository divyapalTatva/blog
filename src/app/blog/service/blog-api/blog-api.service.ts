import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogInitialData } from '../../shared/static/initialData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  cardData: any = BlogInitialData;

  constructor(private http: HttpClient) {}

  //get card data from local storage
  getCardData(search: string): any {
    return this.http.get(
      `${environment.baseURL}Blog/GetAllBlogs?search=${search}`
    );
  }

  //get blog data from its id
  getBlogDataById(id: number) {
    return this.http.get(`${environment.baseURL}Blog/GetBlogById?id=${id}`);
  }

  //add new blog
  addUpdateBlogData(BlogData: any) {
    return this.http.put<any>(
      `${environment.baseURL}Blog/AddUpdateBlogData`,
      BlogData
    );
  }

  //delete blog data from local storage
  deleteBlog(id: number) {
    return this.http.delete<any>(
      `${environment.baseURL}Blog/DeleteBlogData?id=${id}`
    );
  }

  getAllTags() {
    return this.http.get<any>(`${environment.baseURL}Blog/GetAllTags`);
  }

  addNewTags(tagToBeAdded: string) {
    const payload = {
      tagName: tagToBeAdded,
    };
    return this.http.put<any>(`${environment.baseURL}Blog/AddNewTag`, payload);
  }
}
