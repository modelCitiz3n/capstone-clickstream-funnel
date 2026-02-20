# Optimizing E-Commerce Conversion Through Clickstream Funnel Analysis

## Ask
**Business task:** Identify where users drop off in the e-commerce funnel and diagnose which categories and timing patterns are most associated with revenue, in order to prioritize conversion and revenue optimization actions.

**Stakeholders/audience:** Marketing, e-commerce product owner, merchandising/category managers, operations.

**Success metrics:** Proxy conversion rates (View→Cart, Cart→Purchase, View→Purchase) and revenue (SUM(price) on purchase events).

## Prepare
**Dataset:** Kaggle “Ecommerce Behavior Data from Multi-Category Store” (Nov 2019). Event-level clickstream records including `event_time`, `event_type` (view/cart/purchase), `category_code`, `price`, and user identifiers.

**Credibility/limitations (ROCCC):**
- **Reliable/Original:** Public dataset; large volume.
- **Comprehensive:** Contains key funnel events and prices.
- **Current:** Historic (2019); patterns may differ today.
- **Limitation:** Event-level data; no definitive order/session grouping → conversion rates are **event-based proxies** rather than session-path conversion.

## Process
A lightweight processing approach was used to keep scope small:
- Raw CSV stored in a remote workspace.
- Aggregated, Tableau-ready tables were generated for:
  1) daily funnel totals and proxy rates,
  2) category-level revenue and conversion,
  3) timing (day-of-week × hour) performance.

## Analyze
### 1) Funnel performance
Across Nov 2019:
- Views: 63.6M
- Carts: 3.03M
- Purchases: 916.9K
- Revenue: 275.2M

Proxy conversion rates:
- View→Cart: 4.77%
- Cart→Purchase: 30.27%
- View→Purchase: 1.44%

**Key insight:** The largest drop occurs at **View→Cart**, indicating the primary optimization opportunity is improving product discovery and product detail page persuasion (CTA, trust, pricing/fees clarity, returns/shipping).

### 2) Category performance
Revenue is highly concentrated:
- Top 5 categories account for **86.3%** of revenue.
- `electronics.smartphone` dominates revenue.

**Implication:** The business is exposed to category concentration risk. Optimizations should protect and scale top categories while improving conversion in high-traffic categories that underperform.

### 3) Timing patterns
Purchases and revenue peak around **~9–11am**, with stronger weekend mid-day intensity.

**Implication:** Promotions, email, and ad spend should be scheduled to coincide with these high-intent windows.

## Share
Three dashboards were produced:
1) Funnel Overview
2) Category & Revenue Performance
3) Timing Patterns

## Act (Recommendations)
1) **Increase View→Cart rate**: strengthen PDP CTA, improve navigation/filtering, surface shipping/returns info early, add trust signals.
2) **Category-focused optimization**: protect top revenue categories; run targeted conversion tests on high-view/low-conversion categories.
3) **Time-based execution**: schedule campaigns around peak hours; align operational readiness to peak demand.

## Next steps
- Validate patterns across additional months.
- If true session/order definitions become available, replace proxy rates with session conversion and true AOV.