import { Component, ComponentFactoryResolver, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-page-popup',
  templateUrl: './page-popup.component.html',
  styleUrls: ['./page-popup.component.scss']
})
export class PagePopupComponent implements OnInit {
  // @Input() bodyComponent: Type<any>;
  // @Input() bodyComponentInputs: Record<string, any> = {}
  @ViewChild('contentPlaceholder', { read: ViewContainerRef, static: true })
  contentPlaceholderRef;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<PagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
        bodyComponent: Type<any>,
        bodyComponentInputs: Record<string, any>
      }
      ) { }

  ngOnInit(): void {
    this.loadBodyComponent()
  }

  loadBodyComponent() {
    const companyFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.data.bodyComponent
    );
    this.contentPlaceholderRef.clear();
    const newComponent=this.contentPlaceholderRef.createComponent(companyFactory);
    Object.entries(this.data.bodyComponentInputs).forEach(
      ([key, value]: [string, any]) => {
        newComponent.instance[key] = value;
      }
    );
    newComponent.instance.processComplete.subscribe(r => {
      this.dialogRef.close();
    });
  }

}
