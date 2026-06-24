<?php

namespace App\Support;

class WhatsAppUrl
{
    public static function build(string $baseUrl, ?string $message = null): string
    {
        if ($baseUrl === '') {
            return '#contact';
        }

        if ($message === null || $message === '') {
            return $baseUrl;
        }

        $parts = parse_url($baseUrl);

        if ($parts === false) {
            return $baseUrl;
        }

        $query = [];

        if (isset($parts['query'])) {
            parse_str($parts['query'], $query);
        }

        $query['text'] = $message;

        $scheme = isset($parts['scheme']) ? $parts['scheme'].'://' : '';
        $host = $parts['host'] ?? '';
        $port = isset($parts['port']) ? ':'.$parts['port'] : '';
        $user = $parts['user'] ?? '';
        $pass = isset($parts['pass']) ? ':'.$parts['pass'] : '';
        $pass = ($user || $pass) ? "$pass@" : '';
        $path = $parts['path'] ?? '';
        $fragment = isset($parts['fragment']) ? '#'.$parts['fragment'] : '';

        return $scheme.$user.$pass.$host.$port.$path.'?'.http_build_query($query).$fragment;
    }
}
