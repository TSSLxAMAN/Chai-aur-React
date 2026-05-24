# Dream Portfolio — Claude Instructions

## Graphify Knowledge Graph (RAG)

Before answering any question about codebase architecture, component relationships, data flow, or "where is X defined / what uses Y", **check the graphify knowledge graph first**.

Graph outputs live at `_temp/graphify-out/` relative to this file:

| File | Use for |
|------|---------|
| `_temp/graphify-out/graph.json` | Machine-readable graph — node IDs, edges, community assignments |
| `_temp/graphify-out/GRAPH_REPORT.md` | Human-readable summary — god nodes, surprising connections, community map |
| `_temp/graphify-out/graph.html` | Interactive browser visualization (open directly, no server needed) |

### How to use it

1. **Start with `GRAPH_REPORT.md`** — the God Nodes section tells you which files are the highest-leverage touch points. The Community Hubs section maps the architecture into named clusters.

2. **For "what calls / uses / depends on X" questions** — read `graph.json` and filter edges by `source` or `target` matching the node ID. Edge types: `calls`, `implements`, `references`, `shares_data_with`, `semantically_similar_to`.

3. **For "where should I add this feature" questions** — consult the community the relevant nodes belong to. Adding stock-display logic belongs near `Home Page Component` (community: React App Shell). Adding persistence belongs near `Favourite Redux Slice` (community: Page Components & Entry).

4. **For "is there duplication" questions** — look for `semantically_similar_to` INFERRED edges. The graph has already flagged: `ProfitLossCard` ↔ `SmallProfitLossCard` (0.92 confidence) and `Profit Loss Calculation Logic` duplicated in both `Home` and `Favourite`.

### Key architecture facts (from the graph)

- **God nodes** (most connected): `Home Page Component` (14 edges), `Favourite Stocks Component` (9), `Profit Icon` (7), `App Root Component` (6)
- **Redux pipeline**: `store.js` → `favrouiteSlice.jsx` → `localStorage` ← `Home` + `Favourite`
- **Performance pattern**: `React.memo` applied to `ProfitLossCard`, `SmallProfitLossCard`, `StockTable`, `Note`, `Footer`
- **Known duplication**: profit/loss calculation logic is inline in both `Home.jsx` and `Favourite.jsx` — no shared hook exists yet
- **External data**: `Home` fetches from Upstox Historical Candle API against the hardcoded Nifty Fifty stocks dataset

### Keeping the graph current

Run `/graphify` to rebuild after significant changes. Run `/graphify --update` for incremental updates (only re-extracts changed files).
