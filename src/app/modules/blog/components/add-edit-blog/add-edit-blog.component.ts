import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogDataValidationMessage } from 'src/shared/static/staticMessages';
import { BlogCardService } from '../../Service/blog-card.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css'],
})
export class AddEditBlogComponent implements OnInit {
  public Editor = ClassicEditor;
  image: string[] = [];
  BlogForm!: FormGroup;
  imageArrayDataExist: boolean = true;
  descriptionDataExists: boolean = true;
  editorContent: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogCardService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  // create blog form
  createForm() {
    this.BlogForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      tags: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
    });
  }

  // ckeditro configuration on ready function
  onReady(editor: ClassicEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;
    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }

  // add image in array from preview
  onFileChangeForImage(event: any) {
    this.image = [];
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        if (
          event.target.files[i].type.match('image/png|image/jpeg|image/jpg')
        ) {
          var reader = new FileReader();

          reader.onload = (event: any) => {
            this.image.push(event.target.result);
            //console.log(this.image.length);
            if (this.image.length > 0) {
              this.imageArrayDataExist = true;
            } else {
              this.imageArrayDataExist = false;
            }
          };
          reader.readAsDataURL(event.target.files[i]);
        } else {
        }
      }
    }
  }

  //delete image from array
  deleteImageFromArray(index: number) {
    this.image.splice(index);
    if (this.image.length > 0) {
      this.imageArrayDataExist = true;
    }
  }

  //function for add update new blog
  AddUpdateBlog() {
    if (this.image.length > 0) {
      this.imageArrayDataExist = true;
    } else {
      this.imageArrayDataExist = false;
    }

    if (!this.BlogForm.invalid && this.imageArrayDataExist) {
      const data = {
        id: 0,
        title: this.Title.value,
        description: this.Description.value,
        imgSource: this.image[0],
        tags: this.Tags.value,
      };
      this.router.navigate(['']);
      //console.log('DATA HERE');
      this.blogService.addNewCardData(data);
    } else {
      console.log('please fill all details');
    }
  }

  // functions for get error of all input fields
  getTitleError() {
    if (this.Title.hasError('required'))
      return BlogDataValidationMessage.titleRequired;
    if (this.Title.hasError('maxlength'))
      return BlogDataValidationMessage.titleLength;
    return '';
  }
  getDescriptionError() {
    if (this.Description.hasError('required'))
      return BlogDataValidationMessage.descriptionRequired;
    return '';
  }
  getTagsError() {
    if (this.Tags.hasError('required'))
      return BlogDataValidationMessage.tagsRequired;
    return '';
  }
  getImageError() {
    if (!this.imageArrayDataExist)
      return BlogDataValidationMessage.imageRequired;
    return '';
  }

  // getter method of input fields
  get Title(): FormControl {
    return this.BlogForm.get('title') as FormControl;
  }
  get Tags(): FormControl {
    return this.BlogForm.get('tags') as FormControl;
  }
  get Description(): FormControl {
    return this.BlogForm.get('description') as FormControl;
  }
}
