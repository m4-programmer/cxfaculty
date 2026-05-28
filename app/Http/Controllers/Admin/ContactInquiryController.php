<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', ContactInquiry::class);

        $query = ContactInquiry::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'unread') {
                $query->whereNull('read_at');
            } elseif ($request->input('status') === 'read') {
                $query->whereNotNull('read_at');
            }
        }

        $inquiries = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'filters' => $request->only('search', 'status'),
            'unreadCount' => ContactInquiry::whereNull('read_at')->count(),
        ]);
    }

    public function show(ContactInquiry $inquiry): Response
    {
        $this->authorize('view', $inquiry);

        if (! $inquiry->read_at) {
            $inquiry->update(['read_at' => now()]);
        }

        return Inertia::render('admin/inquiries/show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function destroy(ContactInquiry $inquiry): RedirectResponse
    {
        $this->authorize('delete', $inquiry);

        $inquiry->delete();

        return to_route('admin.inquiries.index')->with('success', 'Inquiry deleted.');
    }
}
