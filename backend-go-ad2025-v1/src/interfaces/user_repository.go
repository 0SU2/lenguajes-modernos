package interfaces

import "backend-go-ad2025/src/models"

type UserRepository interface {
	Create(u *models.User) (string, error)
	GetAll() ([]*models.User, error)
	GetByID(id string) (*models.User, error)
	GetByUsuario(usuario string) (*models.User, error)
	Update(id string, usuario *models.User) error
	Delete(id string) error
	ExistsByUser(usuario string) (bool, error)
	ExistsByFullName(nombre, apaterno, amaterno string) (bool, error)
}
