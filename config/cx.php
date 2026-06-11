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
    | Invite link shown to users after they join the community via the form.
    |
    */

    'whatsapp_community_url' => env('WHATSAPP_COMMUNITY_URL', ''),

];
