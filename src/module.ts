import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ImageCropper } from './components/image-cropper/image-cropper.component'
import { InputImageCrop } from './components/input-image-crop/input-image-crop.component'
import { ImageCropperModal } from './components/input-image-crop/image-cropper-modal/image-cropper-modal.component'
import { ModalModule } from 'angular2-modal'

@NgModule({
	imports: [
		CommonModule,
		ModalModule,
	],

	declarations: [
		ImageCropper,
		ImageCropperModal,
		InputImageCrop,
	],

	exports: [
		ImageCropper,
		ImageCropperModal,
		InputImageCrop,
	],

	entryComponents: [
		ImageCropperModal,
	],
})
export class NgCropModule {

}
