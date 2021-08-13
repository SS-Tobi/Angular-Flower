import { Component, ViewChild, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as sweden } from './i18n/sw';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'app/services/color.service';
import { ColorModalComponent } from './color-modal/color-modal.component';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'color',
    templateUrl: './color.component.html',
    styleUrls  : ['./color.component.scss']
})
export class ColorComponent implements OnInit
{
    displayedColumns: string[] = ['position', 'name', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    colorText: any;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dialog: MatDialog,
        public colorService: ColorService,
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
        this.getColorText()
        this.getColor()
    }
    getColorText() {
        this.colorService.getColorText().subscribe((res: any) => {
            if (res.data.length > 0) {
                this.colorText = res.data[0].text
                console.log("getColorText: ", res)
            }
        })
    }
    getColor() {
        this.colorService.getColor().subscribe((res: any) => {
            console.log("getColor: ", res)
            this.dataSource.data = res.data
            // this.dataSource.data.sort((a,b) => a.name.localeCompare(b.name))
            this.dataSource.paginator = this.paginator;
        })
    }
    // AddBtn() {
    //     const styleDialogRef = this.dialog.open(ColorModalComponent, {
    //         width: "600px",
    //         data: {
    //             isEdit: false
    //         },
    //         disableClose: true
    //     });
      
    //     styleDialogRef.afterClosed().subscribe((res) => {
    //         console.log("res", res)
    //         if (res.event == 'submit') {
    //             this.getStyle()
    //         }
    //     });
    // }
    editBtn(data) {
        const colorDialogRef = this.dialog.open(ColorModalComponent, {
            width: "600px",
            data: {
                data
            },
            disableClose: true
        });
      
        colorDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getColor()
            }
        });
    }

    saveText() {
        this.colorService.saveColorText(this.colorText).subscribe(res => {
            console.log("saveColorText: ", res)
        })
    }
}
