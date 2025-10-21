package utils

import (
	"encoding/json"
	"net/http"
)

func JSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
func JSONError(w http.ResponseWriter, status int, message string) {
	JSON(w, status, map[string]any{
		"error":   true,
		"message": message,
	})
}
