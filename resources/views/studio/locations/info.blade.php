@modal(['title' => 'Location details', 'id' => 'location-info-modal'])
<div>
    <h3 id="location-info-name" class="h5 mb-3"></h3>

    <div class="row mb-3">
        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Students</div>
            <div id="location-info-students-count" class="h4 mb-0"></div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Avg length</div>
            <div id="location-info-average-length" class="h4 mb-0"></div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Avg fee</div>
            <div id="location-info-average-fee" class="h4 mb-0"></div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Weekly gross</div>
            <div id="location-info-weekly-gross" class="h4 mb-0"></div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Weekly net</div>
            <div id="location-info-weekly-net" class="h4 mb-0"></div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">Monthly net</div>
            <div id="location-info-monthly-net" class="h4 mb-0"></div>
        </div>
    </div>

    <div class="mb-3">
        @fa(['icon' => 'percent', 'classes' => 'opacity-4'])
        <span id="location-info-tax"></span>
    </div>

    <div class="font-weight-bold mb-2">Current lesson plans</div>
    <div id="location-info-lessons" class="studio-break-lessons"></div>
</div>
@endmodal