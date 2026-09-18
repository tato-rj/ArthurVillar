<div class="result-metric result-metric--{{$name}}">
    <div class="result-metric__label"><span class="result-metric__icon" aria-hidden="true">@fa</span>{{$title}}</div>
    <div class="result-metric__value"><span name="{{$name}}">{{$name === 'duration' ? '00:00' : '0'}}{{$name === 'accuracy' ? '%' : ''}}</span></div>
    @isset($detail)
        <div class="result-metric__detail">{{$detail}}</div>
    @endisset
</div>
