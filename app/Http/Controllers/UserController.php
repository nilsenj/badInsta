<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $data = [];
        $data['id'] = $request->user()->id;
        $data['name'] = $request->user()->name;
        $data['nickname'] = $request->user()->nickname;
        $data['email'] = $request->user()->email;
        $data['description'] = $request->user()->description;
        return response()->json([
            'data' => $data,
        ]);
    }
}
