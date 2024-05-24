<?php

namespace App\Http\Controllers;

use App\Models\AboutMe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutMeController extends Controller
{

    public function index()
    {
        $abouts = AboutMe::all();
        foreach ($abouts as $about) {
            $about->image = asset('storage/' . $about->image);
        }
        return response()->json([
            'status' => 200,
            'abouts' => $abouts
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'image' => 'required',
            'about' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        // Upload the image
        $imagePath = $request->file('image')->store('about_images', 'public');

        // Create the model instance with other data
        $about = AboutMe::create([
            'about' => $input['about'],
            'image' => $imagePath  // Assuming 'image_path' is the column name in your database table
        ]);

        // Return a response indicating success
        return response()->json([
            'success' => true,
            'message' => 'About created successfully',
            '$about' => $about
        ]);
    }



    public function show($id)
    {
        return AboutMe::find($id);
    }



    public function edit(AboutMe $aboutMe)
    {
        //
    }





    public function update(Request $request, $id)
    {
        if(AboutMe::where('id', $id)->exists()) {
            $about = AboutMe::find($id);
            $about -> image = $request -> image;
            $about -> about = $request -> about;
            $about -> save();
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
        if (AboutMe::where('id', $id)->exists()) {
            $about = AboutMe::find($id);
            $about->delete();
            return response()->json([
                'message' => 'About deleted successfully'
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'About not found'
            ],404);
        }
    }

}
