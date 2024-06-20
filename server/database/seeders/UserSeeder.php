<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'admin',
                'surname' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('Password1'),
                'role' => 1,
                'is_active' => 1,
                'created_at' => now(),

            ],
            [
                'name' => 'admin',
                'surname' => 'teacher',
                'email' => 'admint@gmail.com',
                'password' => bcrypt('Password1'),
                'role' => 2,
                'is_active' => 1,
                'created_at' => now(),
            ],
            [
                'name' => 'admin',
                'surname' => 'student',
                'email' => 'admins@gmail.com',
                'password' => bcrypt('Password1'),
                'role' => 3,
                'is_active' => 1,
                'created_at' => now(),
            ],
        ];

        DB::table('users')->insert($data);
    }
}
