<?php
  class Password {
      public static function hash($plain) {
          return password_hash($plain, PASSWORD_DEFAULT);
      }

      public static function verify($plain, $hash) {
          return password_verify($plain, $hash);
      }
  }