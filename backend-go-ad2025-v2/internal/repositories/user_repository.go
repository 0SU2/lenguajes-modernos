package repositories

import (
	"context"
	"errors"
	"time"

	"backend-go-ad2025/internal/config"
	"backend-go-ad2025/internal/models"

	"cloud.google.com/go/firestore"
)

type UserRepository interface {
	Create(ctx context.Context, u *models.Usuario) (string, error)
	GetByID(ctx context.Context, id string) (*models.Usuario, error)
	GetByUsuario(ctx context.Context, username string) (*models.Usuario, error)
	List(ctx context.Context, limit int) ([]*models.Usuario, error)
	Update(ctx context.Context, id string, u map[string]any) error
	Delete(ctx context.Context, id string) error
}

type userRepo struct{ col *firestore.CollectionRef }

func NewUserRepository() UserRepository {
	return &userRepo{col: config.C.Firestore.Collection(config.C.UsuariosCol)}
}

func (r *userRepo) Create(ctx context.Context, u *models.Usuario) (string, error) {
	u.CreatedAt = time.Now().UnixMilli()
	u.UpdatedAt = u.CreatedAt
	u.Deleted = false
	doc, _, err := r.col.Add(ctx, u)
	if err != nil {
		return "", err
	}
	return doc.ID, nil
}

func (r *userRepo) GetByID(ctx context.Context, id string) (*models.Usuario, error) {
	doc, err := r.col.Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	var u models.Usuario
	if err := doc.DataTo(&u); err != nil {
		return nil, err
	}
	u.ID = doc.Ref.ID
	return &u, nil
}

func (r *userRepo) GetByUsuario(ctx context.Context, username string) (*models.Usuario, error) {
	q := r.col.Where("Usuario", "==", username).Where("Deleted", "==", false).Limit(1)
	snaps, err := q.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}
	if len(snaps) == 0 {
		return nil, errors.New("not found")
	}
	var u models.Usuario
	if err := snaps[0].DataTo(&u); err != nil {
		return nil, err
	}
	u.ID = snaps[0].Ref.ID
	return &u, nil
}

func (r *userRepo) List(ctx context.Context, limit int) ([]*models.Usuario, error) {
	q := r.col.Where("Deleted", "==", false)
	if limit > 0 {
		q = q.Limit(limit)
	}
	snaps, err := q.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}
	res := make([]*models.Usuario, 0, len(snaps))
	for _, s := range snaps {
		var u models.Usuario
		if err := s.DataTo(&u); err == nil {
			u.ID = s.Ref.ID
			res = append(res, &u)
		}
	}
	return res, nil
}

func (r *userRepo) Update(ctx context.Context, id string, u map[string]any) error {
	u["updatedAt"] = time.Now().UnixMilli()
	_, err := r.col.Doc(id).Set(ctx, u, firestore.MergeAll)
	return err
}

func (r *userRepo) Delete(ctx context.Context, id string) error {
	_, err := r.col.Doc(id).Set(ctx, map[string]any{
		"Deleted":   true,
		"updatedAt": time.Now().UnixMilli(),
	}, firestore.MergeAll)
	return err
}
