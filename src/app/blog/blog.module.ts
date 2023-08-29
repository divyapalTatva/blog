import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { MaterialModule } from 'src/shared/module/material.module';
import { FooterComponent } from './components/footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BlogsCardsComponent } from './components/blogs-cards/blogs-cards.component';

@NgModule({
  declarations: [BlogComponent, FooterComponent, BlogsCardsComponent],
  imports: [CommonModule, BlogRoutingModule, MaterialModule, FlexLayoutModule],
})
export class BlogModule {}
