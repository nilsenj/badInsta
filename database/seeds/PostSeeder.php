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
     * @var array
     */
    protected $videos = [
        'me.mp4',
        'html5.mp4',
        'video-dummy.mp4',
        'video_test.ogv'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        factory(\App\Post::class, 200)->create()
            ->each(function (\App\Post $post, $index) use ($faker) {
                $userId = $faker->numberBetween(1, \App\User::all()->count());
                $post->user_id = $userId;
                $post->save();
                if ($post->id % 2 == 0) {
                    for ($i = 0; $i < 3; $i++) {
                        if (count($post->photos)) {
                            $photoUrl = $this->images
                            [$faker->numberBetween($i, count($this->images) - 1)];
                            if (!$post->photos()->where('url', $photoUrl)->count()) {
                                $post->photos()->create(['url' => $photoUrl]);
                            }
                        }
                        else {
                            $photoUrl = $this->images
                            [$faker->numberBetween($i, count($this->images) - 1)];
                            if (!$post->photos()->where('url', $photoUrl)
                                ->count()) {
                                $post->photos()->create(['url' => $photoUrl]);
                            }
                        }
                    }
                } else {
                    for ($i = 0; $i < 3; $i++) {
                        if (count($post->videos)) {
                            $videoUrl = $this->videos
                            [$faker->numberBetween($i, count($this->videos) - 1)];

                            if (!$post->videos()->where('url', $videoUrl)->count()) {
                                $post->videos()->create([
                                    'url' => $videoUrl
                                ]);
                            }
                        } else {
                            $videoUrl = $this->videos
                            [$faker->numberBetween($i, count($this->videos) - 1)];
                            if (!$post->videos()->where('url', $videoUrl)->count()) {
                                $post->videos()->create([
                                    'url' => $videoUrl
                                ]);
                            }
                        }
                    }
                }
            });
    }
}
