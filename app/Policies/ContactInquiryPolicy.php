<?php

namespace App\Policies;

use App\Models\ContactInquiry;
use App\Models\User;

class ContactInquiryPolicy
{
    public function viewAny(User $user): bool
    {
        return (bool) $user->is_admin;
    }

    public function view(User $user, ContactInquiry $inquiry): bool
    {
        return (bool) $user->is_admin;
    }

    public function update(User $user, ContactInquiry $inquiry): bool
    {
        return (bool) $user->is_admin;
    }

    public function delete(User $user, ContactInquiry $inquiry): bool
    {
        return (bool) $user->is_admin;
    }
}
