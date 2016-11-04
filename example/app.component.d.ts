import { ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Overlay } from 'angular2-modal';
export declare class AppComponent {
    private formBuilder;
    private form;
    constructor(formBuilder: FormBuilder, overlay: Overlay, vcr: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
