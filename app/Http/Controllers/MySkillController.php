<?php

namespace App\Http\Controllers;

use App\Models\MySkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MySkillController extends Controller
{

    public function index()
    {
        $skills = MySkill::all();
        foreach ($skills as $skill) {
            $skill->photo = asset('storage/' . $skill->photo);
        }
        return response()->json([
            'status' => 200,
            'skills' => $skills
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
            'photo' => 'required',
            'title' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        // Upload the image
        $imagePath = $request->file('photo')->store('portfolio_images', 'public');

        // Create the model instance with other data
        $skill = MySkill::create([
            'title' => $input['title'],
            'description' => $input['description'],
            'photo' => $imagePath  // Assuming 'image_path' is the column name in your database table
        ]);

        // Return a response indicating success
        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'skill' => $skill
        ]);
    }



    public function show($id)
    {
        return MySkill::find($id);
    }


    public function edit(MySkill $mySkill)
    {
        //
    }


    public function update(Request $request, $id)
    {
        if(MySkill::where('id', $id)->exists()) {
            $skill = MySkill::find($id);
            $skill -> photo = $request -> photo;
            $skill -> title = $request -> title;
            $skill -> description = $request -> description;
            $skill -> save();
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
        if (MySkill::where('id', $id)->exists()) {
            $skill = MySkill::find($id);
            $skill->delete();
            return response()->json([
                'message' => 'Skill deleted successfully'
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Skill not found'
            ],404);
        }
    }
}
