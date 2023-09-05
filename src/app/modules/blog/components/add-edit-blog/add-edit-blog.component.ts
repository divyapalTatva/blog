import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogDataValidationMessage } from 'src/shared/static/staticMessages';
import { BlogCardService } from '../../Service/blog-card.service';
import { options } from 'src/shared/static/editorToolbarOptions';
import { ToastrService } from 'ngx-toastr';
import { BlogStaticMessage } from 'src/shared/static/blogResponseMessage';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css'],
})
export class AddEditBlogComponent implements OnInit, AfterViewInit {
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: options,
  };
  image: string[] = [];
  BlogForm!: FormGroup;
  imageArrayDataExist: boolean = true;
  descriptionDataExists: boolean = true;
  editorContent: string = '';
  toolbarOptions: any = options;
  blogData: any;
  isDataForEdit!: boolean;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogCardService,
    private changeDetector: ChangeDetectorRef,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((res) => {
      if (res['action'] == 'edit') {
        this.isDataForEdit = true;
        this.blogData = this.blogService.getBlogDataById(+res['id']);

        this.BlogForm.patchValue({
          title: this.blogData.title,
          description: this.blogData.description,
          tags: this.blogData.tags,
        });

        const abc = this.image.push(this.blogData.imgSource);
        if (abc === 1) {
          this.imageArrayDataExist = true;
        } else {
          this.imageArrayDataExist = false;
        }
        //console.log(this.blogData);
      } else {
        this.isDataForEdit = false;
      }
    });
    this.changeDetector.detectChanges();
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

  // ckeditor configuration on ready function
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
    } else {
      this.imageArrayDataExist = false;
    }
    this.BlogForm.patchValue({ image: '' });
  }

  //function for add update new blog
  AddUpdateBlog() {
    if (this.isDataForEdit) {
      if (this.image.length > 0) {
        this.imageArrayDataExist = true;
      } else {
        this.imageArrayDataExist = false;
      }
    } else {
      if (this.Image.value != '') {
        this.imageArrayDataExist = true;
      } else {
        this.imageArrayDataExist = false;
      }
    }

    if (!this.BlogForm.invalid && this.imageArrayDataExist) {
      if (this.isDataForEdit) {
        const data = {
          id: this.blogData.id,
          title: this.Title.value,
          description: this.Description.value,
          imgSource: this.image[0],
          tags: this.Tags.value,
        };
        const dataUpdated = this.blogService.editBlogData(data);
        if (dataUpdated) {
          this.toaster.success(BlogStaticMessage.BlogUpdated);
        }
      } else {
        const data = {
          id: 0,
          title: this.Title.value,
          description: this.Description.value,
          imgSource: this.image[0],
          tags: this.Tags.value,
        };
        const blogAdded = this.blogService.addNewCardData(data);
        if (blogAdded) {
          this.toaster.success(BlogStaticMessage.BlogAdded);
        }
      }

      this.router.navigate(['']);
      //console.log('DATA HERE');
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
    if (this.image.length <= 0) return BlogDataValidationMessage.imageRequired;
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
  get Image(): FormControl {
    return this.BlogForm.get('image') as FormControl;
  }
}
