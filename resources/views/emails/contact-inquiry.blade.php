<x-mail::message>
# New contact inquiry

You received a new inquiry from **{{ $inquiry->name }}** ({{ $inquiry->email }}).

**Subject:** {{ $inquiry->subject }}

**Message:**

{{ $inquiry->message }}

<x-mail::button :url="'mailto:' . $inquiry->email">
Reply to {{ $inquiry->name }}
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
