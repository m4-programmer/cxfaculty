<?php

namespace App\View\Composers;

use App\Models\LandingPage;
use App\Models\SiteSetting;
use App\Support\WhatsAppUrl;
use Illuminate\View\View;

class CxSiteComposer
{
    public function compose(View $view): void
    {
        $landing = LandingPage::current()->resolvedContent();
        $integrations = SiteSetting::integrations();
        $appearance = SiteSetting::appearance();
        $scripts = SiteSetting::scripts();

        $view->with([
            'cxShell' => [
                'nav' => $landing['nav'],
                'footer' => $landing['footer'],
            ],
            'cxIntegrations' => $integrations,
            'whatsappSchedulingUrl' => $integrations['whatsapp_scheduling_url'],
            'discoveryCallUrl' => WhatsAppUrl::build(
                $integrations['whatsapp_scheduling_url'],
                $integrations['discovery_call_message'],
            ),
            'conversationUrl' => WhatsAppUrl::build(
                $integrations['whatsapp_scheduling_url'],
                $integrations['conversation_message'],
            ),
            'siteAppearance' => $appearance,
            'siteScripts' => $scripts,
            'siteLogo' => $appearance['logo'],
            'blogTheme' => $appearance['blog'],
            'applyBlogTheme' => request()->routeIs('blog.*'),
        ]);
    }
}
