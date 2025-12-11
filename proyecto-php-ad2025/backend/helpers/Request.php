<?php
    function getJsonInput() {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        if (!is_array($data)) {
            $data = [];
        }
        return $data;
    }