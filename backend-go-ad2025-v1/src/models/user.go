package models

import "time"

type User struct {
	ID        string    `json:"id,omitempty" firestore:"-"`
	Nombre    string    `json:"nombre,omitempty" firestore:"nombre"`
	Apaterno  string    `json:"apaterno,omitempty" firestore:"apaterno"`
	Amaterno  string    `json:"amantero,omitempty" firestore:"amaterno"`
	Direccion string    `json:"direccion,omitempty" firestore:"direccion"`
	Telefono  string    `json:"telefono,omitempty" firestore:"telefono"`
	Ciudad    string    `json:"ciudad,omitempty" firestore:"ciudad"`
	Estado    string    `json:"estado,omitempty" firestore:"estado"`
	Usuario   string    `json:"usuario,omitempty" firestore:"usuario"`
	Password  string    `json:"password,omitempty" firestore:"password"`
	CreateAt  time.Time `json:"createat" firestore:"password"`
	UpdateAt  time.Time `json:"updateat" firestore:"password"`
}
