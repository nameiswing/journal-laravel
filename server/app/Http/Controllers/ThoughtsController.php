<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thoughts;

class ThoughtsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $thoughts = Thoughts::all();
        return response()->json([
            'status' => 200,
            "message" => "Data successfully retrieved.",
            "thoughts" => $thoughts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $thought = new Thoughts();
        $thought->name = $request->input('name');
        $thought->description = $request->input('description');
        $thought->due_date = $request->input('due_date');
        $thought->save();
        return response()->json([
            'status' => 200,
            "message" => "Thought added successfully."
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $thought = Thoughts::find($id);
        $thought->delete();
        return response()->json(['status'=>200, 'message'=>'Item removed.']);
    }
}
