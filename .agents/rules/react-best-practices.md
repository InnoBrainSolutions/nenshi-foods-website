# Antigravity — React & Next.js Best Practices

## Purpose

Use this document as the default engineering guidance when building, reviewing, refactoring, or optimizing React and Next.js applications.

The goal is not to blindly apply every rule. Apply the rules when they are relevant to the code and prioritize high-impact performance improvements first.

---

## 1. Core Principles

1. Prefer simple, readable React and Next.js code.
2. Avoid unnecessary network waterfalls.
3. Keep client-side JavaScript and bundles small.
4. Prefer server-side work when it reduces client cost.
5. Minimize unnecessary React re-renders.
6. Avoid unnecessary DOM and JavaScript work.
7. Preserve existing behavior unless a change is explicitly requested.
8. Do not optimize prematurely when the optimization makes the code substantially harder to understand.
9. When making a performance optimization, explain the reason briefly in the code review or final summary.
10. For Next.js, respect Server Components and Client Component boundaries.

---

## 2. CRITICAL — Eliminate Async Waterfalls

### async-cheap-condition-before-await
Check cheap synchronous conditions before awaiting remote or expensive values when possible.
Avoid doing asynchronous work that may not be needed.

### async-defer-await
Do not await a promise earlier than necessary. Start work early and await it only in the branch where its result is required.

### async-parallel
If multiple asynchronous operations are independent, run them in parallel with `Promise.all`.

### async-dependencies
When operations have partial dependencies, structure them so independent work starts as early as possible.

### async-api-routes
In API routes, start independent promises early and await them as late as practical.

### async-suspense-boundaries
Use React/Next.js Suspense boundaries when appropriate to allow parts of the page to stream independently.

---

## 3. CRITICAL — Bundle Size Optimization

### bundle-barrel-imports
Prefer direct imports instead of importing through large barrel files when doing so causes unnecessary module loading.

### bundle-analyzable-paths
Prefer statically analyzable imports and file-system paths.

### bundle-dynamic-imports
Use dynamic imports for heavy components that do not need to be loaded immediately (`React.lazy` or `next/dynamic`).

### bundle-defer-third-party
Do not load analytics, logging, or other non-critical third-party code before the application needs it.

### bundle-conditional
Load feature-specific modules only when the feature is actually activated.

### bundle-preload
Where appropriate, preload resources based on user intent such as hover or focus.

---

## 4. HIGH — Server-Side Performance

### server-auth-actions
Authenticate Server Actions just as carefully as API routes.

### server-cache-react
Use `React.cache()` for per-request deduplication when multiple parts of the server-rendered application need the same data.

### server-cache-lru
Use an LRU cache when cross-request caching is appropriate.

### server-dedup-props
Avoid sending the same large data repeatedly through React Server Component props.

### server-hoist-static-io
Hoist static I/O such as static resources and configuration out of frequently executed functions when safe.

### server-no-shared-module-state
Do not keep mutable request-specific state at module scope in SSR/RSC code.

### server-serialization
Send only the data a Client Component actually needs.

### server-parallel-fetching
Structure server components so independent data fetching can happen in parallel.

### server-parallel-nested-fetching
For nested data, parallelize independent work per item where appropriate.

### server-after-nonblocking
Use Next.js `after()` for appropriate non-blocking work that should happen after the response-related work.

---

## 5. MEDIUM-HIGH — Client-Side Data Fetching

### client-swr-dedup
Use a data-fetching library such as SWR when it provides useful request deduplication, caching, and revalidation.

### client-event-listeners
Avoid registering the same global event listener repeatedly. Centralize or deduplicate global listeners.

### client-passive-event-listeners
Use passive event listeners for appropriate scroll/touch listeners (`{ passive: true }`) to avoid unnecessarily blocking browser scrolling.

### client-localstorage-schema
Version and minimize localStorage/sessionStorage data.

---

## 6. MEDIUM — React Re-render Optimization

### rerender-defer-reads
Do not subscribe a component to state that it only needs inside an event callback.

### rerender-memo
Extract expensive work into memoized components when there is a measurable or obvious benefit. Do not use `React.memo` everywhere.

### rerender-memo-with-default-value
Hoist default non-primitive props so their identity does not change unnecessarily.

### rerender-dependencies
Use primitive, precise dependencies in effects instead of broad object dependencies when possible.

### rerender-derived-state
Subscribe to derived values when the component only needs the derived value.

