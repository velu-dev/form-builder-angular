import { Component } from '@angular/core';
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Pipe({
  name: 'sanitizeHtml'
})
export class AppComponent {
  dropOverActive: boolean = false;
  formFields: any = [{"field": "<input type='text' name='text-input'>", name: "Text Field"},{"field" : "<textarea></textarea>", 'name': 'Text Area'}]
  droppedData: string = '';
  newForm: any = []
  constructor(private sanitizer:DomSanitizer) { }
  onDrop({ dropData }: { dropData: any }): void {
    console.log(dropData)
    this.dropOverActive = false;
    this.droppedData = dropData;
    this.formFields.map(res => {
      if (res.name == dropData){
        this.newForm.push(this.transform(res.field))
      }
    })
    // setTimeout(() => {
    //   this.droppedData = '';
    // }, 2000);
  }
  transform(v:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
