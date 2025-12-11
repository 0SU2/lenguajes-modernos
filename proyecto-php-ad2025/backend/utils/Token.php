<?php
 class Token {
  public static  function create ($payload) {
    $env = getenv('TOKEN_SECRET');
    $exp = getenv('TOKEN_EXPITRES_IN') + time();

    $secret = $env;
    $data = [
        'exp' => $exp,
        'data' => $payload
    ];

    $json = json_encode($data);
    $b64 = base64_encode($json);
    $sig = hash_hmac('sha256', $b64, $secret);
    return $b64 . '.' . $sig;
}
  public static function verify($token) {
    $secret = getenv('TOKEN_SECRET');
    $parts = explode('.', $token);

    if (count($parts) !== 2) { return null; }

    [$b64, $sig] = $parts;
    $check = hash_hmac('sha256', $b64, $secret);
    $json = base64_decode($b64);
    $data = json_decode($json, true);

    if(!$data || !isset($data['exp']) || time() > $data['exp']) { return null; }

    return $data['data'];
  }
 }