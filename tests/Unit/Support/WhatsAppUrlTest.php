<?php

namespace Tests\Unit\Support;

use App\Support\WhatsAppUrl;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class WhatsAppUrlTest extends TestCase
{
    #[Test]
    public function it_returns_contact_anchor_when_base_url_is_empty(): void
    {
        $this->assertSame('#contact', WhatsAppUrl::build('', 'Hello'));
    }

    #[Test]
    public function it_returns_base_url_when_message_is_empty(): void
    {
        $this->assertSame('https://wa.me/15551234567', WhatsAppUrl::build('https://wa.me/15551234567'));
    }

    #[Test]
    public function it_appends_message_as_query_parameter(): void
    {
        $url = WhatsAppUrl::build('https://wa.me/15551234567', 'Hi, I want a discovery call.');

        $this->assertStringStartsWith('https://wa.me/15551234567?', $url);
        $this->assertStringContainsString('text=Hi%2C+I+want+a+discovery+call.', $url);
    }
}
