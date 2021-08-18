import { Component, ViewChild, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as sweden } from './i18n/sw';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LandingModalComponent } from './landing-modal/landing-modal.component';
import { LandingService } from 'app/services/landing.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'landing',
    templateUrl: './landing.component.html',
    styleUrls  : ['./landing.component.scss']
})
export class LandingComponent implements OnInit
{
    displayedColumns: string[] = ['position', 'title', 'description', 'detail', 'action'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dialog: MatDialog,
        public landingService: LandingService,
        private _fuseConfigService: FuseConfigService
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
        this.getLanding()
    }
    getLanding() {
        this.landingService.getLanding().subscribe((res: any) => {
            console.log("getLanding: ", res)
            this.dataSource.data = res.data
            this.dataSource.paginator = this.paginator;
        })
    }
    AddBtn() {
        const landingDialogRef = this.dialog.open(LandingModalComponent, {
            width: "600px",
            data: {
                isEdit: false
            },
            disableClose: true
        });
      
        landingDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getLanding()
            }
        });
    }
    deleteBtn(_id) {
        this.landingService.deleteLanding(_id).subscribe(res => {
            console.log("deleteLanding: ", res)
            this.getLanding()
        })
    }
    editBtn(data) {
        const landingDialogRef = this.dialog.open(LandingModalComponent, {
            width: "600px",
            data: {
                data,
                isEdit: true
            },
            disableClose: true
        });
      
        landingDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getLanding()
            }
        });
    }
}
