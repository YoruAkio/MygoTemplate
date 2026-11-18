package settings

import (
	"os"
	"testing"
)

func TestDefaultsAndSanitization(t *testing.T) {
	s := Defaults()
	if s.Appearance != DefaultAppearance {
		t.Fatalf("expected %s, got %s", DefaultAppearance, s.Appearance)
	}
	if s.FontSize != DefaultFontSize {
		t.Fatalf("expected %d, got %d", DefaultFontSize, s.FontSize)
	}

	s.FontSize = 999
	s.Zoom = 10
	s.Appearance = "neon"
	s.LightTheme = "unknown"
	s.DarkTheme = "invalid"
	s.Font = "   "
	s = s.Sanitized()

	if s.FontSize != MaxFontSize {
		t.Fatalf("expected clamped font size %d, got %d", MaxFontSize, s.FontSize)
	}
	if s.Zoom != MinZoom {
		t.Fatalf("expected clamped zoom %d, got %d", MinZoom, s.Zoom)
	}
	if s.Appearance != DefaultAppearance {
		t.Fatalf("expected default appearance %s, got %s", DefaultAppearance, s.Appearance)
	}
	if s.LightTheme != DefaultThemeName || s.DarkTheme != DefaultThemeName {
		t.Fatalf("expected default themes, got light=%s dark=%s", s.LightTheme, s.DarkTheme)
	}
	if s.Font != DefaultFont {
		t.Fatalf("expected default font %s, got %s", DefaultFont, s.Font)
	}

	s.LightTheme = "dracula"
	s.DarkTheme = "catppuccin"
	s = s.Sanitized()
	if s.LightTheme != "dracula" || s.DarkTheme != "catppuccin" {
		t.Fatalf("expected valid themes to persist, got light=%s dark=%s", s.LightTheme, s.DarkTheme)
	}
}

func TestSaveAndLoad(t *testing.T) {
	tmpDir, err := os.MkdirTemp("", "mygo-settings-*")
	if err != nil {
		t.Fatal(err)
	}
	defer os.RemoveAll(tmpDir)

	t.Setenv("XDG_DATA_HOME", tmpDir)

	s := Defaults()
	s.Appearance = "light"
	s.LightTheme = "rose_pine"
	s.Zoom = 115

	if err := Save(s); err != nil {
		t.Fatal(err)
	}

	loaded := Load()
	if loaded.Appearance != "light" {
		t.Fatalf("expected light, got %s", loaded.Appearance)
	}
	if loaded.LightTheme != "rose_pine" {
		t.Fatalf("expected rose_pine, got %s", loaded.LightTheme)
	}
	if loaded.Zoom != 115 {
		t.Fatalf("expected zoom 115, got %d", loaded.Zoom)
	}
}
