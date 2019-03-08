import {Component, OnInit} from '@angular/core';
import {AddressesService} from '../../shared/services/addresses.service';
import {AddressDto, AddressListResponseDto} from '../../shared/dtos/responses/addresses/addresses.dto';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  private addresses: AddressDto[];

  constructor(private addressesService: AddressesService) {
  }

  ngOnInit() {
    this.addressesService.fetchAll().subscribe(res => {
      if (res.success) {
        this.addresses = (res as AddressListResponseDto).addresses;
      }
    }, err => {

    });
  }

}
