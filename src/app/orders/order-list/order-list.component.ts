import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../shared/services/orders.service';
import {OrderListDto} from '../../shared/dtos/responses/orders/order-list.dto';
import {Order} from '../../shared/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private orders: Order[] = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {

    this.ordersService.getMyOrders().subscribe(res => {
      if (res.success) {
        console.log(res.orders);
        const response = res as OrderListDto;
        this.orders = response.orders;
      }
    });
  }

}
