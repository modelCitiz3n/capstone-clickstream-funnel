# Decisions Log
**Project:** E-Commerce Clickstream Funnel Analysis (Capstone)  
**Owner:** Jordan  
**Date Started:** 2026-02-20  
**Purpose:** Record scope, metric, and reporting decisions to prevent drift and support the final write-up.

---

## Decision Table

| Date | Decision | Reason | Impact |
|------|----------|--------|--------|
| 2026-02-20 | Capstone scope constrained to descriptive + diagnostic only | Keep project finishable in a couple hours | No ML/predictive; insights focus on funnel + segmentation |
| 2026-02-20 | Deliverables capped at 3 dashboards + 10–12 slides | Prevent scope creep | Limits analysis depth to what supports core business questions |
| 2026-02-20 | Primary scope control = single-month time slice | Speed + clarity | Results framed as “in the observed month” |
| 2026-02-20 | Funnel metrics computed as event-based proxies by default | Dataset is event-level | Must label conversion rates as proxies if not session-path based |
| 2026-02-20 | Revenue defined as SUM(price) on purchase events | Directly supported by dataset | Revenue is event-derived; currency treated as “as provided” |
| 2026-02-20 | AOV reported only as “Average Purchase Value (proxy)” | Order/session grouping may be ambiguous | Avoid overstating precision |
| 2026-02-20 | Price banding limited to 3 bands (Low/Mid/High) for speed | Keep dashboards simple | Thresholds may adjust after distribution check, but remain 3 bands |
| 2026-02-20 | Raw Kaggle CSV stored only in Codespaces; Tableau uses small aggregated CSV exports | Work laptop storage constraints | Tableau connects to `exports/tableau_inputs/*.csv`; raw data never downloaded locally |

---

## Pending decisions (to be filled during Tableau setup)
- **Which category field is “canonical” for reporting** (`category` vs `category_code`)
- **Exact month selected** for the time slice (e.g., YYYY-MM)
- **Whether `user_session` is stable enough** to use session-based AOV proxy
- **Final price band thresholds** (only if distribution makes baseline unusable)