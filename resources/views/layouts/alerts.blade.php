@if($message = session('success'))
@alert([
    'color' => 'green',
    // 'headline' => 'Show',
    'message' => $message,
    'dismissible' => true,
    'countdown' => 4,
    'pos' => 'top',
    'animation' => ['in' => 'fadeInUp', 'out' => 'fadeOutDown']])
@endif

@if($message = session('status'))
@alert([
    'color' => 'green',
    // 'headline' => 'Show',
    'message' => $message,
    'dismissible' => true,
    'countdown' => 4,
    'pos' => 'top',
    'animation' => ['in' => 'fadeInUp', 'out' => 'fadeOutDown']])
@endif

@if($message = session('error') ?? $errors->first())
@alert([
    'color' => 'red',
    'headline' => 'Sorry',
    'message' => $message,
    'dismissible' => true,
    'countdown' => 4,
    'pos' => 'top',
    'animation' => ['in' => 'fadeInUp', 'out' => 'fadeOutDown']])
@endif

<div id="popup-success">
@alert([
    'color' => 'green',
    'hide' => true,
    'message' => '',
    'dismissible' => true,
    'pos' => 'top',
    'animation' => ['in' => 'fadeInUp', 'out' => 'fadeOutDown']])
</div>

<div id="popup-error">
@alert([
    'color' => 'red',
    'headline' => 'Sorry',
    'hide' => true,
    'message' => '',
    'dismissible' => true,
    'pos' => 'top',
    'animation' => ['in' => 'fadeInUp', 'out' => 'fadeOutDown']])
</div>