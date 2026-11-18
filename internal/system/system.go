package system

import (
	"bufio"
	"os"
	"runtime"
	"strconv"
	"strings"
)

// Info describes the host environment running the desktop app
type Info struct {
	OS            string `json:"os"`
	Arch          string `json:"arch"`
	GoVersion     string `json:"goVersion"`
	TotalMemoryMB uint32 `json:"totalMemoryMb"`
}

// GetInfo collects basic runtime and memory details without cgo
func GetInfo() Info {
	return Info{
		OS:            runtime.GOOS,
		Arch:          runtime.GOARCH,
		GoVersion:     runtime.Version(),
		TotalMemoryMB: TotalMemoryMB(),
	}
}

// TotalMemoryMB returns host physical memory in megabytes
func TotalMemoryMB() uint32 {
	switch runtime.GOOS {
	case "linux":
		return linuxTotalMemoryMB()
	default:
		return 8192
	}
}

func linuxTotalMemoryMB() uint32 {
	file, err := os.Open("/proc/meminfo")
	if err != nil {
		return 8192
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "MemTotal:") {
			fields := strings.Fields(line)
			if len(fields) >= 2 {
				kb, err := strconv.ParseUint(fields[1], 10, 64)
				if err == nil && kb > 0 {
					return uint32(kb / 1024)
				}
			}
		}
	}
	return 8192
}
