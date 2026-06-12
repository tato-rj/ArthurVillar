<div class="d-apart mb-2">
  <label>
    @isset($icon)
    @fa(['icon' => $icon, 'mr' => 1, 'fa_color' => 'blue opacity-6'])
    @endisset
    {{$label}}
  </label>
  @toggle(['name' => $name, 'on' => $settings->options($name), 'label' => null])
</div>