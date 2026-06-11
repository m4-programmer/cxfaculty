<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingPage extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'content',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'content' => 'array',
        ];
    }

    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'content' => static::defaultContent(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function resolvedContent(): array
    {
        return array_replace_recursive(static::defaultContent(), $this->content ?? []);
    }

    /**
     * @return array<string, mixed>
     */
    public static function defaultContent(): array
    {
        return [
            'seo' => [
                'title' => 'CX Faculty | Customer Experience Consulting',
                'description' => 'CX Faculty helps teams transform customer experience with strategy, content, and a modern blog CMS.',
            ],
            'hero' => [
                'badge' => 'Customer Experience Strategy',
                'headline' => 'Transform your customer experience with clean design, smarter content, and a real CMS.',
                'description' => 'CX Faculty blends thoughtful brand storytelling, mobile-first responsiveness, and a built-in blog + admin workflow so your next launch feels modern, fast, and easy to manage.',
                'cards' => [
                    [
                        'label' => 'Refinement',
                        'description' => 'Clean interface and focused messaging make every interaction feel premium and easy to digest.',
                    ],
                    [
                        'label' => 'Performance',
                        'description' => 'Optimized React and Tailwind tooling keeps the site fast and resilient under load.',
                    ],
                ],
                'cta_consultation' => 'Request a consultation',
                'cta_community' => 'Join community',
                'cta_blog' => 'Explore the blog',
            ],
            'sidebar' => [
                'enabled' => true,
                'eyebrow' => 'What we do',
                'headline' => 'A boutique, results-driven customer experience studio.',
                'description' => 'Build trust with polished digital content, launch a blog to attract the right audience, and manage updates through a lightweight admin workflow.',
            ],
            'services' => [
                'enabled' => true,
                'eyebrow' => 'Refinement + strategy',
                'headline' => 'From insight to launch, every detail is polished for modern CX.',
                'items' => [
                    [
                        'title' => 'Brand clarity',
                        'description' => 'Position your offerings with messaging that turns visitors into clients.',
                    ],
                    [
                        'title' => 'Performance',
                        'description' => 'Optimized front-end flows keep the site responsive and lightweight.',
                    ],
                    [
                        'title' => 'CMS-ready workflow',
                        'description' => 'Create and manage blog posts with secure admin access and a simple publishing pipeline.',
                    ],
                ],
            ],
            'blog' => [
                'enabled' => true,
                'eyebrow' => 'Latest insights',
                'headline' => 'Blog posts that make your CX story easier to share.',
                'cta' => 'View all posts',
                'empty_message' => 'No published articles yet. Create your first post in the admin panel.',
            ],
            'contact' => [
                'enabled' => true,
                'eyebrow' => 'Contact & inquiries',
                'headline' => 'Let\'s talk about your next customer experience launch.',
                'description' => 'Send a message and we\'ll follow up with a proposal for content, blog strategy, or admin setup.',
                'submit_label' => 'Send inquiry',
            ],
        ];
    }
}
