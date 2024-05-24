<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        foreach ($posts as $post) {
            $post->about_me = asset('storage/' . $post->about_me);
        }
        return response()->json([
            'status' => 200,
            'posts' => $posts
        ]);
    }


    public function create()
    {

    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'title' => 'required',
            'short_description' => 'required',
            'about_me' => 'required'

        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('about_me')->store('post_images', 'public');

        $post = Post::create([
            'name' => $input['name'],
            'title' => $input['title'],
            'short_description' => $input['short_description'],
            'about_me' => $imagePath  // Assuming 'image_path' is the column name in your database table
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }


    public function show($id)
    {
        return Post::find($id);
    }


    public function edit(Post $post)
    {

    }


    public function update(Request $request, $id)
    {
        if(Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            $post -> name = $request -> name;
            $post -> title = $request -> title;
            $post -> short_description = $request -> short_description;
            $post -> about_me = $request -> about_me;
            $post -> content = $request -> content;
            $post -> save();
            return response()->json([
                'message' => 'Post updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Post not found'
            ], 404);
        }
    }


    public function destroy($id)
    {
        if (Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            $post->delete();
            return response()->json([
                'message' => 'Post deleted successfully'
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Post not found'
            ],404);
        }
    }
}
