<x-mail::message>
# Reset Password
You are receiving this email because we received a password reset request for your account.
<x-mail::button :url="$url" color="success">
Reset Password
</x-mail::button>
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
