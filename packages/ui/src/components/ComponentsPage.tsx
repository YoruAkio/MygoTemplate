import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Modal } from "./ui/modal";
import { Separator } from "./ui/separator";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";
import type { Theme } from "../theme";

const ENVIRONMENTS = ["Development", "Staging", "Production"] as const;

// reference page demonstrating reusable primitives exported from @mygo/ui
export function ComponentsPage({ theme }: { theme: Theme }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [env, setEnv] = useState<(typeof ENVIRONMENTS)[number]>("Development");
  const [note, setNote] = useState("");

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight m-0">Components</h1>
        <p className="text-sm m-0" style={{ color: theme.mutedForeground }}>
          Shared primitives in <code className="font-mono text-xs">packages/ui</code> ready to reuse
          or replace with your app views.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Buttons & Badges</CardTitle>
          <CardDescription>Variant primitives backed by theme CSS tokens.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => toast.success("Primary action triggered")}>Primary</Button>
            <Button variant="secondary" onClick={() => toast("Secondary action triggered")}>
              Secondary
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive" onClick={() => toast.error("Destructive example")}>
              Destructive
            </Button>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inputs & Dropdowns</CardTitle>
          <CardDescription>
            Controlled form elements matching active light/dark themes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: theme.mutedForeground }}>
              Text Input
            </label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type something..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: theme.mutedForeground }}>
              Target Environment
            </label>
            <Dropdown
              value={env}
              options={ENVIRONMENTS}
              render={(option) => option}
              onChange={(next) => {
                setEnv(next);
                toast.info(`Selected ${next}`);
              }}
              theme={theme}
            />
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        theme={theme}
        title={
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <Icon name="sparkles" size={15} color={theme.primary} />
            Template Modal
          </span>
        }
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setModalOpen(false);
                toast.success("Confirmed modal action");
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-sm m-0" style={{ color: theme.mutedForeground }}>
          Use <code className="font-mono text-xs">Modal</code> from{" "}
          <code className="font-mono text-xs">@mygo/ui</code> for confirmations, forms, or detail
          sheets. Press Escape or click outside to dismiss.
        </p>
      </Modal>
    </div>
  );
}