### rerender-derived-state-no-effect
Prefer deriving values during render instead of using an effect to calculate derived state.

### rerender-functional-setstate
Use functional state updates when the next state depends on the previous state (`setCount(prev => prev + 1)`).

### rerender-lazy-state-init
Use lazy initialization for expensive initial state calculations (`useState(() => init())`).

### rerender-simple-expression-in-memo
Do not wrap trivial calculations in `useMemo` simply for the sake of optimization.

### rerender-split-combined-hooks
Separate hooks with unrelated dependencies when that improves correctness or avoids unnecessary work.

### rerender-move-effect-to-event
Put interaction-specific logic in event handlers rather than effects where possible.

### rerender-transitions
Use `startTransition` for non-urgent state updates that can be deferred.

### rerender-use-deferred-value
Use `useDeferredValue` when expensive rendering should not block urgent input updates.

### rerender-use-ref-transient-values
Use refs for rapidly changing transient values that do not need to trigger rendering.

### rerender-no-inline-components
Do not define React components inside another component unless there is a strong reason. Prefer module-level component definitions.

---

## 7. MEDIUM — Rendering Performance

### rendering-animate-svg-wrapper
When appropriate, animate a wrapper around an SVG rather than repeatedly animating the SVG element itself.

### rendering-content-visibility
Use CSS `content-visibility` for appropriate long lists or large off-screen sections.

### rendering-hoist-jsx
Move truly static JSX outside components when doing so improves rendering work without reducing readability.

### rendering-svg-precision
Avoid unnecessarily excessive SVG coordinate precision.

### rendering-hydration-no-flicker
For client-only values that must be available during initial rendering, use appropriate hydration strategies to avoid visible flicker.

### rendering-hydration-suppress-warning
Use `suppressHydrationWarning` only when the mismatch is intentional and understood.

### rendering-activity
Use React Activity where appropriate for showing/hiding expensive UI while preserving useful state.

### rendering-conditional-render
Prefer explicit conditional expressions where they make rendering behavior clearer.

### rendering-usetransition-loading
Use `useTransition` where it provides a better loading/update experience.

### rendering-resource-hints
Use appropriate React/HTML resource hints for critical resources.

### rendering-script-defer-async
Use `defer` or `async` appropriately for non-blocking scripts.

---

## 8. LOW-MEDIUM — JavaScript Performance

### js-batch-dom-css
Batch DOM/CSS changes instead of repeatedly forcing layout work.

### js-index-maps
For repeated lookups, create an index with Map when appropriate.

### js-cache-property-access
Cache repeatedly accessed object properties inside hot loops when it provides a meaningful benefit.

### js-cache-function-results
Cache expensive deterministic function results when appropriate.

### js-cache-storage
Avoid repeatedly reading localStorage/sessionStorage in hot paths.

### js-combine-iterations
Avoid unnecessary multiple passes over large collections.

### js-length-check-first
Use cheap checks before expensive comparisons when appropriate.

### js-early-exit
Return early when the result is already known.

### js-hoist-regexp
Do not repeatedly construct the same RegExp inside a hot loop.

### js-min-max-loop
Do not sort a collection just to find its minimum or maximum.

### js-set-map-lookups
Use Set/Map for repeated membership or key lookups.

### js-tosorted-immutable
Use `toSorted()` when sorting data while preserving the original array.

### js-flatmap-filter
Use `flatMap` where it clearly combines mapping and filtering without reducing readability.

### js-request-idle-callback
Defer non-critical browser work until idle time when appropriate.

---

## 9. LOW — Advanced Patterns

### advanced-effect-event-deps
When using `useEffectEvent`, follow its dependency semantics correctly.

### advanced-event-handler-refs
Use refs for stable event-handler references when an advanced pattern genuinely requires them.

### advanced-init-once
Initialize application-wide resources only once per application load when appropriate.

### advanced-use-latest
Use a `useLatest`-style ref pattern only when stable access to the latest value is actually required.

---

## 10. Review Workflow & Output Requirements

When completing performance or refactoring tasks:
1. State **what was changed**.
2. State **why** and cite the specific rule (e.g. `client-passive-event-listeners`, `rerender-lazy-state-init`, `bundle-dynamic-imports`).
3. State **what was intentionally NOT changed** to avoid cargo-cult optimization.
4. Report **validation** results (`oxlint`, `vite build`, bundle sizes).
