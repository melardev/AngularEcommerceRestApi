import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/models/product';
import {Router} from '@angular/router';
import {ProductDto} from '../../shared/dtos/responses/products/products.dto';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // https://github.com/froala/angular-froala-wysiwyg#installation-instructions
  public editorContent: string;
  private description: string;

  showCode = false;

  // images: Array<File> = [];
  images: FileList;

  public options: Object = {
    placeholderText: 'Description',
    charCounterCount: false,
    imageUpload: false,
    quickInsertTags: ['p', 'div', 'h1'],
  };

  private productForm: FormGroup;

  constructor(private productsService: ProductsService, private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [1, [Validators.required, Validators.min(1)]],
      stock: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onDataChanged(content) {
    this.description = content;
  }

  addFiles(e: any) {
    this.images = <FileList>e.target.files;
  }

  submitForm() {

    const productInfo = this.productForm.value as Product;
    productInfo.description = this.description;

    this.productsService.createProduct(productInfo, this.images)
      .subscribe(
        data => {
          if (data && data.success) {
            this.router.navigate(['/', 'products', (data as ProductDto).id]);
          } else {
            this.router.navigate(['/', 'products']);
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}
