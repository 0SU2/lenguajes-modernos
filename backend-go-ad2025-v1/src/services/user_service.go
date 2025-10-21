package services

import (
	"backend-go-ad2025/src/interfaces"
	"backend-go-ad2025/src/models"
	"backend-go-ad2025/src/utils"
	"errors"
	"strings"
)

type UserService struct {
	repo interfaces.UserRepository
}

func NewUserService(repo interfaces.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) CreateUser(u *models.User) (string, error) {
	if strings.TrimSpace(u.Usuario) == "" || strings.TrimSpace(u.Password) == "" {
		return "", errors.New("Usuario y contraseña son obligatorios")
	}
	exists, err := s.repo.ExistsByUser(u.Usuario)
	if err != nil {
		return "", err
	}
	if exists {
		return "", errors.New("El usuario ya existe")
	}
	hash, err := utils.HashPassword(u.Password)
	if err != nil {
		return "", err
	}
	return s.repo.Create(u)
}
