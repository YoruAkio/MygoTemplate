package main

import (
	"log"
	"time"

	"mygo/internal/api"
	"github.com/egoist/mygo"
)

func main() {
	initPlatformPrgname("Mygo")
	mygo.App.SetName("Mygo")

	mygo.Bind(
		api.AppService{},
		api.SettingsService{},
		api.SystemService{},
	)

	mygo.App.WhenReady(func() {
		win := mygo.NewWindow(mygo.WindowOptions{
			Title:           "Mygo",
			Width:           1080,
			Height:          700,
			MinWidth:        820,
			MinHeight:       540,
			BackgroundColor: "light-dark(#f6f5f3, #18181b)",
			StateKey:        "main",
			URL:             "/",
		})

		// stream a 1s heartbeat event to demonstrate go-to-frontend events
		go func() {
			ticker := time.NewTicker(time.Second)
			defer ticker.Stop()
			for t := range ticker.C {
				if api.Tick.Emit(win, t.Format(time.RFC3339)) != nil {
					return
				}
			}
		}()
	})

	if err := mygo.App.Run(); err != nil {
		log.Fatal(err)
	}
}
