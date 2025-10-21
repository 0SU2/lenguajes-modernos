package repositories

import (
	"backend-go-ad2025/src/config"
	"backend-go-ad2025/src/models"
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type userRepository struct {
	col *firestore.CollectionRef
}

func NewUserRepository() *userRepository {
	return &userRepository{col: config.Firestore.Collection(config.UsersCol)}
}

func (r *userRepository) Create(u *models.User) (string, error) {
	u.CreateAt = time.Now()
	u.UpdateAt = u.CreateAt
	doc, _, err := r.col.Add(context.Background(), u)
	if err != nil {
		return "", err
	}

	return doc.ID, nil
}

func (r *userRepository) GetAll() ([]*models.User, error) {
	it := r.col.Documents(context.Background())
	defer it.Stop()

	var users []*models.User
	for {
		doc, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var u models.User
		if err := doc.DataTo(&u); err != nil {
			return nil, err
		}
		u.ID = doc.Ref.ID
		users = append(users, &u)
	}
	return users, nil
}

func (r *userRepository) GetByID(id string) (*models.User, error) {
	doc, err := r.col.Doc(id).Get(context.Background())
	if err != nil {
		return nil, err
	}
	var u models.User
	if err := doc.DataTo(&u); err != nil {
		return nil, err
	}

	u.ID = doc.Ref.ID
	return &u, nil
}

func (r *userRepository) GetByUsuario(usuario string) (*models.User, error) {
	q := r.col.Where("usuario", "==", usuario)
	it := q.Documents(context.Background())
	doc, err := it.Next()
	if err != nil {
		return nil, err
	}
	var u models.User
	if err := doc.DataTo(&u); err != nil {
		return nil, err
	}
	u.ID = doc.Ref.ID
	return &u, nil
}

func (r *userRepository) Update(id string, u *models.User) error {
	u.UpdateAt = time.Now()
	_, err := r.col.Doc(id).Set(context.Background(), u, firestore.MergeAll)
	return err
}

func (r *userRepository) Delete(id string) error {
	_, err := r.col.Doc(id).Delete(context.Background())
	return err
}

func (r *userRepository) ExistsByUsuario(usuario string) (bool, error) {
	u, err := r.GetByUsuario(usuario)
	if err != nil {
		return false, nil
	}
	return u != nil, nil
}

func (r *userRepository) ExistsByFullName(nombre, apaterno, amaterno string) (bool, error) {
	q := r.col.Where("nombre", "==", nombre).Where("apaterno", "==", apaterno).Where("amaterno", "==", amaterno)
	it := q.Documents(context.Background())
	defer it.Stop()
	_, err := it.Next()
	if err == iterator.Done {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("El usuario ya existe")
	}
	return true, nil
}
