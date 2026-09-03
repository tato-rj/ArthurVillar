<div class="{{$grid ?? ''}}" data-student-payment-method>
    <input type="hidden" name="payment_method" value="{{$paymentMethod}}">
    <input type="hidden" name="payment_exempt" value="{{$paymentExempt ? '1' : '0'}}">

    @select(['label' => $label ?? null, 'placeholder' => $placeholder, 'name' => 'student_payment_method'])
        @foreach(payment()->methods() as $method)
            <option value="{{$method}}" {{iftrue(!$paymentExempt && $paymentMethod === $method, 'selected')}}>{{$method}}</option>
        @endforeach
        <option value="payment_exempt" {{iftrue($paymentExempt, 'selected')}}>Payment exempt</option>
    @endselect
    @feedback(['input' => 'payment_method'])
</div>
