import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxService } from './shared/service/confirm-box/confirm-box.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BlogsCardsComponent } from './pages/blogs-cards/blogs-cards.component';
import { AddEditBlogComponent } from './pages/add-edit-blog/add-edit-blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { ConfirmBoxComponent } from './shared/components/confirm-box/confirm-box.component';
import { MaterialModule } from '../shared/module/material.module';
import { LoginPromptComponent } from './shared/components/login-prompt/login-prompt.component';
import { AuthService } from './shared/service/auth/auth.service';

@NgModule({
  declarations: [
    BlogComponent,
    FooterComponent,
    BlogsCardsComponent,
    AddEditBlogComponent,
    BlogDetailComponent,
    ConfirmBoxComponent,
    LoginPromptComponent,
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
