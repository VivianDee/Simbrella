<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'team_id',
        'assigned_to',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    // A project belongs to a team
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    // A project has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // A project is assigned to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
