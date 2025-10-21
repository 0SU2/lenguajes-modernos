package main

import (
	"log"
	"net/http"

	"backend-go-ad2025/internal/config"
	"backend-go-ad2025/internal/controllers"
	"backend-go-ad2025/internal/repositories"
	"backend-go-ad2025/internal/routes"
	"backend-go-ad2025/internal/services"
)

func main() {
	config.Init()
	defer config.Close()

	repo := repositories.NewUserRepository()
	svc := services.NewUserService(repo)
	uc := controllers.NewUserController(svc)

	h := routes.SetupRouter(uc)

	addr := ":" + config.C.Port
	log.Printf("Server listening on %s", addr)
	if err := http.ListenAndServe(addr, h); err != nil {
		log.Fatal(err)
	}
}
