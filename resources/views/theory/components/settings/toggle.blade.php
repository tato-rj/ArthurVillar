<div class="d-apart mb-2">
  <label>
    {{$label}}
    @if($settings->hasBonus($name))
    <span style="font-size: 60%" class="align-top fw-bold text-blue" title="Enabling this will give you extra points">@fa(['icon' => 'gem', 'mr' => 1])bonus</span>
    @endif
  </label>
  @toggle(['name' => $name, 'on' => $settings->options($name), 'label' => null])

</div>