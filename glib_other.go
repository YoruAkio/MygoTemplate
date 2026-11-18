//go:build !linux

package main

// initPlatformPrgname is a no-op on non-linux platforms
func initPlatformPrgname(string) {}
