/**
 * Static preview fixtures for Vercel demo deployments.
 * Edit this file to change what your client sees in the preview build.
 */

const now = new Date().toISOString();
const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

const landingContent = {
    seo: {
        title: 'The CX Faculty — Customer Experience Consulting',
        description:
            'The CX Faculty combines insight, strategy, and guided execution to turn customer experience into measurable, sustainable results.',
    },
    nav: { cta_label: 'Get in Touch' },
    hero: {
        eyebrow: 'World-Class CX Strategy',
        headline_lines: ['Experience', 'is the'],
        headline_emphasis: 'New Edge.',
        description:
            'We combine insight, strategy, and guided execution to turn customer experience into measurable, sustainable results.',
        stats: [
            { value: '200+', label: 'Organisations Served' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '15+', label: 'Years Combined Expertise' },
            { value: '3×', label: 'Average CX ROI Delivered' },
        ],
        cta_primary: 'Explore Services',
        cta_secondary: 'Our Approach',
    },
    ticker: {
        enabled: true,
        items: [
            'CX Strategy',
            'Customer Journey Mapping',
            'CX Training & Capability Building',
            'CX Recruitment',
            'Experience Design',
            'Voice of Customer',
            'CX Transformation',
        ],
    },
    philosophy: {
        enabled: true,
        eyebrow: 'Our Philosophy',
        headline_lines: ['CX is not a', 'department —', "it's a"],
        headline_emphasis: 'discipline.',
        paragraphs: [
            'At The CX Faculty, we believe exceptional customer experience is the most defensible competitive advantage available to any organisation. It cannot be copied. It must be built.',
            'We partner with leaders who understand that experience drives loyalty, loyalty drives revenue, and revenue rewards organisations that put the customer at the centre of every decision.',
        ],
        pillars: [
            {
                number: '01',
                title: 'Insight-Led',
                description:
                    'Every engagement begins with deep diagnostic work — understanding your customers, your teams, and your gaps before prescribing solutions.',
            },
            {
                number: '02',
                title: 'Strategy-Driven',
                description:
                    'We translate insights into clear, actionable CX strategies that align with your business objectives and are built to last.',
            },
            {
                number: '03',
                title: 'Execution-Guided',
                description:
                    "We don't just hand over a report. We work alongside your teams to ensure strategy becomes reality — and results become visible.",
            },
            {
                number: '04',
                title: 'Results-Obsessed',
                description:
                    'Our success is measured in your outcomes. We track, iterate, and optimise until the numbers move in the right direction.',
            },
        ],
    },
    services: {
        enabled: true,
        eyebrow: 'What We Do',
        headline_lines: ['Three practices.'],
        headline_emphasis: 'One mission.',
        description:
            'Our services are designed to address every dimension of your customer experience challenge — from building internal capability, to shaping strategy, to finding the talent that will sustain it all.',
        items: [
            {
                number: 'Service — 01',
                title: 'CX Training',
                description:
                    'We build the internal capability your organisation needs to deliver consistently excellent experiences — from frontline teams to the C-suite.',
                features: [
                    'CX foundations & culture programmes',
                    'Journey mapping workshops',
                    'Customer-centric leadership coaching',
                    'Bespoke in-house academies',
                    'Certification pathways',
                ],
                cta_label: 'Enquire Now',
            },
            {
                number: 'Service — 02',
                title: 'CX Consultation',
                description:
                    'Strategic consulting that turns your customer experience challenges into clear roadmaps with measurable milestones and accountable owners.',
                features: [
                    'CX audits & gap analysis',
                    'Experience strategy design',
                    'Voice of Customer programmes',
                    'CX metrics & measurement frameworks',
                    'Transformation roadmapping',
                ],
                cta_label: 'Enquire Now',
            },
            {
                number: 'Service — 03',
                title: 'CX Recruitment',
                description:
                    'We connect organisations with the CX professionals who will build, lead, and sustain world-class customer experience functions.',
                features: [
                    'Senior CX leadership search',
                    'CX team building & structure design',
                    'CX competency frameworks',
                    'Interim CX leadership',
                    'CX talent assessment',
                ],
                cta_label: 'Enquire Now',
            },
        ],
    },
    process: {
        enabled: true,
        eyebrow: 'Our Approach',
        headline: 'From',
        headline_emphasis: 'diagnosis to delivery.',
        description:
            'A rigorous, repeatable process that ensures every engagement delivers lasting value.',
        steps: [
            {
                number: '01',
                title: 'Discover',
                description:
                    'Deep-dive diagnostics to understand your current state, customer expectations, and competitive landscape.',
            },
            {
                number: '02',
                title: 'Strategise',
                description:
                    'Co-create a CX strategy that is ambitious, achievable, and anchored in your specific context and goals.',
            },
            {
                number: '03',
                title: 'Execute',
                description:
                    'Guided implementation with hands-on support to ensure strategy translates into real-world action.',
            },
            {
                number: '04',
                title: 'Optimise',
                description:
                    'Continuous measurement, learning, and refinement to protect and compound the gains delivered.',
            },
        ],
    },
    manifesto: {
        enabled: true,
        quote: 'Every interaction is a moment of truth.',
        quote_emphasis: 'We help you win them all.',
        attribution: '— The CX Faculty',
    },
    why: {
        enabled: true,
        eyebrow: 'Why The CX Faculty',
        headline_lines: ['Built by', 'practitioners,', 'for'],
        headline_emphasis: 'leaders.',
        description:
            'We are not theorists. Every member of The CX Faculty has led CX transformation from the inside — which means we understand not just what to do, but how to get it done within the complexity of real organisations.',
        cta_label: 'Start a Conversation',
        cards: [
            {
                title: 'Practitioner Expertise',
                description:
                    'Real-world experience leading CX change inside complex organisations across multiple industries.',
            },
            {
                title: 'Measurable Results',
                description:
                    'We set success metrics at the start and hold ourselves accountable to delivering against them.',
            },
            {
                title: 'End-to-End Capability',
                description:
                    'From strategy through training to talent — the only CX firm that covers the full transformation lifecycle.',
            },
            {
                title: 'Speed to Value',
                description:
                    'We move fast. Our frameworks are proven, our process is efficient, and our teams are ready to deploy.',
            },
        ],
    },
    industries: {
        enabled: true,
        eyebrow: 'Sectors We Serve',
        headline_lines: ['Deep expertise across'],
        headline_emphasis: 'industries that matter.',
        items: [
            'Financial Services & Banking',
            'Telecommunications',
            'Retail & E-Commerce',
            'Healthcare & Life Sciences',
            'Hospitality & Travel',
            'Public Sector & Government',
            'Energy & Utilities',
            'Insurance',
            'Technology & SaaS',
        ],
    },
    cta_strip: {
        enabled: true,
        headline: 'Ready to transform your customer experience?',
        description:
            "Let's start with a conversation about where you are and where you want to be. No obligation, no jargon — just honest insight.",
        button_label: 'Book a Discovery Call',
    },
    blog: {
        enabled: true,
        eyebrow: 'Latest Insights',
        headline: 'Stories and frameworks',
        headline_emphasis: 'from the front lines of CX.',
        cta: 'View all posts',
        empty_message: 'No published articles yet. Create your first post in the admin panel.',
    },
    community: {
        enabled: true,
        eyebrow: 'Join the Community',
        headline: 'Connect with CX leaders',
        description:
            'Join a growing community of customer experience professionals sharing ideas, frameworks, and practical lessons from the field.',
        cta_label: 'Join the Community',
    },
    contact: {
        enabled: true,
        eyebrow: 'Contact & Inquiries',
        headline: "Let's talk about your next customer experience launch.",
        description:
            "Send a message and we'll follow up with a proposal for training, consultation, recruitment, or a broader CX transformation programme.",
        submit_label: 'Send inquiry',
    },
    footer: {
        brand_description:
            'Combining insight, strategy, and guided execution to turn experience into results. Your partner in building world-class CX capability.',
        copyright: '© 2025 The CX Faculty. All rights reserved.',
        tagline: 'Crafted with ♦ for extraordinary experiences.',
        service_links: [
            { label: 'CX Training', href: '#services' },
            { label: 'CX Consultation', href: '#services' },
            { label: 'CX Recruitment', href: '#services' },
        ],
        company_links: [
            { label: 'About Us', href: '#why' },
            { label: 'Our Approach', href: '#process' },
            { label: 'Industries', href: '#industries' },
            { label: 'Contact', href: '#contact' },
        ],
        connect_links: [
            { label: 'LinkedIn', href: '#' },
            { label: 'Twitter / X', href: '#' },
            { label: 'Email Us', href: 'mailto:hello@thecxfaculty.com' },
        ],
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
        cxShell: {
            nav: landingContent.nav,
            footer: landingContent.footer,
        },
        cxIntegrations: {
            whatsapp_scheduling_url: 'https://wa.me/1234567890',
            whatsapp_community_url: 'https://chat.whatsapp.com/example-invite-link',
            discovery_call_message: "Hello, I'd like to book a discovery call about our customer experience goals.",
            conversation_message: "Hello, I'd like to start a conversation about improving our customer experience.",
        },
        whatsappSchedulingUrl: 'https://wa.me/1234567890',
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
        component: 'home',
        title: 'The CX Faculty — Customer Experience Consulting',
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
