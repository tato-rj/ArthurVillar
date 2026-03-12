<div class="d-apart mb-2">
  <label>{{$label}}</label>
  @toggle(['name' => $name, 'on' => $settings->options($name), 'label' => null])
</div>