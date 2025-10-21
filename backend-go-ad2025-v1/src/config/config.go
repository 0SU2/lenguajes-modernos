package config

import (
	"context"
	"fmt"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var (
	App          *firebase.App
	Firestore    *firestore.Client
	UsersCol     string
	BlacklistCol string
	ProjectID    string
)

func InitFirebase() error {
	ctx := context.Background()
	UsersCol = getenvDefault("FIRESTORE_USERS_COLLECTION", "usuariosgo")
	BlacklistCol = getenvDefault("FIRESTORE_TOKEN_COLLECTION", "token_blacklist")
	ProjectID = os.Getenv("FIREBASE_PROJECT_ID")

	credPath := os.Getenv("GOOGLE_APPLICATION_CREDENTIAL")
	var app *firebase.App
	var err error

	if credPath != "" {
		opt := option.WithCredentialsFile(credPath)
		app, err := firebase.NewApp(ctx, &firebase.Config{ProjectID: ProjectID}, opt)

		if err != nil {
			return fmt.Errorf("firebase.NewApp: %w", err)
		}

		App = app
		fs, err := app.Firestore(ctx)
		if err != nil {
			return fmt.Errorf("app.Firestore: %w", err)
		}

		Firestore = fs
	}
}

func getenvDefault(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}
