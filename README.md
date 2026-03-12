# 🃏 Vehicle Manager Card — Lovelace Custom Card

> A beautiful, dark-themed Lovelace card for the [Vehicle Manager integration](README-integration.md). Displays all document expiry dates and service intervals at a glance, with colour-coded status badges, multi-language support and collapsible sections.

![Vehicle Manager Card — Romanian](docs/images/screenshot-card-ro.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
  - [HACS (recommended)](#hacs-recommended)
  - [Manual](#manual)
  - [Registering the resource](#registering-the-resource)
- [Card Configuration](#card-configuration)
  - [Minimal config](#minimal-config)
  - [Full config reference](#full-config-reference)
  - [Finding your car_slug](#finding-your-car_slug)
- [Multiple Vehicles](#multiple-vehicles)
- [Language Reference](#language-reference)
- [Status Colours](#status-colours)
- [Layout & Sections](#layout--sections)
- [What Each Item Shows](#what-each-item-shows)
- [Customization Tips](#customization-tips)
- [Troubleshooting](#troubleshooting)
- [Interactive Preview](#interactive-preview)

---

## Overview

The **Vehicle Manager Card** reads sensor entities created by the Vehicle Manager integration and renders them as a compact, dark card with two collapsible sections — **Documents** and **Service**. Each item shows its current status (days remaining or km remaining) with a colour-coded indicator. A summary badge in the header shows the total number of issues and warnings at a glance.

The card automatically detects which sensors exist for a vehicle and only renders those — so if your country has no vignette, that row simply won't appear.

---

## Features

| Feature | Details |
|---------|---------|
| 🎨 **Status colours** | 🟢 OK · 🟡 Warning · 🔴 Critical · ⛔ Expired/Overdue · ⬜ Unknown |
| 📊 **Header summary** | Badge showing total issues + warnings at a glance |
| 🌍 **8 UI languages** | EN · RO · DE · FR · IT · ES · PL · HU |
| 📄 **Documents section** | Insurance, CASCO, Inspection, Road Tax, Vignette, Fire Extinguisher, First Aid Kit |
| 🔧 **Service section** | Oil, Air Filter, Cabin Filter, Timing Belt, Brakes, Battery, Tires, A/C, General Service |
| 🚗 **Multi-vehicle** | One card per vehicle; put multiple on the same dashboard |
| 📍 **Odometer** | Shown in the header |
| 📝 **Notes** | Optional notes section at the bottom |
| 🔽 **Collapsible sections** | Click any section title to collapse/expand |
| 🏷️ **Country-aware labels** | ITP / TÜV / CT / Revisione / APK — correct name per country |
| 🔌 **Zero dependencies** | Vanilla JS, no extra libraries |

---

## Requirements

- Home Assistant **2023.6** or newer
- [Vehicle Manager integration](README-integration.md) installed and at least one vehicle configured
- The `vehicle-card.js` resource registered in Lovelace

---

## Installation

### HACS (recommended)

1. Open HACS → **Frontend** → click `⋮` → **Custom repositories**.
2. Add the repository URL, category: **Lovelace**.
3. Click **Download**.
4. Clear your browser cache.

### Manual

Copy `www/vehicle-card/vehicle-card.js` to your HA config directory:

```
<config>/
└── www/
    └── vehicle-card/
        └── vehicle-card.js    ← copy this file here
```

### Registering the resource

**Via UI** (Settings → Dashboards → Resources → Add):

| Field | Value |
|-------|-------|
| URL | `/local/vehicle-card/vehicle-card.js` |
| Resource type | `JavaScript Module` |

**Or via `configuration.yaml`:**

```yaml
lovelace:
  resources:
    - url: /local/vehicle-card/vehicle-card.js
      type: module
```

Reload Lovelace (or restart HA) after adding the resource.

---

## Card Configuration

### Minimal config

```yaml
type: custom:vehicle-card
car_slug: dacia_logan
```

### Full config reference

```yaml
type: custom:vehicle-card
car_slug: dacia_logan          # required — see below
language: ro                   # optional — en|ro|de|fr|it|es|pl|hu (default: HA language)
show_notes: true               # optional — show notes section (default: true)
collapsed_service: false       # optional — start service section collapsed (default: false)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `car_slug` | `string` | **required** | Slug derived from the vehicle name — see below |
| `language` | `string` | HA language | Override UI language for this card |
| `show_notes` | `boolean` | `true` | Show the notes section if notes are set |
| `collapsed_service` | `boolean` | `false` | Start the Service section collapsed to save space |

### Finding your `car_slug`

The slug is derived from the vehicle name you entered in Step 1 of the integration setup. The transformation is:

1. Lowercase all characters
2. Replace spaces with underscores

| Vehicle Name | car_slug |
|-------------|----------|
| `Dacia Logan` | `dacia_logan` |
| `Volkswagen Golf 7` | `volkswagen_golf_7` |
| `BMW X5 2022` | `bmw_x5_2022` |
| `Opel Astra G` | `opel_astra_g` |

**Verify it by checking any sensor entity ID in HA:**  
Settings → Entities → search for your car → look for the pattern `sensor.vehicle_**YOUR_SLUG**_insurance`

---

## Multiple Vehicles

Put multiple cards in a grid to track all your vehicles on one dashboard:

![Two cards side by side](docs/images/screenshot-two-cards.svg)

```yaml
type: grid
columns: 2
square: false
cards:
  - type: custom:vehicle-card
    car_slug: dacia_logan
    language: ro

  - type: custom:vehicle-card
    car_slug: volkswagen_golf_7
    language: de
    collapsed_service: true
```

For a single-column mobile-friendly layout:

```yaml
type: vertical-stack
cards:
  - type: custom:vehicle-card
    car_slug: dacia_logan
    language: ro

  - type: custom:vehicle-card
    car_slug: volkswagen_golf_7
    language: de
```

---

## Language Reference

The `language` option controls all text rendered inside the card — section titles, item labels, day/km formatting and status strings.

| Code | Language | Sample label |
|------|----------|-------------|
| `en` | English | Insurance · Oil Change · 18 days |
| `ro` | Română | RCA · Schimb ulei · 18 zile |
| `de` | Deutsch | KFZ-Haftpflicht · Ölwechsel · 18 Tage |
| `fr` | Français | Assurance RC · Vidange · 18 jours |
| `it` | Italiano | RCA · Cambio olio · 18 giorni |
| `es` | Español | Seguro obligatorio · Cambio aceite · 18 días |
| `pl` | Polski | OC · Wymiana oleju · 18 dni |
| `hu` | Magyar | KGFB · Olajcsere · 18 nap |

> Country-specific names (ITP, TÜV, CT, Rovinieta, etc.) are applied automatically based on the **country** set during integration setup — this is separate from the card's `language` option. You can display a Romanian car's card in English and still see "ITP" as the inspection label.

---

## Status Colours

![Status indicator examples](docs/images/screenshot-status-legend.svg)

Each item card has a coloured left border and a status dot in the top-right corner:

| Colour | Status | Date meaning | Km meaning |
|--------|--------|-------------|-----------|
| 🟢 `#22c55e` | **ok** | More than 30 days remaining | More than 3 000 km remaining |
| 🟡 `#f59e0b` | **warning** | 7 – 30 days remaining | 500 – 3 000 km remaining |
| 🔴 `#ef4444` | **critical** | 0 – 7 days remaining | 0 – 500 km remaining |
| ⛔ `#dc2626` | **expired** / **overdue** | Past expiry date | Past interval km |
| ⬜ `#6b7280` | **unknown** | No date entered | No km data available |

The **header badges** summarise the whole card:

- `⚠ N issues` — count of expired / critical / overdue items → red badge
- `⏰ N warnings` — count of warning items → amber badge  
- `✓ All OK` — no issues or warnings → green badge

---

## Layout & Sections

```
┌─────────────────────────────────────────┐
│  🚗  Dacia Logan                 ⚠ 3   │  ← Header
│      Dacia Logan 2019 · B-123 · 🇷🇴   │
│  📍 127 450 km                          │
├─────────────────────────────────────────┤
│  📄 DOCUMENTS                         ▶ │  ← Collapsible
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ RCA  │ │CASCO │ │ ITP  │ │Impoz.│  │
│  │18 zi.│ │142 z.│ │3 zile│ │287 z.│  │  ← 4-column grid
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Rovin.│ │Extin.│ │Trusă │           │
│  │Expirat│ │89 z.│ │22 z. │           │
│  └──────┘ └──────┘ └──────┘           │
├─────────────────────────────────────────┤
│  🔧 SERVICE                           ▶ │  ← Collapsible
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Ulei  │ │F.aer │ │F.hab.│ │Curea │  │
│  │320km │ │12800k│ │2100k │ │42550k│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│  ...                                    │
├─────────────────────────────────────────┤
│  📝 Notițe                              │  ← Optional
│  Programare service luna viitoare…      │
└─────────────────────────────────────────┘
```

---

## What Each Item Shows

### Document items (date-based)

```
┌───────────────────────────────┐
│  🛡️  RCA                    🟡│  ← icon · label · status dot
│  18 zile                      │  ← main: days remaining / "Expirat"
│  15 Apr 2025                  │  ← sub: expiry date
└───────────────────────────────┘
```

- **Days remaining**: shown as `18 zile` / `18 days` / `18 Tage` etc.
- **Expired**: shows translated `Expired` / `Expirat` / `Abgelaufen` etc.
- **Battery / Tires / A/C**: these are "last done" sensors — show days *since* the event instead

### Service items (km-based)

```
┌───────────────────────────────┐
│  🛢️  Schimb ulei            🔴│
│  320 km                       │  ← main: km remaining (red = critical)
│  acum 190 zile                │  ← sub: days since last service
└───────────────────────────────┘
```

- **km remaining**: positive → time left; negative → overdue by X km
- Sub line shows time since last service as a human-readable string

---

## Customization Tips

**Collapse the service section by default** to keep the card compact on mobile:

```yaml
type: custom:vehicle-card
car_slug: dacia_logan
collapsed_service: true
```

**Hide the notes section** if you don't use notes:

```yaml
type: custom:vehicle-card
car_slug: dacia_logan
show_notes: false
```

**Use different languages per car** (useful for mixed households):

```yaml
type: grid
columns: 2
square: false
cards:
  - type: custom:vehicle-card
    car_slug: dacia_logan
    language: ro     # Romanian car — Romanian labels

  - type: custom:vehicle-card
    car_slug: vw_golf
    language: de     # German car — German labels
```

**Combine with conditional card** to only show a car when it has issues:

```yaml
type: conditional
conditions:
  - entity: sensor.vehicle_dacia_logan_inspection
    state_not: "unavailable"
  - condition: template
    value_template: >
      {{ state_attr('sensor.vehicle_dacia_logan_inspection', 'status') in ['critical','expired','warning'] }}
card:
  type: custom:vehicle-card
  car_slug: dacia_logan
  language: ro
```

**Add to a tab alongside the HA energy dashboard:**

```yaml
# views section in lovelace config
- title: Vehicles
  icon: mdi:car-multiple
  path: vehicles
  cards:
    - type: custom:vehicle-card
      car_slug: dacia_logan
    - type: custom:vehicle-card
      car_slug: volkswagen_golf
```

---

## Troubleshooting

**Card shows "Custom element doesn't exist: vehicle-card"**  
→ The resource is not registered. Follow the [Registering the resource](#registering-the-resource) section.  
→ Clear your browser cache (Ctrl+Shift+R) after adding the resource.

**Card renders but shows "Not set" for every item**  
→ Your `car_slug` is wrong. Check it against the actual entity IDs in HA Settings → Entities.  
→ Common mistake: `dacia-logan` instead of `dacia_logan` (hyphens vs underscores).

**Odometer not showing in the header**  
→ Make sure you filled in the "Current Odometer" field in Step 3 of the integration.

**Section says "0 items" but I entered dates**  
→ The card only shows sensors that actually exist. If a sensor shows as `unavailable` in HA, the card hides it. Try reloading the integration entry.

**Language option has no effect**  
→ Check that the code is one of: `en ro de fr it es pl hu`. Unknown codes fall back to English.

**Card looks wrong / overlapping text**  
→ Try resizing the card in the Lovelace editor. The grid uses `auto-fill` with 140px minimum per item — very narrow containers may look cramped.

---

## Interactive Preview

An offline HTML preview of the card is included at `preview.html`. Open it directly in any browser — no HA needed. It includes:

- Two sample vehicles (Dacia Logan 🇷🇴 + VW Golf 🇩🇪)
- Live language switcher for all 8 languages
- Sample data with a mix of statuses (ok, warning, critical, expired)
- Collapsible sections

```bash
# Just open in browser:
open preview.html
# or
xdg-open preview.html
```

---

## License

MIT — free to use, modify and distribute.  
Contributions and pull requests welcome.
