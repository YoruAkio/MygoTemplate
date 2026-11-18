# AGENTS.md

Repository reference for Mygo, a MyGo desktop application monorepo template.

## Stack

- Desktop framework: MyGo (pure Go, no cgo)
- Backend: Go 1.27+ under `main.go` and `internal/`
- Frontend: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion
- Package manager: Bun workspaces (`apps/*`, `packages/*`)

## Commands

```bash
# install js/ts workspace dependencies
bun install

# sync go module dependencies
go mod tidy

# run full desktop app in dev mode
bun run dev

# run web frontend only (vite on localhost:5173)
bun run dev:web

# regenerate apps/client/src/mygo.ts from go services and events
bun run generate

# lint and typecheck across all workspaces
bun run check

# format code with oxfmt
bun run format

# build web frontend
bun run build:web

# build production desktop binary
bun run build

# run go unit tests without cgo
CGO_ENABLED=0 go test ./...

# bump version across manifests, config, and changelog
bun run bump-version patch
```

## Layout

- `main.go`, `glib_linux.go`, `glib_other.go`: app entry point, service bindings, window creation, and Linux glib prgname setup.
- `internal/api/`: bound Go services (`services.go`) and typed Go-to-frontend events (`events.go`).
- `internal/paths/`: cross-platform app data directory helpers.
- `internal/settings/`: JSON settings load/save with clamping and safe defaults.
- `internal/system/`: host OS, arch, Go version, and total RAM inspection.
- `internal/fonts/`: system font discovery with cross-platform fallback.
- `apps/client/`: desktop React client (`@mygo/client`), store hooks (`src/store.ts`), and generated MyGo IPC client (`src/mygo.ts`).
- `packages/ui/`: reusable UI components, themes, motion presets, and Tailwind v4 tokens (`@mygo/ui`).
- `scripts/bump-version.ts`: keeps package versions, `mygo.config.ts`, `APP_VERSION`, and `CHANGELOG.md` aligned.

## Conventions

- Keep Go code pure Go (`CGO_ENABLED=0`) so cross-platform builds stay simple.
- Register new frontend-callable Go structs in `main.go` via `mygo.Bind(...)` and run `bun run generate`.
- Put reusable UI primitives and page shells in `packages/ui`, and keep app state and IPC wiring in `apps/client`.
- Run `bun run check`, `bun run build:web`, and `CGO_ENABLED=0 go test ./...` after changes.
