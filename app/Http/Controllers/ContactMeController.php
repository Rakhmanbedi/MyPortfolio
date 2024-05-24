<?php

namespace App\Http\Controllers;

use App\Models\ContactMe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactMeController extends Controller
{

    public function index()
    {
        return ContactMe::all();
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'number' => 'required|string|max:255',
            'message' => 'required|string'

        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $message = ContactMe::create([
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'number' => $input['number'],
            'message' => $input['message']
        ]);

        return response()->json([
            'success' => true,
            'message' => $message
        ]);
    }


    public function show(ContactMe $contactMe)
    {
        //
    }


    public function edit(ContactMe $contactMe)
    {
        //
    }


    public function update(Request $request, ContactMe $contactMe)
    {
        //
    }


    public function destroy($id)
    {
        if (ContactMe::where('id', $id)->exists()) {
            $message = ContactMe::find($id);
            $message->delete();
            return response()->json([
                'message' => 'Contact deleted successfully'
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Contact not found'
            ],404);
        }
    }
}
