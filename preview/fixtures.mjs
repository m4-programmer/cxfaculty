/**
 * Static preview fixtures for Vercel demo deployments.
 * Edit this file to change what your client sees in the preview build.
 */

const now = new Date().toISOString();
const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

const landingContent = {
    seo: {
        title: 'CX Faculty | Customer Experience Consulting',
        description:
            'CX Faculty helps teams transform customer experience with strategy, content, and a modern blog CMS.',
    },
    hero: {
        badge: 'Customer Experience Strategy',
        headline: 'Transform your customer experience with clean design, smarter content, and a real CMS.',
        description:
            'CX Faculty blends thoughtful brand storytelling, mobile-first responsiveness, and a built-in blog + admin workflow so your next launch feels modern, fast, and easy to manage.',
        cards: [
            {
                label: 'Refinement',
                description:
                    'Clean interface and focused messaging make every interaction feel premium and easy to digest.',
            },
            {
                label: 'Performance',
                description: 'Optimized React and Tailwind tooling keeps the site fast and resilient under load.',
            },
        ],
        cta_consultation: 'Request a consultation',
        cta_community: 'Join community',
        cta_blog: 'Explore the blog',
    },
    sidebar: {
        enabled: true,
        eyebrow: 'What we do',
        headline: 'A boutique, results-driven customer experience studio.',
        description:
            'Build trust with polished digital content, launch a blog to attract the right audience, and manage updates through a lightweight admin workflow.',
    },
    services: {
        enabled: true,
        eyebrow: 'Refinement + strategy',
        headline: 'From insight to launch, every detail is polished for modern CX.',
        items: [
            {
                title: 'Brand clarity',
                description: 'Position your offerings with messaging that turns visitors into clients.',
            },
            {
                title: 'Performance',
                description: 'Optimized front-end flows keep the site responsive and lightweight.',
            },
            {
                title: 'CMS-ready workflow',
                description:
                    'Create and manage blog posts with secure admin access and a simple publishing pipeline.',
            },
        ],
    },
    blog: {
        enabled: true,
        eyebrow: 'Latest insights',
        headline: 'Blog posts that make your CX story easier to share.',
        cta: 'View all posts',
        empty_message: 'No published articles yet. Create your first post in the admin panel.',
    },
    contact: {
        enabled: true,
        eyebrow: 'Contact & inquiries',
        headline: "Let's talk about your next customer experience launch.",
        description:
            "Send a message and we'll follow up with a proposal for content, blog strategy, or admin setup.",
        submit_label: 'Send inquiry',
    },
};

const samplePosts = [
    {
        title: 'Launching a customer-first experience in 30 days',
        excerpt:
            'A practical roadmap for tuning your web presence, content, and blog workflow around customer experience.',
        slug: 'launching-a-customer-first-experience-in-30-days',
        published_at: now,
        featured_image: null,
        tags: ['customer experience', 'strategy', 'launch'],
        reading_time: 3,
        views: 128,
    },
    {
        title: 'How to build a content engine that scales',
        excerpt: 'Learn how to create a repeatable content workflow with a modern CMS and rich editor for your team.',
        slug: 'how-to-build-a-content-engine-that-scales',
        published_at: threeDaysAgo,
        featured_image: null,
        tags: ['content', 'cms', 'blogging'],
        reading_time: 4,
        views: 94,
    },
];

const adminUser = {
    name: 'Admin User',
    email: 'admin@example.com',
    is_admin: true,
};

function baseProps(authUser = null) {
    return {
        name: 'CX Faculty',
        auth: { user: authUser },
        flash: { success: null, communityJoined: false },
        sidebarOpen: true,
    };
}

function paginate(items, path = '/blog') {
    return {
        data: items,
        links: [
            { url: null, label: '&laquo; Previous', active: false },
            { url: `${path}?page=1`, label: '1', active: true },
            { url: null, label: 'Next &raquo;', active: false },
        ],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 12,
            total: items.length,
        },
    };
}

