<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Video
 *
 * @package App
 * @property int $id
 * @property string $url
 * @property int|null $post_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video whereUrl($value)
 * @mixin \Eloquent
 */
class Video extends Model
{
    /**
     * @var string
     */
    protected $table = "videos";
    /**
     * @var array
     */
    protected $fillable = [
        "url"
    ];
}
