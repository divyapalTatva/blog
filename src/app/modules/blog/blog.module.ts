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
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxComponent } from './sharedComponent/confirm-box/confirm-box.component';
import { ConfirmBoxService } from './Service/confirm-box.service';

@NgModule({
  declarations: [
    BlogComponent,
    FooterComponent,
    BlogsCardsComponent,
    AddEditBlogComponent,
    BlogDetailComponent,
    ConfirmBoxComponent,
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
  providers: [ConfirmBoxService],
})
export class BlogModule {}
