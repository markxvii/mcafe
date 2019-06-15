<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreCafeRequest;
use App\Models\Cafe;
use App\Utilties\GaodeMaps;
use App\Utilties\Tagger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CafesController extends Controller
{
    /*
     |-------------------------------------------------------------------------------
     | Get All Cafes
     |-------------------------------------------------------------------------------
     | URL:            /api/v1/cafes
     | Method:         GET
     | Description:    Gets all of the cafes in the application
    */
    public function getCafes()
    {
        $cafes = Cafe::with('brewMethods')->get();
        return response()->json($cafes);
    }

    /*
     |-------------------------------------------------------------------------------
     | Get An Individual Cafe
     |-------------------------------------------------------------------------------
     | URL:            /api/v1/cafes/{id}
     | Method:         GET
     | Description:    Gets an individual cafe
     | Parameters:
     |   $id   -> ID of the cafe we are retrieving
    */
    public function getCafe($id)
    {
        $cafe = Cafe::where('id', '=', $id)
            ->with('brewMethods')
            ->with('userLike')
            ->with('tags')
            ->first();
        return response()->json($cafe);
    }

    /*
     |-------------------------------------------------------------------------------
     | Adds a New Cafe
     |-------------------------------------------------------------------------------
     | URL:            /api/v1/cafes
     | Method:         POST
     | Description:    Adds a new cafe to the application
    */
    public function postNewCafe(StoreCafeRequest $request)
    {
        try {
            $cafe = new Cafe();

            $cafe->name = $request->name;
            $cafe->address = $request->address;
            $cafe->city = $request->city;
            $cafe->state = $request->state;
            $cafe->zip = $request->zip;

            $cafe->roaster = $request->roaster ? 1 : 0;
            $cafe->website = $request->website;
            $cafe->description = $request->description ?: '';
            $cafe->added_by = $request->user()->id;

            $cafe->zip = $request->zip;
            $coordinates = GaodeMaps::geocodeAddress($cafe->address, $cafe->city, $cafe->state);
            if (!$coordinates['lat']) {
                return response('错误', 403);
            }
            $cafe->latitude = $coordinates['lat'];
            $cafe->longitude = $coordinates['lng'];
            $cafe->save();

            $brewMethods = $request->brewMethods;
            $tags = $request->tags;
            $cafe->brewMethods()->sync($brewMethods);
            Tagger::tagCafe($cafe, $tags, $request->user()->id);

            return response()->json($cafe, 201);
        } catch (\Exception $e) {
            return response()->json('错误', 500);
        }

    }


    public function postLikeCafe($cafeID)
    {
        $cafe = Cafe::where('id', '=', $cafeID)->first();
        $cafe->likes()->attach(Auth::user()->id, [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        return response()->json(['cafe_liked' => true], 201);
    }

    public function deleteLikeCafe($cafeID)
    {
        $cafe = Cafe::where('id', '=', $cafeID)->first();

        $cafe->likes()->detach(Auth::user()->id);

        return response(null, 204);
    }

    /**
     * 给咖啡店添加标签
     * @param $request
     * @param $cafeID
     * @return JsonResponse
     */
    public function postAddTags(Request $request, $cafeID)
    {
        // 从请求中获取标签信息
        $tags = $request->tags;
        $cafe = Cafe::find($cafeID);

        // 处理新增标签并建立标签与咖啡店之间的关联
        Tagger::tagCafe($cafe, $tags, Auth::user()->id);

        // 返回标签
        $cafe = Cafe::where('id', '=', $cafeID)
            ->with('brewMethods')
            ->with('userLike')
            ->with('tags')
            ->first();

        return response()->json($cafe, 201);
    }

    /**
     * 删除咖啡店上的指定标签
     * @param $cafeID
     * @param $tagID
     * @return Response
     */
    public function deleteCafeTag($cafeID, $tagID)
    {
        DB::table('cafes_users_tags')->where('cafe_id', $cafeID)->where('tag_id', $tagID)->where('user_id', Auth::user()->id)->delete();
        return response(null, 204);
    }
}
