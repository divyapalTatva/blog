import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

import { BlogsCardsComponent } from './components/blogs-cards/blogs-cards.component';
import { AddEditBlogComponent } from './components/add-edit-blog/add-edit-blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: BlogsCardsComponent,
      },
      {
        path: 'BlogForm/:action',
        component: AddEditBlogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
