<div class="form-group">
  <div id="upload-box">
    <input type="file" data-target="#image" data-placeholder="#placeholder" id="image-input" name="cover" style="display:none;" />

    <div class="position-relative avatar-container">

    <div class="position-relative mx-auto" style="width: 200px">
      <div>
        @isset($recording)
        <img class="w-100 rounded" id="image" src="{{$recording->file('cover')}}">
        @else
        <img class="w-100" id="image" style="display: none;">
        <div class="w-100 rounded" id="placeholder" style="height: 200px; background: rgba(0,0,0,0.04)"></div>
        @endisset
      </div>
      <div id="upload-button">
        <button type="button" class="text-white btn-raw rounded-circle d-center position-absolute-center opacity-8" style="width: 80px; height: 80px; z-index: 1; font-size: 1.8rem; background: rgba(0,0,0,0.2);">@fa(['icon' => 'camera', 'mr' => 0])
        </button>
      </div>
    </div>
      
      <div class="controls text-center mt-2">
        <button type="button" id="cancel-button" style="display: none" class="btn btn-sm btn-red py-0">
          <i class="fas fa-times"></i>
        </button>
        <button type="button" id="confirm-button" style="display: none" class="btn btn-sm btn-green py-0">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</div>