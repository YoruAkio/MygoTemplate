package settings

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"

	"mygo/internal/paths"
)

const (
	DefaultAppearance = "dark"
	DefaultThemeName  = "default"
	DefaultFont       = "default"
	DefaultFontSize   = 16
	MinFontSize       = 12
	MaxFontSize       = 20
	DefaultZoom       = 100
	MinZoom           = 70
	MaxZoom           = 150
)

var validThemes = map[string]bool{
	"default":     true,
	"catppuccin":  true,
	"rose_pine":   true,
	"dark_plus":   true,
	"dracula":     true,
	"tokyo_night": true,
}

// Settings represents persisted user preferences
type Settings struct {
	Appearance string `json:"appearance"`
	LightTheme string `json:"lightTheme"`
	DarkTheme  string `json:"darkTheme"`
	Font       string `json:"font"`
	FontSize   uint32 `json:"fontSize"`
	Zoom       uint32 `json:"zoom"`
}

// Defaults returns default settings values
func Defaults() Settings {
	return Settings{
		Appearance: DefaultAppearance,
		LightTheme: DefaultThemeName,
		DarkTheme:  DefaultThemeName,
		Font:       DefaultFont,
		FontSize:   DefaultFontSize,
		Zoom:       DefaultZoom,
	}
}

// Sanitized clamps numeric fields and resets unknown enum values to defaults
func (s Settings) Sanitized() Settings {
	if s.Appearance != "dark" && s.Appearance != "light" {
		s.Appearance = DefaultAppearance
	}

	if !validThemes[s.LightTheme] {
		s.LightTheme = DefaultThemeName
	}
	if !validThemes[s.DarkTheme] {
		s.DarkTheme = DefaultThemeName
	}

	if strings.TrimSpace(s.Font) == "" {
		s.Font = DefaultFont
	}

	if s.FontSize < MinFontSize {
		s.FontSize = MinFontSize
	} else if s.FontSize > MaxFontSize {
		s.FontSize = MaxFontSize
	}

	if s.Zoom < MinZoom {
		s.Zoom = MinZoom
	} else if s.Zoom > MaxZoom {
		s.Zoom = MaxZoom
	}

	return s
}

// Load reads settings from disk, falling back to defaults on any error
func Load() Settings {
	file, err := paths.SettingsFilePath()
	if err != nil {
		return Defaults()
	}

	data, err := os.ReadFile(file)
	if err != nil {
		return Defaults()
	}

	s := Defaults()
	if err := json.Unmarshal(data, &s); err != nil {
		return Defaults()
	}
	return s.Sanitized()
}

// Save writes sanitized settings to disk as formatted json
func Save(s Settings) error {
	file, err := paths.SettingsFilePath()
	if err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(file), 0755); err != nil {
		return err
	}

	data, err := json.MarshalIndent(s.Sanitized(), "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(file, data, 0644)
}
