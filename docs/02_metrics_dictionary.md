# Metrics Dictionary
**Project:** E-Commerce Clickstream Funnel Analysis (Capstone)  
**Owner:** Jordan  
**Date:** 2026-02-20  
**Status:** Draft (baseline)

---

## Core events
### Views
**Definition:** Count of events where `event_type = "view"`  
**Notes:** Represents product interest, not necessarily unique users/sessions.

### Carts
**Definition:** Count of events where `event_type = "cart"`  
**Notes:** Represents add-to-cart actions; may include repeats.

### Purchases
**Definition:** Count of events where `event_type = "purchase"`  
**Notes:** Represents purchase events; may not equal unique orders unless grouping is available.

---

## Funnel conversion metrics
### View → Cart Rate
**Definition:** Carts / Views  
**Denominator:** Views (event count)  
**Interpretation:** How often views lead to add-to-cart behavior.

### Cart → Purchase Rate
**Definition:** Purchases / Carts  
**Denominator:** Carts (event count)  
**Interpretation:** Checkout effectiveness proxy (directional).

### View → Purchase Rate (Overall Conversion Proxy)
**Definition:** Purchases / Views  
**Denominator:** Views (event count)  
**Interpretation:** High-level conversion proxy (directional).

---

## Revenue metrics
### Revenue
**Definition:** SUM(price) where `event_type = "purchase"`  
**Notes:** Price treated as event value; currency assumptions should be stated as “as provided.”

### Revenue concentration
**Definition:** Share of total revenue contributed by top categories/price bands  
**Example reporting:** “Top 5 categories contribute X% of revenue.”

---

## Average purchase value (proxy)
### Average Purchase Value (Proxy) — preferred if `user_session` is valid
**Definition:** Total Revenue / COUNTD(purchase sessions)  
**Purchase session:** `user_session` where `event_type = "purchase"`  
**Labeling:** Must include “proxy” language.

### Average Purchase Value (Proxy) — fallback if session grouping is weak/unavailable
**Definition:** Total Revenue / COUNT(purchase events)  
**Labeling:** Must include “proxy” language.

---

## Segmentation dimensions (used in dashboards)
### Category
**Definition:** `category` or `category_code` field (whichever is cleanest)  
**Notes:** We will standardize to one category field for reporting.

### Price Band (simple 3-band)
**Definition (baseline):**
- LOW: price < 20  
- MID: 20–99.99  
- HIGH: 100+  
**Notes:** Thresholds may be adjusted once we inspect price distribution, but will remain 3 bands for speed.