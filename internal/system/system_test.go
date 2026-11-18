package system

import (
	"runtime"
	"testing"
)

func TestGetInfo(t *testing.T) {
	info := GetInfo()
	if info.OS != runtime.GOOS {
		t.Fatalf("expected os %s, got %s", runtime.GOOS, info.OS)
	}
	if info.Arch != runtime.GOARCH {
		t.Fatalf("expected arch %s, got %s", runtime.GOARCH, info.Arch)
	}
	if info.TotalMemoryMB == 0 {
		t.Fatalf("expected non-zero memory")
	}
}
