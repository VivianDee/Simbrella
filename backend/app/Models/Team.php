<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
        'pivot'
    ];


    // A team has many users
    public function users()
    {
        return $this->belongsToMany(User::class, 'team_user');
    }

    // A team has many projects
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
