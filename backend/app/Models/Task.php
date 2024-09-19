<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'status',
        'project_id',
        'assigned_to',
    ];

    protected $hidden = [
        'assigned_to',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    // A task belongs to a project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // A task is assigned to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
