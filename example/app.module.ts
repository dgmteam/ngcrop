import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { NgCropModule } from '../src'
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'angular2-modal'
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap'

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		NgCropModule,
		ModalModule.forRoot(),
		BootstrapModalModule,
	],

	declarations: [
		AppComponent,
	],

	bootstrap: [
		AppComponent,
	],
})
export class AppModule {}
