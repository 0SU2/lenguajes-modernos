package utils

import (
	"crypto/sha256"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pw string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)
	return string(b), err
}
func CheckPasswordHash(pw, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(pw), []byte(hash)) == nil
}

// Compat con versiones antiguas:
func bcryptCompare(hash, pw []byte) error {
	return bcrypt.CompareHashAndPassword(hash, pw)
}
func SHA256Hex(s string) string {
	sum := sha256.Sum256([]byte(s))
	return hex.EncodeToString(sum[:])
}
