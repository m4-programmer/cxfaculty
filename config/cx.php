<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Owner Email
    |--------------------------------------------------------------------------
    |
    | Contact inquiries from the landing page are sent to this address.
    |
    */

    'owner_email' => env('CX_OWNER_EMAIL', env('MAIL_FROM_ADDRESS', 'hello@example.com')),

    /*
    |--------------------------------------------------------------------------
    | WhatsApp Community URL
    |--------------------------------------------------------------------------
    |
    | Fallback when not set in Admin → Landing page → WhatsApp & community.
    |
    */

    'whatsapp_community_url' => env('WHATSAPP_COMMUNITY_URL', ''),

    /*
    |--------------------------------------------------------------------------
    | WhatsApp Scheduling URL
    |--------------------------------------------------------------------------
    |
    | Fallback when not set in Admin → Landing page → WhatsApp & community.
    |
    */

    'whatsapp_scheduling_url' => env('WHATSAPP_SCHEDULING_URL', ''),

];
