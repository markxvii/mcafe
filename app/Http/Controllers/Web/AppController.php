<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppController extends Controller
{
//    主页
    public function getApp()
    {
        return view('app');
    }

//    登录页
    public function getLogin()
    {
        return view('login');
    }
}
