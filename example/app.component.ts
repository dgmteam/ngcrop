import { Component, ViewContainerRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Overlay } from 'angular2-modal'

@Component({
	selector: 'app',
	providers: [  ],
	// styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.jade',
})
export class AppComponent {
	private form: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		overlay: Overlay,
		vcr: ViewContainerRef,
	) {
		overlay.defaultViewContainer = vcr
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			image: [],
		})
	}

	ngOnDestroy() {
	}
}
