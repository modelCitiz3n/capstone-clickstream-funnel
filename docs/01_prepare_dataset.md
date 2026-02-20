# PREPARE — Dataset & Credibility Notes
**Project:** E-Commerce Clickstream Funnel Analysis (Capstone)  
**Owner:** Jordan  
**Date:** 2026-02-20  
**Status:** Draft (baseline)

---

## Dataset description (high level)
**Source:** Kaggle — “Ecommerce Behavior Data from Multi-Category Store”

This is an **event-level clickstream** dataset capturing user interactions with products over time. Typical fields include:
- `event_time`
- `event_type` (view, cart, purchase)
- `product_id`
- `category` / `category_code`
- `price`
- `user_id`
- (sometimes) `user_session`

This supports funnel analysis, segmenting performance by category and price band, and identifying behavioral timing patterns.

---

## ROCCC-style credibility assessment (practical)
- **Reliable:** Widely used public dataset; still requires basic QA (nulls, duplicates, event distributions).
- **Original:** Not first-party for a specific business; treat insights as representative/directional.
- **Comprehensive:** Strong for onsite behavior (view/cart/purchase), limited for context (no channel/device/geo assumed).
- **Current:** May be historical; findings will be framed as “in the observed period.”
- **Cited:** Public Kaggle source; dataset will be cited in the case study.

---

## Known limitations (and how we will phrase metrics)
### 1) Event-level data (sessions/orders may be ambiguous)
- We will not claim “true sessions” or “true orders” unless `user_session` is present and behaves consistently.

### 2) AOV and basket metrics are proxies unless grouping is defensible
We will use conservative language:

- **Revenue** = SUM(price) on purchase events
- **AOV Proxy**:
  - If `user_session` exists and purchase sessions are stable:
    - AOV Proxy = Total Revenue / COUNTD(user_session where event_type = "purchase")
  - Otherwise:
    - AOV Proxy = Total Revenue / COUNT(purchase events)

All AOV reporting will be labeled **“Average Purchase Value (proxy)”**.

### 3) Funnel interpretation
- Funnel steps are computed from event counts (or distinct users where appropriate), not guaranteed “per-session funnel paths.”
- We will be explicit about the denominator used (events vs users vs sessions).

---

## Scoping decision (to keep it finishable in a couple hours)
**Chosen scope:** **Single-month time slice**

**Why:**
- Faster iteration in Tableau (filters, extracts, dashboard performance)
- Clear “period framing” for a capstone narrative
- Still supports funnel, revenue/category ranking, price bands, and timing patterns

**Guardrails:**
- Category deep dives limited to **top categories by views** within the chosen month
- No more than 3 dashboards, no extra datasets