import { useEffect, useRef, useState } from "react"

// Base scaffold home page.
//
// This renders ONLY before the generated app's own pages replace it — first
// build, DB provisioning, sandbox cold-boot / restart, or a brief reload. The
// page on its own can't tell "a build is happening" from "this project is
// genuinely empty", so the PARENT editor (which knows) pushes the state in via
// postMessage `chantan:host-state { building }`:
//   • building  → "Preparing your workspace" loader (the real app is coming).
//   • idle      → an inviting empty-state ("describe your app to get started").
// Safety: if the loader has been up a long time with no real app replacing this
// page, fall back to a gentle "taking longer than usual" hint — so it can never
// spin forever. This only swaps THIS page's own content; it never holds a cover
// open, so it can't get stuck over a ready app.

// Long, deliberately generous: a real first build (image generation + multiple
// steps) routinely runs well past a minute, and the sandbox cold-boot/restart
// adds more. This fallback must NEVER fire during a normal start — it exists
// only to reassure on a genuinely abnormal hang, and even then it only softens
// THIS page's own copy (it never blocks or covers a ready app).
const STUCK_AFTER_MS = 120_000

const Index = () => {
  // undefined = unknown yet (waiting for the host). Default to the empty-state
  // look; flips to the loader the instant the host replies (sub-100ms).
  const [building, setBuilding] = useState<boolean | undefined>(undefined)
  const [stuck, setStuck] = useState(false)
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "chantan:host-state") {
        setBuilding(!!e.data.building)
      }
    }
    window.addEventListener("message", onMessage)
    // Handshake: ask the host for the current state on mount (covers the race
    // where this listener mounts after the host already pushed).
    try { window.parent?.postMessage({ type: "chantan:request-host-state" }, "*") } catch { /* no parent */ }
    return () => window.removeEventListener("message", onMessage)
  }, [])

  // Safety timeout: only arm it while the loader is showing.
  useEffect(() => {
    if (building) {
      stuckTimer.current = setTimeout(() => setStuck(true), STUCK_AFTER_MS)
    } else {
      setStuck(false)
      if (stuckTimer.current) clearTimeout(stuckTimer.current)
    }
    return () => { if (stuckTimer.current) clearTimeout(stuckTimer.current) }
  }, [building])

  const showLoader = building === true

  return (
    // data-chantan-template marks the UNBUILT base scaffold (loader + idle
    // empty-state). The thumbnail renderer waits while this is in the DOM and
    // never screenshots it — the user's generated app replaces this file, so the
    // marker is gone once the real app renders. Deterministic, language-agnostic
    // (no fragile text matching). Do NOT remove.
    <div data-chantan-template="base" className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-7 text-center">
        {/* soft glow behind the lockup */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 h-40 w-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 68%)",
            filter: "blur(20px)",
            animation: "ct-breathe 3.6s ease-in-out infinite",
          }}
        />

        {/* wordmark */}
        <div
          className="relative flex items-baseline gap-2 select-none"
          style={{ animation: "ct-float 5.5s ease-in-out infinite" }}
        >
          <span className="text-[34px] font-bold tracking-tight leading-none">ChanTan</span>
          <span className="text-[34px] font-light tracking-wide leading-none">Studio</span>
        </div>

        {showLoader ? (
          <>
            {/* spinner */}
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-full border-2 border-current opacity-15" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{ borderTopColor: "currentColor", animation: "ct-spin 0.9s linear infinite" }}
              />
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {stuck ? "Still working — almost there" : "Preparing your workspace"}
            </div>
          </>
        ) : (
          /* idle empty-state — genuinely empty project, or waiting for the host */
          <div className="flex flex-col items-center gap-2 max-w-sm">
            <div className="text-base font-medium">Your live preview will appear here</div>
            <div className="text-sm text-muted-foreground">Describe your app in the chat to get started.</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ct-spin { to { transform: rotate(360deg); } }
        @keyframes ct-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes ct-breathe { 0%,100% { opacity:.35; transform: translateX(-50%) scale(.94); } 50% { opacity:.6; transform: translateX(-50%) scale(1.06); } }
      `}</style>
    </div>
  )
}

export default Index
