# Deployment Guide — CX Faculty

This guide covers deploying the Laravel + Inertia + React application to a production server.

## Requirements

- PHP 8.3+
- Composer 2.x
- Node.js 20+ and npm
- MySQL/PostgreSQL or SQLite (production should use MySQL/PostgreSQL)
- Nginx or Apache with SSL

## 1. Server setup

```bash
# Clone the repository
git clone <your-repo-url> /var/www/cx-faculty
cd /var/www/cx-faculty

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install frontend dependencies and build assets
npm ci
npm run build
```

## 2. Environment configuration

Copy and configure `.env`:

```bash
cp .env.example .env
php artisan key:generate
```

Production `.env` essentials:

```env
APP_NAME="CX Faculty"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cx_faculty
DB_USERNAME=your_user
DB_PASSWORD=your_password

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

# Optional: disable public registration in production
# Configure Fortify features in config/fortify.php
```

## 3. Database & storage

```bash
php artisan migrate --force
php artisan db:seed --force   # Creates admin@example.com (set password via factory)
php artisan storage:link
```

**Create an admin user** (if not seeding):

```sql
UPDATE users SET is_admin = 1 WHERE email = 'your@email.com';
```

Or use Tinker:

```bash
php artisan tinker
>>> $u = User::where('email', 'your@email.com')->first();
>>> $u->is_admin = true;
>>> $u->save();
```

## 4. Optimize for production

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

## 5. Nginx example

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/cx-faculty/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## 6. Queue worker (optional)

For queued jobs (emails, etc.):

```bash
php artisan queue:work --daemon
```

Use Supervisor to keep the worker running.

## 7. Security checklist

- [ ] `APP_DEBUG=false`
- [ ] HTTPS enabled with valid certificate
- [ ] Admin routes protected by `auth` + `admin` middleware
- [ ] Only trusted users have `is_admin = true`
- [ ] Consider disabling public registration in `config/fortify.php`
- [ ] Contact form rate limiting enabled (built-in)
- [ ] Run `php artisan storage:link` for blog image uploads
- [ ] Set strong database credentials
- [ ] Keep `composer` and `npm` dependencies updated

## 8. Post-deploy verification

1. Visit `/` — homepage loads
2. Visit `/blog` — blog index with posts
3. Visit `/blog/{slug}` — single post renders with formatted content
4. Visit `/sitemap.xml` — XML sitemap
5. Submit contact form at `/#contact`
6. Log in as admin → `/dashboard`
7. Create/edit/delete a blog post with rich text + image upload
8. Review inquiries at `/admin/inquiries`

## 9. Updating the site

```bash
git pull
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Restart PHP-FPM after deployments.
