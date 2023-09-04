import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { MaterialModule } from 'src/shared/module/material.module';
import { FooterComponent } from './components/footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BlogsCardsComponent } from './components/blogs-cards/blogs-cards.component';
import { AddEditBlogComponent } from './components/add-edit-blog/add-edit-blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    BlogComponent,
    FooterComponent,
    BlogsCardsComponent,
    AddEditBlogComponent,
    BlogDetailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BlogModule {}