<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Crud;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class CrudController extends Controller
{
    public function index(Request $request)
    {
        return view('cruds.index');
    }
    public function dtTableCategory(Request $request)
    {
            $category = Crud::latest()->get();

            return DataTables::of($category)
                    ->addIndexColumn()
                    ->addColumn('action', function ($category){
                        $btn = '<button type="button" name="edit" id="'.$category->id.'" class="btn btn-warning btn-sm edit" data-toggle="tooltip" data-placement="bottom" title="Edit"><i class="fa fa-edit"></i>Edit</button>
                                <a href="#" class="btn btn-danger btn-sm" onclick="deleteCategory(' . $category->id . ')" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fa fa-trash-alt"></i> Delete</a>';
                        return $btn;
                    })
                    ->rawColumns(['action'])
                    ->editColumn('created_at', function ($category) {
                        return [
                        'display' => date('Y-m-d', strtotime($category->created_at)),
                        'timestamp' => $category->created_at
                        ];
                    })
                    ->make(true);

    }
    public function storeCategory(Request $request)
    {

            $validator = Validator::make($request->all(), [
                'nama_kategori' => 'required'
                ]);

            if($validator->fails())
            {
                return response()->json(['errors' => $validator->errors()->all()]);
            }

            $item = new Crud();
            $item->nama = $request->nama_kategori;
            $item->save();

            return response()->json(['success', 'Berhasil ditambahkan']);

            
    }
    public function editCategory($id)
    {
                $data = Crud::findOrFail($id);
                return response()->json(['result' => $data]);
    }
    public function updateCategory(Request $request)
    {

            $validator = Validator::make($request->all(), [
                'nama_kategori' => 'required|max:50'
                ]);

            if($validator->fails())
            {
                return response()->json(['errors' => $validator->errors()->all()]);
            }

            $item = Crud::findOrFail($request->id);
            $item->nama = $request->nama_kategori;
            $item->update();
            return response()->json(['success', 'Berhasil diperbarui']);

    }
    public function deleteCategory(Request $request)
    {
  
            Crud::findOrFail($request->id)->delete();

            return response()->json(['success', 'Data has been deleted']);

    }
    
}
