<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Verification: don't use Playwright or screenshots

This site is heavily animated (scroll-driven transitions, Lenis smooth scroll, motion/react transforms, tilt-on-hover). Stills and headless browser automation can't observe the behavior that matters — they capture either an inert frame or a state that doesn't match how the user experiences it through real wheel/trackpad input. The user verifies animation work manually in a real browser.

When making UI changes:
- Don't spin up Playwright, take screenshots, or write automation scripts to "verify" the change.
- Don't claim a UI change works based on static inspection.
- Do typecheck and confirm the dev server compiles, then hand off — say explicitly that animation behavior needs a manual look.
