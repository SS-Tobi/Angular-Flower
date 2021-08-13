import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SizeService } from 'app/services/size.service';
@Component({
  selector: "size-modal",
  templateUrl: "./size-modal.component.html",
  styleUrls: ["./size-modal.component.scss"],
})
export class SizeModalComponent implements OnInit {

    name: any;
    isReset: any = false
    amount: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<SizeModalComponent>,
        public sizeService: SizeService
    ) {
        console.log("dataPass: ", data)
        if (data.isEdit) {
            this.name = data.data.name
            this.amount = data.data.amount
        }
    }

    ngOnInit() {
    }

    submitBtn() {
        this.sizeService.createSize(this.name, this.amount).subscribe((res: any) => {
            console.log("createSize: ", res)
            this.dialogRef.close({event: 'submit'})
        })
    }

    editBtn() {
        this.sizeService.updateSize(this.data.data._id, this.name, this.amount).subscribe((res: any) => {
            console.log("updateSize: ", res)
            this.dialogRef.close({event: 'submit'})
        })
    }

    closeBtn() {
        this.dialogRef.close({event: 'close'})
    }

}
