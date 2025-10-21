package interfaces

import "backend-go-ad2025/src/models"

type AuthService interface {
	Register(u *models.User) (string, error)
	Login(usuario, password string) (string, *models.User, error)
	Logout(token string) error
}
