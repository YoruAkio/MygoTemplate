package api

import (
	"strings"

	"mygo/internal/fonts"
	"mygo/internal/paths"
	"mygo/internal/settings"
	"mygo/internal/system"
)

// AppService provides starter template ipc methods callable from the frontend
type AppService struct{}

// Greet returns a greeting string for name
func (AppService) Greet(name string) string {
	trimmed := strings.TrimSpace(name)
	if trimmed == "" {
		trimmed = "stranger"
	}
	return "Hello, " + trimmed + "! Response from Go."
}

// GetDataDir returns the resolved platform data directory for the app
func (AppService) GetDataDir() (string, error) {
	return paths.AppDataRoot()
}

// SettingsService handles persisted user preferences
type SettingsService struct{}

// LoadSettings reads preferences from disk with safe defaults
func (SettingsService) LoadSettings() settings.Settings {
	return settings.Load()
}

// SaveSettings writes preferences to disk
func (SettingsService) SaveSettings(cfg settings.Settings) error {
	return settings.Save(cfg)
}

// SystemService exposes host system capabilities
type SystemService struct{}

// GetInfo returns host os, architecture, go version, and total memory
func (SystemService) GetInfo() system.Info {
	return system.GetInfo()
}

// ListFonts returns installed font families on the host
func (SystemService) ListFonts() []string {
	return fonts.Installed()
}
