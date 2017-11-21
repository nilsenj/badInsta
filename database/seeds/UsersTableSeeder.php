<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::UpdateOrCreate([
            'name' => 'badCoder',
            'nickname' => 'badCoder',

            'email' => 'nikoleivan@gmail.com',

            'password' => '123456',

            'description' => 'Ivan Nikolenko So I\'m the developer) Coding and streaming! That\'s what I\'m doing! youtube.com/badcoder'
        ]);

        factory(\App\User::class, 20)->create();
    }
}
