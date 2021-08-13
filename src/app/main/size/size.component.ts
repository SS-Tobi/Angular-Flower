import { Component, ViewChild, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as sweden } from './i18n/sw';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SizeService } from 'app/services/size.service';
import { SizeModalComponent } from './size-modal/size-modal.component';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'size',
    templateUrl: './size.component.html',
    styleUrls  : ['./size.component.scss']
})
export class SizeComponent implements OnInit
{
    displayedColumns: string[] = ['position', 'name', 'amount', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    sizeText: any;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dialog: MatDialog,
        public sizeService: SizeService,
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
        this.getSizeText()
        this.getSize()
    }
    getSizeText() {
        this.sizeService.getSizeText().subscribe((res: any) => {
            if (res.data.length > 0) {
                this.sizeText = res.data[0].text
                console.log("getSizeText: ", res)
            }
        })
    }
    getSize() {
        this.sizeService.getSize().subscribe((res: any) => {
            console.log("getSize: ", res)
            this.dataSource.data = res.data
            this.dataSource.paginator = this.paginator;
        })
    }
    AddBtn() {
        const sizeDialogRef = this.dialog.open(SizeModalComponent, {
            width: "600px",
            data: {
                isEdit: false
            },
            disableClose: true
        });
      
        sizeDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getSize()
            }
        });
    }
    deleteBtn(_id) {
        this.sizeService.deleteSize(_id).subscribe(res => {
            console.log("deleteSize: ", res)
            this.getSize()
        })
    }
    editBtn(data) {
        const sizeDialogRef = this.dialog.open(SizeModalComponent, {
            width: "600px",
            data: {
                data,
                isEdit: true
            },
            disableClose: true
        });
      
        sizeDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getSize()
            }
        });
    }

    saveText() {
        this.sizeService.saveSizeText(this.sizeText).subscribe(res => {
            console.log("saveSizeText: ", res)
        })
    }
}
