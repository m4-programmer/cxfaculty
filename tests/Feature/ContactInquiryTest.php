<?php

namespace Tests\Feature;

use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactInquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_stores_inquiry_and_emails_owner(): void
    {
        Mail::fake();

        config(['cx.owner_email' => 'owner@example.com']);

        $response = $this->post(route('contact.submit'), [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Consulting request',
            'message' => 'We would like to discuss a CX project.',
        ]);

        $response->assertRedirect(route('home').'#contact');
        $response->assertSessionHas('success');
        $response->assertSessionHas('contact_submitted', true);

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Consulting request',
        ]);

        Mail::assertQueued(ContactInquiryReceived::class, function (ContactInquiryReceived $mail) {
            return $mail->hasTo('owner@example.com')
                && $mail->inquiry->email === 'jane@example.com';
        });
    }

    public function test_contact_form_rejects_honeypot_submissions(): void
    {
        Mail::fake();

        $response = $this->post(route('contact.submit'), [
            'name' => 'Bot User',
            'email' => 'bot@example.com',
            'subject' => 'Spam',
            'message' => 'Spam message',
            'website' => 'https://spam.test',
        ]);

        $response->assertSessionHasErrors('website');
        $this->assertDatabaseCount('contact_inquiries', 0);
        Mail::assertNothingQueued();
    }

    public function test_contact_inquiry_mailable_contains_inquiry_details(): void
    {
        $inquiry = ContactInquiry::create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Consulting request',
            'message' => 'We would like to discuss a CX project.',
            'ip_address' => '127.0.0.1',
        ]);

        $mailable = new ContactInquiryReceived($inquiry);
        $mailable->assertSeeInHtml('Jane Doe');
        $mailable->assertSeeInHtml('jane@example.com');
        $mailable->assertSeeInHtml('Consulting request');
        $mailable->assertSeeInHtml('We would like to discuss a CX project.');
    }
}
