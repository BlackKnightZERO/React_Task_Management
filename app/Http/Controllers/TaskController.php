<?php

namespace App\Http\Controllers;
use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        $data = Task::latest()->get();
        return response()->json([
          'message' => 'Success',
          'data' => $data,
        ], 200);
    }
    public function edit($id){
        $data = Task::find($id);
        return response()->json([
          'message' => 'Success',
          'data' => $data,
        ], 200);
    }
    public function update(Request $request){
      $this->validate($request, [
        'id' => 'required',
        'name' => 'required',
      ]);
      $updateData = array(
        'name' => $request->name,
        'status' => $request->status,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
      );
      $data = Task::where('id', $request->id)->update($updateData);
      return response()->json([
        'message' => 'Successfully Updated',
      ], 200);
    }
}
