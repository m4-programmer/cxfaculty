<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'max:5120'], // 5MB
        ]);

        $image = $request->file('image');
        $filename = Str::uuid().'.'.$image->getClientOriginalExtension();

        // Create directory if it doesn't exist
        $directory = public_path('blog-images');
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // Store directly in public/blog-images
        $image->move($directory, $filename);

        // Return full URL using asset() helper for proper local/production compatibility
        $url = asset('blog-images/'.$filename);

        return response()->json([
            'url' => $url,
            'filename' => $filename,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'filename' => ['required', 'string'],
        ]);

        $filepath = public_path('blog-images/'.$request->filename);

        if (file_exists($filepath)) {
            unlink($filepath);
        }

        return response()->json(['success' => true]);
    }
}
