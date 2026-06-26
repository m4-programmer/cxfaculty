<footer class="cx-footer">
    <div class="cx-footer-grid">
        <div class="cx-footer-brand">
            <img src="{{ $siteLogo['url'] }}" alt="The CX Faculty">
            <p>{{ $cxShell['footer']['brand_description'] }}</p>
        </div>
        <div class="cx-footer-col">
            <h5>Services</h5>
            <ul>
                @foreach ($cxShell['footer']['service_links'] as $link)
                    <li><a href="{{ $link['href'] }}">{{ $link['label'] }}</a></li>
                @endforeach
            </ul>
        </div>
        <div class="cx-footer-col">
            <h5>Company</h5>
            <ul>
                @foreach ($cxShell['footer']['company_links'] as $link)
                    <li>
                        @if (str_starts_with($link['href'], '/') && ! str_starts_with($link['href'], '/#'))
                            <a href="{{ url($link['href']) }}">{{ $link['label'] }}</a>
                        @else
                            <a href="{{ $link['href'] }}">{{ $link['label'] }}</a>
                        @endif
                    </li>
                @endforeach
            </ul>
        </div>
        <div class="cx-footer-col">
            <h5>Connect</h5>
            <ul>
                @foreach ($cxShell['footer']['connect_links'] as $link)
                    <li><a href="{{ $link['href'] }}">{{ $link['label'] }}</a></li>
                @endforeach
            </ul>
        </div>
    </div>
    <div class="cx-footer-bottom">
        <p>{{ $cxShell['footer']['copyright'] }}</p>
        <p>
            {{ explode('♦', $cxShell['footer']['tagline'])[0] ?? '' }}<span>♦</span>{{ explode('♦', $cxShell['footer']['tagline'])[1] ?? '' }}
        </p>
    </div>
</footer>
