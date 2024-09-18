<?php

namespace App\Modules\MailModule;

use App\Mail\WelcomeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailModule
{
    public static function sendWelcomeMail(Request $request): bool
    {
        $mail = new WelcomeMail([
            "title" => "Welcome to Your Task Management System",
            "greeting" => "Welcome to TaskMaster!",
            "name" => $request->first_name,
            "intro" =>
                "We're excited to have you on board! Get ready to streamline your tasks and boost your productivity with our powerful tools.",
            "text" =>
                "With TaskMaster, you can easily create, assign, and manage tasks, set deadlines, and collaborate with your team effortlessly. We're here to help you stay organized and achieve your goals.",
            "outro" => "Let's get started on your journey to better task management!",
            "companyName" => "TaskMaster",
        ]);

        $status = Mail::mailer("task_smtp")
            ->to($request->email)
            ->send($mail);

        return $status ? true : false;
    }
}