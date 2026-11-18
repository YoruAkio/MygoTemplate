package paths

import (
	"os"
	"path/filepath"
	"runtime"
)

const AppDirName = "Mygo"

// AppDataRoot returns and ensures the platform-specific data directory for the app
func AppDataRoot() (string, error) {
	var base string

	switch runtime.GOOS {
	case "windows":
		base = os.Getenv("APPDATA")
		if base == "" {
			home, err := os.UserHomeDir()
			if err != nil {
				return "", err
			}
			base = filepath.Join(home, "AppData", "Roaming")
		}
	case "darwin":
		home, err := os.UserHomeDir()
		if err != nil {
			return "", err
		}
		base = filepath.Join(home, "Library", "Application Support")
	default:
		base = os.Getenv("XDG_DATA_HOME")
		if base == "" {
			home, err := os.UserHomeDir()
			if err != nil {
				return "", err
			}
			base = filepath.Join(home, ".local", "share")
		}
	}

	root := filepath.Join(base, AppDirName)
	if err := os.MkdirAll(root, 0755); err != nil {
		return "", err
	}
	return root, nil
}

// SettingsFilePath returns the path to settings.json inside AppDataRoot
func SettingsFilePath() (string, error) {
	root, err := AppDataRoot()
	if err != nil {
		return "", err
	}
	return filepath.Join(root, "settings.json"), nil
}
