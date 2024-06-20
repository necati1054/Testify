<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\Solved_test;
use App\Models\User;
use App\Models\Test;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['HomePage']]);
    }

    public function AdminDashboard()
    {
        $data = [];
        $allUserCount = User::count();
        $allTeacherCount = User::where('role', '1')->count();
        $allStudentCount = User::where('role', '2')->count();
        $allTestCount = Test::count();
        $allSolvedTestCount = Solved_test::count();


        $haftaOnce = Carbon::now()->subWeek();
        $kayitSayisi = User::where('created_at', '>=', $haftaOnce)->count();


        $data[0] = [
            'key' => 'allUserCount',
            'name' => 'Toplam Kullanıcı Sayısı',
            'value' => $allUserCount,
            'icon' => "group",
        ];

        $data[1] = [
            'key' => 'allTeacherCount',
            'name' => 'Toplam Öğretmen Sayısı',
            'value' => $allTeacherCount,
            'icon' => "person",
        ];

        $data[2] = [
            'key' => 'allStudentCount',
            'name' => 'Toplam Öğrenci Sayısı',
            'value' => $allStudentCount,
            'icon' => "school",
        ];

        $data[3] = [
            'key' => 'allStudentCount',
            'name' => 'Geçen Hafta Kayıt Olan Kullanıcı Sayısı',
            'value' => $kayitSayisi,
            'icon' => "face",
        ];


        $data[4] = [
            'key' => 'allTestCount',
            'name' => 'Toplam Test Sayısı',
            'value' => $allTestCount,
            'icon' => "description",
        ];

        $data[5] = [
            'key' => 'allSolvedTestCount',
            'name' => 'Toplam Çözülen Test Sayısı',
            'value' => $allSolvedTestCount,
            'icon' => "checklist",
        ];

        return response()->json([
            'data' => $data,
        ]);
    }

    public function TeacherDashboard($id)
    {
        $data = [];
        $testCount = test::where('user_id', $id)->count();

        $totalSolvedTests = Test::where('user_id', $id)
            ->withCount('getsolvedtestcount')
            ->get()
            ->sum('getsolvedtestcount_count');

        $data[0] = [
            'key' => 'MyCreatedTestCount',
            'name' => 'Oluşturduğum test sayısı',
            'value' => $testCount,
            'icon' => "description",
        ];

        $data[1] = [
            'key' => 'totalnumberofsolvedtests',
            'name' => 'Toplam Çözülen Test Sayısı',
            'value' => $totalSolvedTests,
            'icon' => "description",
        ];

        return response()->json([
            'data' => $data,
        ]);
    }

    public function StudentDashboard($id)
    {
        $data = [];
        $totalSolvedTests = Solved_test::where('user_id', $id)->count();
        // $totalPoint = Solved_test::where('user_id', $id)->sum('total_point');

        $data[0] = [
            'key' => 'totalnumberofsolvedtests',
            'name' => 'Toplam Çözdüğüm Test Sayısı',
            'value' => $totalSolvedTests,
            'icon' => "description",
        ];

        // $data[1] = [
        //     'key' => 'totalpoint',
        //     'name' => 'Total Point',
        //     'value' => $totalPoint,
        //     'icon' => "description",
        // ];

        return response()->json([
            'data' => $data,
        ]);
    }

    public function HomePage()
    {
        $settings = Setting::all();
        $testLatest = Test::orderBy('created_at', 'desc')->take(3)->get()->load('getCreater');
        $randomTests = Test::inRandomOrder()->take(3)->get()->load('getCreater');

        return response()->json([
            'settings' => $settings,
            'testLatest' => $testLatest,
            'randomTests' => $randomTests,
        ]);
    }
}
