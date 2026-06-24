@props([
    'lines',
    'emphasis' => null,
    'class' => 'cx-headline',
    'centered' => false,
])

<h2 class="{{ $class }}" @if($centered) style="text-align: center" @endif>
    @foreach ($lines as $line)
        {{ $line }}<br>
    @endforeach
    @if ($emphasis)
        <em>{{ $emphasis }}</em>
    @endif
</h2>
