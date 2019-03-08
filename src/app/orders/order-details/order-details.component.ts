import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../shared/services/orders.service';
import {ActivatedRoute} from '@angular/router';
import {OrderDetailsDto} from '../../shared/dtos/responses/orders/order-details.response';
import {OrderItemDto} from '../../shared/dtos/responses/order_items/order-item.dto';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  private orderItems: OrderItemDto[] = [];
  private order: OrderDetailsDto;

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.ordersService.getOrder(id).subscribe(res => {
        if (res.success) {
          console.log(res);
          const response = res as OrderDetailsDto;
          this.order = response;
          this.orderItems = this.order.order_items;
          console.log(this.order);
          console.log(this.orderItems);
        }
      });
    });
  }

}
