<?php

namespace App\Services;

class HtmlSanitizer
{
    private const ALLOWED_TAGS = '<p><br><strong><b><em><i><u><s><strike><h1><h2><h3><h4><h5><h6><ul><ol><li><blockquote><pre><code><a><img><hr><span><div><table><thead><tbody><tr><th><td><mark>';

    public static function clean(string $html): string
    {
        $html = strip_tags($html, self::ALLOWED_TAGS);
        $html = preg_replace('/ on\w+="[^"]*"/i', '', $html) ?? $html;
        $html = preg_replace("/ on\w+='[^']*'/i", '', $html) ?? $html;
        $html = preg_replace('/javascript\s*:/i', '', $html) ?? $html;

        return trim($html);
    }
}