/** @type {Array<{ url: string, component: string, title: string, props: Record<string, unknown> }>} */
export const previewPages = [
    {
        url: '/',
        component: 'welcome',
        title: 'CX Faculty | Customer Experience Consulting',
        props: {
            ...baseProps(),
            landing: landingContent,
            featuredPosts: samplePosts,
        },
    },
    {
        url: '/blog',
        component: 'blog/index',
        title: 'Blog | CX Faculty',
        props: {
            ...baseProps(),
            posts: paginate(samplePosts),
            filters: {},
            popularTags: ['customer experience', 'strategy', 'content', 'cms', 'blogging', 'launch'],
            totalPublished: samplePosts.length,
        },
    },
    {
        url: '/blog/launching-a-customer-first-experience-in-30-days',
        component: 'blog/show',
        title: 'Launching a customer-first experience in 30 days | CX Faculty',
        props: {
            ...baseProps(),
            post: {
                title: samplePosts[0].title,
                excerpt: samplePosts[0].excerpt,
                body: '<h2>Start with the customer journey</h2><p>Start by auditing the experience, then map every touchpoint from the first visit through support. Publish thoughtful articles that educate your audience and build trust at every stage.</p><p>Use clear headlines, fast page loads, and mobile-friendly sections so your messaging converts across devices.</p><ul><li>Audit your current touchpoints</li><li>Define your content pillars</li><li>Launch with a focused blog strategy</li></ul>',
                slug: samplePosts[0].slug,
                published_at: samplePosts[0].published_at,
                featured_image: null,
                tags: samplePosts[0].tags,
                reading_time: samplePosts[0].reading_time,
                views: samplePosts[0].views,
                is_published: true,
                author: { name: 'Admin User' },
            },
            relatedPosts: [samplePosts[1]],
            relatedPostsHeading: 'Related articles',
            seo: {
                canonical: '/blog/launching-a-customer-first-experience-in-30-days',
                ogImage: '/images/og-image.png',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: samplePosts[0].title,
                    description: samplePosts[0].excerpt,
                },
            },
        },
    },
    {
        url: '/community/join',
        component: 'community/join',
        title: 'Join the Community | CX Faculty',
        props: {
            ...baseProps(),
            whatsappCommunityUrl: 'https://chat.whatsapp.com/example-invite-link',
        },
    },
    {
        url: '/login',
        component: 'auth/login',
        title: 'Log in',
        props: {
            ...baseProps(),
            status: undefined,
            canResetPassword: true,
        },
    },
    {
        url: '/dashboard',
        component: 'dashboard',
        title: 'Dashboard',
        props: {
            ...baseProps(adminUser),
            stats: {
                totalPosts: 2,
                publishedPosts: 2,
                draftPosts: 0,
                totalViews: 222,
                unreadInquiries: 1,
                totalInquiries: 3,
            },
            recentPosts: samplePosts.map((post) => ({
                title: post.title,
                slug: post.slug,
                is_published: true,
                published_at: post.published_at,
                updated_at: post.published_at,
            })),
            recentInquiries: [
                {
                    id: 1,
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    subject: 'Consulting request',
                    read_at: null,
                    created_at: now,
                },
            ],
        },
    },
    {
        url: '/admin/landing',
        component: 'admin/landing/edit',
        title: 'Landing Page | Admin',
        props: {
            ...baseProps(adminUser),
            content: landingContent,
        },
    },
    {
        url: '/admin/posts',
        component: 'admin/posts/index',
        title: 'Blog Posts | Admin',
        props: {
            ...baseProps(adminUser),
            posts: {
                data: samplePosts.map((post, index) => ({
                    id: index + 1,
                    title: post.title,
                    excerpt: post.excerpt,
                    slug: post.slug,
                    published_at: post.published_at,
                    is_published: true,
                    tags: post.tags.join(', '),
                    featured_image: post.featured_image,
                    reading_time: post.reading_time,
                })),
                links: [
                    { url: null, label: '&laquo; Previous', active: false },
                    { url: '/admin/posts?page=1', label: '1', active: true },
                    { url: null, label: 'Next &raquo;', active: false },
                ],
            },
            filters: {},
        },
    },
];

export const previewNavLinks = previewPages.map((page) => ({
    url: page.url,
    label: page.title.split('|')[0].trim(),
}));
