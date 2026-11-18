import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Icon } from "./Icon";
import type { Theme } from "../theme";

export type SystemSummary = {
  os: string;
  arch: string;
  goVersion: string;
  totalMemoryMb: number;
};

// starter dashboard demonstrating typed go rpc calls, live events, and layout cards
export function HomePage({
  appName = "Mygo",
  theme,
  systemInfo,
  dataDir,
  clockText,
  isDesktop,
  onGreet,
  onOpenComponents,
  onOpenSettings,
}: {
  appName?: string;
  theme: Theme;
  systemInfo: SystemSummary | null;
  dataDir: string;
  clockText: string;
  isDesktop: boolean;
  onGreet: (name: string) => Promise<string>;
  onOpenComponents: () => void;
  onOpenSettings: () => void;
}) {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const reply = await onGreet(name);
      setGreeting(reply);
    } finally {
      setSubmitting(false);
    }
  };

  const memoryGb = systemInfo ? `${(systemInfo.totalMemoryMb / 1024).toFixed(1)} GB` : "--";

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight m-0">{appName}</h1>
            <Badge variant={isDesktop ? "primary" : "secondary"}>
              {isDesktop ? "MyGo Desktop" : "Web Preview"}
            </Badge>
          </div>
          <p className="text-sm m-0" style={{ color: theme.mutedForeground }}>
            Starter monorepo shell with Go IPC services, persistent settings, and shared UI
            components.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onOpenComponents}>
            <Icon name="components" size={14} />
            UI Kit
          </Button>
          <Button variant="secondary" size="sm" onClick={onOpenSettings}>
            <Icon name="settings" size={14} />
            Settings
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="terminal" size={16} color={theme.primary} />
            Go IPC Command
          </CardTitle>
          <CardDescription>
            Calls <code className="font-mono text-xs">AppService.Greet</code> through generated
            TypeScript bindings in{" "}
            <code className="font-mono text-xs">apps/client/src/mygo.ts</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name to send to Go..."
              autoComplete="off"
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Calling..." : "Greet"}
            </Button>
          </form>

          {greeting && (
            <div
              className="rounded-lg px-3.5 py-2.5 text-sm font-medium"
              style={{ background: theme.secondary, color: theme.foreground }}
            >
              {greeting}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <Icon name="cpu" size={14} />
              Runtime
            </CardDescription>
            <CardTitle className="text-base font-mono">
              {systemInfo ? `${systemInfo.os}/${systemInfo.arch}` : "browser"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs" style={{ color: theme.mutedForeground }}>
            {systemInfo
              ? `${systemInfo.goVersion} · ${memoryGb} RAM`
              : "Run via bun run dev for Go stats"}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <Icon name="clock" size={14} />
              Go Event Stream
            </CardDescription>
            <CardTitle className="text-base font-mono tabular-nums">
              {clockText || "--:--:--"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs" style={{ color: theme.mutedForeground }}>
            Driven by <code className="font-mono">events.tick.on(...)</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <Icon name="folder" size={14} />
              App Data Directory
            </CardDescription>
            <CardTitle className="text-sm font-mono truncate" title={dataDir}>
              {dataDir || "Browser storage"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs" style={{ color: theme.mutedForeground }}>
            Settings persist as JSON via <code className="font-mono">internal/settings</code>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
