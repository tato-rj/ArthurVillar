@modal(['title' => 'Settings', 'id' => 'settings-modal', 'size' => 'sm'])
<div>
	<div class="d-apart mb-3">
		<label>Sound effects</label>
		@toggle(['name' => 'sound', 'on' => true])
	</div>

	<div class="d-apart">
		<label>Time limit</label>
		@toggle(['name' => 'time_limit', 'on' => false])
	</div>
</div>
@endmodal