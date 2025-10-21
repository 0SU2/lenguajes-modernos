package repositories

import (
	"context"
	"time"

	"backend-go-ad2025/src/config"
	"backend-go-ad2025/src/utils"

	"cloud.google.com/go/firestore"
)

type TokenRepository struct {
	col *firestore.CollectionRef
}

func NewTokenRepository() *TokenRepository {
	return &TokenRepository{col: config.Firestore.Collection(config.BlacklistCol)}
}

// Guarda en blacklist: docID = sha256(token)
func (r *TokenRepository) Blacklist(token string, exp time.Time) error {
	docID := utils.SHA256Hex(token)
	_, err := r.col.Doc(docID).Set(context.Background(), map[string]interface{}{
		"tokenHash": docID,
		"expiresAt": exp,
		"createdAt": time.Now(),
	})
	return err
}
func (r *TokenRepository) IsBlacklisted(token string) (bool, error) {
	docID := utils.SHA256Hex(token)
	_, err := r.col.Doc(docID).Get(context.Background())
	if err != nil {
		// not found -> not blacklisted
		if firestore.IsNotFound(err) {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
