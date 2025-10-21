package routes

import (
	"net/http"

	"backend-go-ad2025/internal/controllers"
	"backend-go-ad2025/internal/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func SetupRouter(uc *controllers.UserController) http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))
	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("Servidor funcionando")) })

	r.Route("/api", func(api chi.Router) {
		api.Post("/auth/register", uc.Register)
		api.Post("/auth/login", uc.Login)

		api.Route("/usuarios", func(ur chi.Router) {
			ur.Use(middleware.Auth)
			ur.Get("/", uc.List)
			ur.Get("/{id}", uc.GetByID)
			ur.Post("/", uc.Register)
			ur.Put("/{id}", uc.Update)
			ur.Delete("/{id}", uc.Delete)
		})
	})

	return r
}
