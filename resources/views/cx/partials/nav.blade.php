<nav class="cx-nav" id="cx-nav">
    <a href="{{ route('home') }}" class="cx-nav-logo">
        <img src="/logo.png" alt="The CX Faculty">
    </a>
    <ul class="cx-nav-links">
        <li><a href="{{ route('home') }}#services">Services</a></li>
        <li><a href="{{ route('home') }}#process">Our Approach</a></li>
        <li><a href="{{ route('home') }}#why">Why Us</a></li>
        <li><a href="{{ route('home') }}#industries">Industries</a></li>
        <li><a href="{{ route('blog.index') }}">Blog</a></li>
    </ul>
    <a href="{{ route('home') }}#contact" class="cx-nav-cta">{{ $cxShell['nav']['cta_label'] }}</a>
</nav>
