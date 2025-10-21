package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type AppConfig struct {
	Port          string
	ProjectID     string
	JWTSecret     string
	JWTExpiresHrs int
	UsuariosCol   string
	Firestore     *firestore.Client
}

var C AppConfig

func Init() {
	_ = godotenv.Load()

	C.Port = getEnv("PORT", "3000")
	C.ProjectID = mustEnv("GCP_PROJECT_ID")
	C.JWTSecret = mustEnv("JWT_SECRET")
	C.JWTExpiresHrs = getEnvInt("JWT_EXPIRES_HOURS", 2)
	C.UsuariosCol = getEnv("FIRESTORE_COLLECTION_USUARIOS", "usuarios")

	credPath := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")
	ctx := context.Background()

	var client *firestore.Client
	var err error
	if credPath != "" {
		client, err = firestore.NewClient(ctx, C.ProjectID, option.WithCredentialsFile(credPath))
	} else {
		client, err = firestore.NewClient(ctx, C.ProjectID)
	}
	if err != nil {
		log.Fatalf("firestore client error: %v", err)
	}
	C.Firestore = client
}

func Close() {
	if C.Firestore != nil {
		_ = C.Firestore.Close()
	}
}

func mustEnv(k string) string {
	v := os.Getenv(k)
	if v == "" {
		log.Fatalf("Missing required env var: %s", k)
	}
	return v
}

func getEnv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func getEnvInt(key string, def int) int {
	if v := os.Getenv(key); v != "" {
		var x int
		_, err := fmt.Sscanf(v, "%d", &x)
		if err == nil {
			return x
		}
	}
	return def
}
