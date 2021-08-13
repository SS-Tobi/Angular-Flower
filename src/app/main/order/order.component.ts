import { Component, OnInit, ViewChild } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as sweden } from './i18n/sw';
import { FuseConfigService } from '@fuse/services/config.service';
import { OrderService } from 'app/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddressService } from 'app/services/address.service';

@Component({
    selector   : 'order',
    templateUrl: './order.component.html',
    styleUrls  : ['./order.component.scss']
})
export class OrderComponent implements OnInit
{
    shop_address: any;
    latitude: any;
    longitude: any;
    working_hours: any;
    tell: any;
    website: any;
    email: any;

    displayedColumns: string[] = ['position', 'type', 'email', 'name', 'date', 'color', 'size', 'price', 'currency'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public orderService: OrderService,
        public addressService: AddressService
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: false
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._fuseTranslationLoaderService.loadTranslations(english, sweden);
    }
    ngOnInit(): void {
        this.getAddress()
        this.getOrder()
    }
    getOrder() {
        this.orderService.getOrder().subscribe((res: any) => {
            console.log("getOrder: ", res)
            this.dataSource.data = res.data
            this.dataSource.paginator = this.paginator
        })
    }
    getAddress() {
        this.addressService.getAddress().subscribe((res: any) => {
            this.shop_address = res.data[0].text
            this.latitude = res.data[0].latitude
            this.longitude = res.data[0].longitude
            this.working_hours = res.data[0].working_hours
            this.tell = res.data[0].tell
            this.website = res.data[0].website
            this.email = res.data[0].email
        })
    }
    saveAddress() {
        this.addressService.saveAddress(this.shop_address, this.latitude, this.longitude, this.working_hours, this.tell, this.website, this.email).subscribe(res => {
            console.log("saveAddress", res)
        })
    }
}
