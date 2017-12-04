<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Photo
 *
 * @package App
 * @property int $id
 * @property string $url
 * @property int|null $post_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Photo whereUrl($value)
 * @mixin \Eloquent
 */
class Photo extends Model
{
    /**
     * @var string
     */
    protected $table = "photos";
    /**
     * @var array
     */
    protected $fillable = [
        "url"
    ];

    protected $appends = [
        'full_url'
    ];

    public function getFullUrlAttribute()
    {
        return asset('assets/images/' . $this->url);
    }
}
