package utils

import (
	"time"

	"backend-go-ad2025/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserID  string `json:"userId"`
	Usuario string `json:"usuario"`
	jwt.RegisteredClaims
}

func GenerateToken(userID, usuario string) (string, error) {
	exp := time.Now().Add(time.Duration(config.C.JWTExpiresHrs) * time.Hour)
	claims := Claims{
		UserID:  userID,
		Usuario: usuario,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(exp),
		},
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(config.C.JWTSecret))
}

func ParseToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.C.JWTSecret), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}
	return nil, jwt.ErrTokenInvalidClaims
}
