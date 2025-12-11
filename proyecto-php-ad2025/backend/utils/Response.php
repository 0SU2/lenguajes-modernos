<?php
    class Response {
        public static function json($statusCode, $data){
            header('Content-Type: application/json');
            http_response_code($statusCode);
            echo json_encode($data);
            exit;
        }

        public static function ok($data){
            self::json(200, ['ok' => true, 'data' => $data]);
        }

        public static function error($statusCode, $message){
            self::json($statusCode, ['ok' => false, 'error' => $message]);
        }
        
    }