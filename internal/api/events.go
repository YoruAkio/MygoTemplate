package api

import (
	"github.com/egoist/mygo"
)

// Tick emits an rfc3339 timestamp string from go to the frontend every second
var Tick = mygo.NewEvent[string]("tick")
