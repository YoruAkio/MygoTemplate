# Mygo

Monorepo starter template for desktop apps built with [MyGo](https://github.com/egoist/mygo), pure Go, React 19, and Tailwind CSS v4. Everything compiles with `CGO_ENABLED=0`, so you don't need a C toolchain to build or test.

## What's included

The backend lives in `main.go` and `internal/`, wired to a Bun workspace frontend split between the desktop shell (`apps/client`) and a reusable component library (`packages/ui`).

- **Typed Go IPC**: `AppService`, `SettingsService`, and `SystemService` bound in `main.go`, plus a 1-second `Tick` event stream. Running `bun run generate` writes the client to `apps/client/src/mygo.ts`.
- **Browser preview fallback**: `apps/client/src/store.ts` checks `isMyGo()` and falls back to `localStorage` and mock data when you open Vite directly in a browser.
- **Persistent settings**: JSON preferences stored in the platform app data directory (`internal/paths` and `internal/settings`) with value clamping and safe defaults.
- **UI shell and themes**: Collapsible sidebar rail, page transitions with Motion, six built-in light and dark palettes (Default, Catppuccin, Rosé Pine, Dark+, Dracula, Tokyo Night), system font discovery, and UI scaling (`Ctrl/Cmd +`, `-`, `0`).
- **Component primitives**: `Button`, `Card`, `Input`, `Badge`, `Separator`, `Modal`, `Dropdown`, `Icon`, and toast notifications (`sonner`) exported from `@mygo/ui`.

## Layout

```text
.
├── main.go                  # app setup, service bindings, window creation
├── glib_linux.go            # sets glib prgname on linux for webkitgtk storage
├── mygo.config.ts           # mygo cli config (devUrl, dist, bindings path)
├── internal/
│   ├── api/                 # bound go services and go-to-frontend events
│   ├── fonts/               # host font discovery with static fallback
│   ├── paths/               # cross-platform app data directory helpers
│   ├── settings/            # json settings load/save with sanitization
│   └── system/              # os, arch, go version, and total ram info
├── apps/
│   └── client/              # @mygo/client (react 19, vite 8, store hooks, app shell)
├── packages/
│   └── ui/                  # @mygo/ui (components, palettes, motion presets, tailwind tokens)
└── scripts/
    └── bump-version.ts      # keeps manifests, config, APP_VERSION, and changelog in sync
```

## Requirements

- [Bun](https://bun.sh) 1.2+
- [Go](https://go.dev) 1.27+
- WebKitGTK 2.16+ on Linux

## Getting started

Install dependencies and sync Go modules:

```bash
bun install
go mod tidy
```

Run the full desktop app with hot reload:

```bash
bun run dev
```

Or run only the Vite frontend on `http://localhost:5173` for quick UI work in a browser:

```bash
bun run dev:web
```

Whenever you add or change exported methods on Go services in `internal/api/`, regenerate the TypeScript bindings:

```bash
bun run generate
```

## Checks, tests, and builds

```bash
# format with oxfmt
bun run format

# lint with oxlint and typecheck all workspaces
bun run check

# build the frontend bundle into apps/client/dist
bun run build:web

# build the desktop binary
bun run build

# run go tests without cgo
CGO_ENABLED=0 go test ./...
```

## Versioning

Update the version across `package.json`, workspace manifests, `mygo.config.ts`, `APP_VERSION`, and `CHANGELOG.md` in one step:

```bash
bun run bump-version patch
bun run bump-version minor
bun run bump-version major
bun run bump-version 1.0.0
```

## Using this as a template

When starting a new app from this repo, swap out the template identifiers:

1. Change the Go module name in `go.mod` and update the `mygo/internal/...` import paths in `main.go` and `internal/`.
2. Update `name` and `identifier` in `mygo.config.ts`, `AppDirName` in `internal/paths/paths.go`, and the window title / app name in `main.go`, `apps/client/index.html`, and `apps/client/src/App.tsx`.
3. Replace the `@mygo/*` workspace scope in `package.json`, `apps/client/package.json`, `packages/ui/package.json`, `tsconfig.base.json`, and `apps/client/tsconfig.json`, then run `bun install`.
4. Drop your own icon into `resources/icon.png` and `apps/client/public/icon.png`, replace the starter pages (`HomePage`, `ComponentsPage`), and register your services in `internal/api/services.go` and `main.go`.
