class SimpleCropper
{
	constructor(params) {
		this.params = params;

		this.$imageInput = $(params.imageInput);
		this.$image = $(this.$imageInput.attr('data-target'));
		this.$placeholder = $(this.$imageInput.attr('data-placeholder'));
		this.$uploadButton = $(params.uploadButton);
		this.$confirmButton = $(params.confirmButton);
		this.$cancelButton = $(params.cancelButton);
		this.$submitButton = $(params.submitButton);
		this.defaultImage = this.$image.attr('src');
		this.ratio = params.hasOwnProperty('ratio') ? params.ratio : 16/9;

		this._createInputs();
	}

	create() {
		let obj = this;

		obj.$uploadButton.on('click', function() {
		  obj.$imageInput.click();
		});

		obj.$cancelButton.on('click', function() {
			obj._resetAll();
		});

		obj.$confirmButton.on('click', function() {
			obj._confirmImage();
		});

		obj.$imageInput.on('change', function(event) {
		  let target = $(this).attr('data-target');
		  let file = event.target.files[0];
		  let maxSize = 8000000;

		  if (file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
		    if (file.size < maxSize) {

		    	obj._selectImage(this, target);

			  	obj.$image.next('canvas').remove();
			  	obj.$image.show();

		    	obj._toggleButtons();

		    } else {
		      alert('This file is too large ('+formatBytes(file.size)+'). The max file size is '+formatBytes(maxSize)+'.');
		    }
		  } else {
		    alert('Only image files .jpg, .jpeg, .webp ou .png are accepted.');
		  }
		});
	}

	_toggleButtons() {
		let obj = this;

		obj.$uploadButton.toggle();
		obj.$cancelButton.toggle();
		obj.$confirmButton.toggle();
		obj.$submitButton.toggleAttr('disabled');
	}

	_selectImage(input, element) {
		let obj = this;

		if (input.files && input.files[0]) {
			let reader = new FileReader();

			reader.onload = function(e) {
				$(element).attr('src', e.target.result);

				if (obj._hasPlaceholder()) {
					obj.$image.show();
					obj.$placeholder.hide();
				} else {
					obj.$image.css('visibility', 'hidden');			
				}

				obj._enableCropper();
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	_confirmImage() {
		let obj = this;
		let $canvas = $(obj.cropper.getCroppedCanvas());
		$canvas.insertAfter(obj.$image);
		obj.cropper.destroy();
		obj.$image.hide();
		obj._toggleButtons();
	}

	_resetAll() {
		let obj = this;

		obj.$image.attr('src', obj.defaultImage);
		
		if (obj._hasPlaceholder()) {
			obj.$image.hide();
			obj.$placeholder.show();
		} else {
			obj.$image.css('visibility', 'visible');
		}

		obj.$imageInput.val(null);
		obj.cropper.destroy();
		obj._toggleButtons();
		$('.cropper-dimensions').remove();

		obj.$uploadButton.off('click');
		obj.$cancelButton.off('click');
		obj.$confirmButton.off('click');
		obj.$imageInput.off('change');

		(new SimpleCropper(obj.params)).create();
	}

	_enableCropper() {
		let obj = this;
		let image = document.getElementById('image');

		this.cropper = new Cropper(image, {
			aspectRatio: obj.ratio,
			viewMode: 1,
			movable: false,
			scalable: false,
			rotatable: false,
			zoomOnTouch: false,
			zoomOnWheel: false,
			crop(event) {
				$('input[name="cropped_width"]').val(event.detail.width);
				$('input[name="cropped_height"]').val(event.detail.height);
				$('input[name="cropped_x"]').val(event.detail.x);
				$('input[name="cropped_y"]').val(event.detail.y);
			},
		});
	}

	_createInputs() {
		this.$imageInput.after(
			'<input type="hidden" class="cropper-dimensions" name="cropped_width">',
			'<input type="hidden" class="cropper-dimensions" name="cropped_height">',
			'<input type="hidden" class="cropper-dimensions" name="cropped_x">',
			'<input type="hidden" class="cropper-dimensions" name="cropped_y">');
	}

	_hasPlaceholder() {
		return this.$placeholder.length;
	}
}

window.SimpleCropper = SimpleCropper;
