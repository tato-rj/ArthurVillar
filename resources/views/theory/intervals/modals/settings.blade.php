@modal(['title' => 'Settings', 'id' => 'settings-modal', 'size' => 'sm'])
<div>
	<div class="d-apart">
		<label>Sound effects</label>
		@toggle(['name' => 'sound', 'on' => true])
	</div>
</div>
@endmodal