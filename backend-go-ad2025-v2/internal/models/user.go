package models

type Usuario struct {
	ID        string `json:"id,omitempty"`
	Nombre    string `json:"nombre"`
	APaterno  string `json:"apaterno"`
	AMaterno  string `json:"amaterno"`
	Direccion string `json:"direccion"`
	Telefono  string `json:"telefono"`
	Ciudad    string `json:"ciudad"`
	Estado    string `json:"estado"`
	Email     string `json:"email"`
	Usuario   string `json:"usuario"`
	Password  string `json:"password,omitempty"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
	Deleted   bool   `json:"deleted"`
}
