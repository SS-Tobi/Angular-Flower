import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { environment } from "../../../../environments/environment";
import { ColorService } from 'app/services/color.service';
@Component({
  selector: "color-modal",
  templateUrl: "./color-modal.component.html",
  styleUrls: ["./color-modal.component.scss"],
})
export class ColorModalComponent implements OnInit {

    files: any = [];
    urls: any = [];
    isReset: any = false

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ColorModalComponent>,
        public colorService: ColorService
    ) {
        console.log("dataPass: ", data)
        if (data.data.type.length != 0) {
            data.data.type.forEach((element, i) => {
                this.urls.push(environment.baseUrl + "color/" + data.data._id + '_' + i + '.' + element + "?" + Math.floor(Math.random() * 100) + 1)
            });
            console.log("urls: ", this.urls)
        } else {
            this.isReset = true
        }
    }

    ngOnInit() {
    }

    // submitBtn() {
    //     let type = []
    //     this.files.forEach((element, i) => {
    //         if (element.name.substr(element.name.length - 3) == 'jpg') {
    //             type.push("jpg")
    //         } else if (element.name.substr(element.name.length - 3) == 'png') {
    //             type.push("png")
    //         }
    //     });
    //     console.log("type: ", type)
    //     console.log("files, ", this.files)
    //     this.styleService.createStyle(this.name, type).subscribe((res: any) => {
    //         let formData = new FormData();
    //         this.files.forEach((element, i) => {
    //             if (element.name.substr(element.name.length - 3) == 'jpg') {
    //               formData.append('file[]', element, res.data._id + '_' + i + '.jpg');
    //             } else if (element.name.substr(element.name.length - 3) == 'png') {
    //               formData.append('file[]', element, res.data._id + '_' + i + '.png');
    //             }
    //         });
    //         console.log("createStyle: ", res)
    //         console.log("formData: ", formData)
    //         this.styleService.uploadStyle(formData).subscribe(res => {
    //             console.log("upload: ", res)
    //             this.dialogRef.close({event: 'submit'})
    //         })
    //     })
    // }

    editBtn() {
        let type = this.data.data.type
        if (this.isReset) {
            type = []
            this.files.forEach((element, i) => {
                if (element.name.substr(element.name.length - 3) == 'jpg') {
                    type.push("jpg")
                } else if (element.name.substr(element.name.length - 3) == 'png') {
                    type.push("png")
                }
            });
        }
        this.colorService.updateColor(this.data.data._id, type).subscribe((res: any) => {
            console.log("updateStyle: ", res)
            if (this.isReset) {
                let formData = new FormData();
                this.files.forEach((element, i) => {
                    if (element.name.substr(element.name.length - 3) == 'jpg') {
                    formData.append('file[]', element, res.data._id + '_' + i + '.jpg');
                    } else if (element.name.substr(element.name.length - 3) == 'png') {
                    formData.append('file[]', element, res.data._id + '_' + i + '.png');
                    }
                });
                this.colorService.uploadColor(formData).subscribe(res => {
                    console.log("upload: ", res)
                })
            }
        })
        this.dialogRef.close({event: 'submit'})
    }

    closeBtn() {
        this.dialogRef.close({event: 'close'})
    }

    resetImageBtn() {
        this.isReset = true
        this.files = []
        this.urls = []
    }

    // uploadFile(event) {
    //     this.file = event[0]
    //     console.log("file: ", this.file)
    //     const reader = new FileReader();
    //     reader.readAsDataURL(this.file); 
    //     reader.onload = (_event) => { 
    //         this.url = reader.result; 
    //     }
    // }
    // deleteAttachment() {
    //     this.url = null
    // }

    uploadFile(event) {
        if (this.urls.length == 4) {
            return
        } 
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element)
            const reader = new FileReader();
            reader.readAsDataURL(element); 
            reader.onload = (_event) => { 
                this.urls.push(reader.result); 
            }
        }  
    }
    deleteAttachment(index) {
        this.files.splice(index, 1)
        this.urls.splice(index, 1)
    }

}
