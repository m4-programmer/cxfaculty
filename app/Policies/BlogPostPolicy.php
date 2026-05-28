<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;

class BlogPostPolicy
{
    public function viewAny(User $user): bool
    {
        return (bool) $user->is_admin;
    }

    public function view(User $user, BlogPost $post): bool
    {
        return (bool) $user->is_admin;
    }

    public function create(User $user): bool
    {
        return (bool) $user->is_admin;
    }

    public function update(User $user, BlogPost $post): bool
    {
        return (bool) $user->is_admin;
    }

    public function delete(User $user, BlogPost $post): bool
    {
        return (bool) $user->is_admin;
    }

    public function restore(User $user, BlogPost $post): bool
    {
        return (bool) $user->is_admin;
    }

    public function forceDelete(User $user, BlogPost $post): bool
    {
        return (bool) $user->is_admin;
    }
}
