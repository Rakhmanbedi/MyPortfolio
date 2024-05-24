<?php

namespace App\Http\Controllers;

use App\Models\MyPortfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MyPortfolioController extends Controller
{

    public function index()
    {
        $portfolios = MyPortfolio::all();
        foreach ($portfolios as $portfolio) {
            $portfolio->image = asset('storage/' . $portfolio->image);
        }
        return response()->json([
            'status' => 200,
            'portfolios' => $portfolios
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
            'title' => 'required',
            'description' => 'required',
            'url_name' => 'required',
            'url' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        // Upload the image
        $imagePath = $request->file('image')->store('my_images', 'public');

        // Create the model instance with other data
        $portfolio = MyPortfolio::create([
            'title' => $input['title'],
            'description' => $input['description'],
            'url_name' => $input['url_name'],
            'url' => $input['url'],
            'image' => $imagePath  // Assuming 'image_path' is the column name in your database table
        ]);

        // Return a response indicating success
        return response()->json([
            'success' => true,
            'message' => 'Portfolio created successfully',
            '$portfolio' => $portfolio
        ]);
    }


    public function show($id)
    {
        return MyPortfolio::find($id);
    }


    public function edit(MyPortfolio $myPortfolio)
    {
        //
    }


    public function update(Request $request, $id)
    {
        if(MyPortfolio::where('id', $id)->exists()) {
            $portfolio = MyPortfolio::find($id);

            // Update image if a new one is provided
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('my_images', 'public');
                $portfolio->image = $imagePath;
            }

            // Update other fields
            $portfolio->title = $request->title;
            $portfolio->description = $request->description;
            $portfolio->url_name = $request->url_name;
            $portfolio->url = $request->url;

            $portfolio->save();

            return response()->json([
                'message' => 'Portfolio updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Portfolio not found'
            ], 404);
        }
    }





    public function destroy($id)
    {
        if (MyPortfolio::where('id', $id)->exists()) {
            $portfolio = MyPortfolio::find($id);
            $portfolio->delete();
            return response()->json([
                'message' => 'Portfolio deleted successfully'
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Portfolio not found'
            ],404);
        }
    }
}
