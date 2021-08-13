import { Component, ViewChild, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as sweden } from './i18n/sw';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StyleService } from 'app/services/style.service';
import { StyleModalComponent } from './style-modal/style-modal.component';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'style',
    templateUrl: './style.component.html',
    styleUrls  : ['./style.component.scss']
})
export class StyleComponent implements OnInit
{
    displayedColumns: string[] = ['position', 'name', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    styleText: any;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dialog: MatDialog,
        public styleService: StyleService,
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
        this.getStyleText()
        this.getStyle()
    }
    getStyleText() {
        this.styleService.getStyleText().subscribe((res: any) => {
            if (res.data.length > 0) {
                this.styleText = res.data[0].text
                console.log("getStyleText: ", res)
            }
        })
    }
    getStyle() {
        this.styleService.getStyle().subscribe((res: any) => {
            console.log("getStyle: ", res)
            this.dataSource.data = res.data
            this.dataSource.paginator = this.paginator;
        })
    }
    AddBtn() {
        const styleDialogRef = this.dialog.open(StyleModalComponent, {
            width: "600px",
            data: {
                isEdit: false
            },
            disableClose: true
        });
      
        styleDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getStyle()
            }
        });
    }
    deleteBtn(_id) {
        this.styleService.deleteStyle(_id).subscribe(res => {
            console.log("deleteStyle: ", res)
            this.getStyle()
        })
    }
    editBtn(data) {
        const styleDialogRef = this.dialog.open(StyleModalComponent, {
            width: "600px",
            data: {
                data,
                isEdit: true
            },
            disableClose: true
        });
      
        styleDialogRef.afterClosed().subscribe((res) => {
            console.log("res", res)
            if (res.event == 'submit') {
                this.getStyle()
            }
        });
    }

    saveText() {
        this.styleService.saveStyleText(this.styleText).subscribe(res => {
            console.log("saveStyletext: ", res)
        })
    }
}
