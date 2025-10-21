package services

import (
	"context"
	"errors"
	"strings"
	"time"

	"backend-go-ad2025/internal/models"
	"backend-go-ad2025/internal/repositories"
	"backend-go-ad2025/internal/utils"
)

type UserService interface {
	Register(ctx context.Context, u *models.Usuario) (string, error)
	Login(ctx context.Context, usuario, password string) (string, *models.Usuario, error)
	GetByID(ctx context.Context, id string) (*models.Usuario, error)
	List(ctx context.Context, limit int) ([]*models.Usuario, error)
	Update(ctx context.Context, id string, payload map[string]any) error
	Delete(ctx context.Context, id string) error
}

type userService struct{ repo repositories.UserRepository }

func NewUserService(r repositories.UserRepository) UserService { return &userService{repo: r} }

func (s *userService) Register(ctx context.Context, u *models.Usuario) (string, error) {
	if u.Usuario == "" || u.Password == "" || u.Email == "" {
		return "", errors.New("usuario, password y email requeridos")
	}
	if _, err := s.repo.GetByUsuario(ctx, u.Usuario); err == nil {
		return "", errors.New("usuario ya existe")
	}
	pwHash, err := utils.HashPassword(u.Password)
	if err != nil {
		return "", err
	}
	u.Password = pwHash
	u.Email = strings.ToLower(strings.TrimSpace(u.Email))
	return s.repo.Create(ctx, u)
}

func (s *userService) Login(ctx context.Context, usuario, password string) (string, *models.Usuario, error) {
	u, err := s.repo.GetByUsuario(ctx, usuario)
	if err != nil {
		return "", nil, errors.New("credenciales invalidas")
	}
	if !utils.CheckPassword(u.Password, password) {
		return "", nil, errors.New("credenciales invalidas")
	}
	token, err := utils.GenerateToken(u.ID, u.Usuario)
	if err != nil {
		return "", nil, err
	}
	u.Password = ""
	return token, u, nil
}

func (s *userService) GetByID(ctx context.Context, id string) (*models.Usuario, error) {
	u, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	u.Password = ""
	return u, nil
}

func (s *userService) List(ctx context.Context, limit int) ([]*models.Usuario, error) {
	res, err := s.repo.List(ctx, limit)
	if err != nil {
		return nil, err
	}
	for _, u := range res {
		u.Password = ""
	}
	return res, nil
}

func (s *userService) Update(ctx context.Context, id string, payload map[string]any) error {
	if pw, ok := payload["password"].(string); ok && pw != "" {
		if hash, err := utils.HashPassword(pw); err == nil {
			payload["password"] = hash
		}
	}
	payload["updatedAt"] = time.Now().UnixMilli()
	return s.repo.Update(ctx, id, payload)
}

func (s *userService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
