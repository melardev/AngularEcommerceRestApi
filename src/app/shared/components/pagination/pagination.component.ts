import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PaginatedRequestDto} from '../../dtos/requests/base.dto';
import {PageMeta} from '../../dtos/responses/shared/page-meta.dto';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageMeta: PageMeta;
  @Output() loadMore: EventEmitter<PaginatedRequestDto> = new EventEmitter();

  private totalItemsCount: number;
  private lastRecord: number;
  private firstRecord: number;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMeta) {
      this.lastRecord = this.pageMeta.current_items_count + this.pageMeta.offset;
      this.firstRecord = this.pageMeta.offset + 1;
      this.totalItemsCount = this.pageMeta.total_items_count;
    }
  }

  fetchMore(page: number, pageSize: number) {
    this.loadMore.emit({page, pageSize});
  }

}
