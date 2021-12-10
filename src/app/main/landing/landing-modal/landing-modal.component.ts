import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LandingService } from 'app/services/landing.service';
import { environment } from "../../../../environments/environment";
@Component({
  selector: "landing-modal",
  templateUrl: "./landing-modal.component.html",
  styleUrls: ["./landing-modal.component.scss"],
})
export class LandingModalComponent implements OnInit {

    file: any;
    url: any;
    title: any;
    title_sw: any;
    description: any;
    description_sw: any;
    detail: any;
    detail_sw: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<LandingModalComponent>,
        public landingService: LandingService
    ) {
        console.log("dataPass: ", data)
        if (data.isEdit) {
            this.title = data.data.title
            this.description = data.data.description
            this.detail = data.data.detail
            this.title_sw = data.data.title_sw
            this.description_sw = data.data.description_sw
            this.detail_sw = data.data.detail_sw
            console.log("url1: ", this.url)
            this.url = environment.baseUrl + "landing/" + data.data._id + '.' + data.data.type + "?" + Math.floor(Math.random() * 100) + 1
            console.log("url: ", this.url)
        }
    }

    ngOnInit() {
    }

    submitBtn() {
        this.landingService.createLanding(this.title, this.description, this.detail, this.title_sw, this.description_sw, this.detail_sw, this.file.name.substr(this.file.name.length - 3)).subscribe((res: any) => {
            let formData = new FormData();
            formData.append('file', this.file, res.data._id + '.' + this.file.name.substr(this.file.name.length - 3));
            console.log("creatLanding: ", res)
            this.landingService.upload(formData).subscribe(res => {
                console.log("upload: ", res)
                this.dialogRef.close({event: 'submit'})
            })
        })
    }

    editBtn() {
        let type = this.data.data.type
        if (this.file) {
            type = this.file.name.substr(this.file.name.length - 3)
        }
        this.landingService.updateLanding(this.data.data._id, this.title, this.description, this.detail, this.title_sw, this.description_sw, this.detail_sw, type).subscribe((res: any) => {
            console.log("editLanding: ", res)
            if (this.file) {
                let formData = new FormData();
                formData.append('file', this.file, res.data._id + '.' + type);
                this.landingService.upload(formData).subscribe(res => {
                    console.log("upload: ", res)
                })
            }
        })
        this.dialogRef.close({event: 'submit'})
    }

    closeBtn() {
        this.dialogRef.close({event: 'close'})
    }

    uploadFile(event) {
        this.file = event[0]
        console.log("file: ", this.file)
        const reader = new FileReader();
        reader.readAsDataURL(this.file); 
        reader.onload = (_event) => { 
            this.url = reader.result; 
        }
    }
    deleteAttachment() {
        this.url = null
    }

}
