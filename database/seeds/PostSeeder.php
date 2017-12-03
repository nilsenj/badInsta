<?php

use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * @var array
     */
    protected $images = [
        '1.png',
        '2.jpg',
        '3.png',
        '4.jpg',
        '5.png',
        '6.jpg',
        '7.png',
        '8.png',
        '9.jpg',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        factory(\App\Post::class, 20)->create()
            ->each(function (\App\Post $post) use ($faker) {
                $post->user_id = $faker->numberBetween(1, \App\User::all()->count());
                $post->save();
                $post->photos()->create(['url' => $this->images
                [$faker->numberBetween(0, count($this->images) - 1)]]);
                $post->videos()->create([]);
            });
    }
}
