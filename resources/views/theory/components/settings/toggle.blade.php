<div class="d-apart mb-2">
  <label>
    {{$label}}
    @if($settings->hasBonus($name))
    <span style="font-size: 60%" class="align-top fw-bold text-grey" title="Enabling this will give you extra points">+xp</span>
    @endif
  </label>
  @toggle(['name' => $name, 'on' => $settings->options($name), 'label' => null])

</div>