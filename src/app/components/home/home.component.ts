import {Component, OnInit} from '@angular/core';
import {PagesService} from '../../shared/services/pages.service';
import {Category} from '../../shared/models/category.model';
import {Tag} from '../../shared/models/tag.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private categories: Category[];
  private tags: Tag[];

  constructor(private pageService: PagesService) {
  }

  ngOnInit() {
    this.pageService.fetchHome().subscribe(res =>{
      this.tags = res.tags;
      this.categories = res.categories;
    });
  }

}
