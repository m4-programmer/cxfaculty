<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'], // 5MB
        ]);

        $image = $request->file('image');
        $filename = Str::uuid().'.'.$image->getClientOriginalExtension();

        $path = $image->storeAs('blog-images', $filename, 'public');

        return response()->json([
            'url' => Storage::url($path),
            'filename' => $filename,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'filename' => ['required', 'string'],
        ]);

        Storage::disk('public')->delete('blog-images/'.$request->filename);

        return response()->json(['success' => true]);
    }
}
