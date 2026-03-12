/**
 * Vehicle Manager Card for Home Assistant
 * https://github.com/your-repo/vehicle-manager-ha
 *
 * Config example:
 *   type: custom:vehicle-card
 *   car_slug: dacia_logan       # slug of the car name (spaces → underscores, lowercase)
 *   language: ro                 # en | ro | de | fr | it | es | pl | hu  (optional, auto-detect)
 *   show_notes: true             # show notes section (default: true)
 *   collapsed_service: false     # start with service section collapsed (default: false)
 */

// ─── i18n ─────────────────────────────────────────────────────────────────────
const I18N = {
  en: {
    documents: "Documents", service: "Service", odometer: "Odometer",
    insurance: "Insurance", casco: "CASCO", inspection: "Inspection",
    road_tax: "Road Tax", vignette: "Vignette",
    fire_extinguisher: "Fire Extinguisher", first_aid_kit: "First Aid Kit",
    oil_change: "Oil Change", air_filter: "Air Filter", cabin_filter: "Cabin Filter",
    timing_belt: "Timing Belt", brakes: "Brakes", battery: "Battery",
    tires: "Tires (last swap)", ac_service: "A/C Service", general_service: "General Service",
    days_remaining: (n) => n === 1 ? "1 day" : `${n} days`,
    days_ago: (n) => n === 1 ? "1 day ago" : `${n} days ago`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km overdue`,
    expired: "Expired", not_set: "Not set",
    issues: (n) => n === 1 ? "1 issue" : `${n} issues`,
    warnings: (n) => n === 1 ? "1 warning" : `${n} warnings`,
    all_ok: "All OK", notes: "Notes",
    last_service: "last service",
    days: "days",
  },
  ro: {
    documents: "Documente", service: "Service", odometer: "Kilometraj",
    insurance: "Asigurare (RCA)", casco: "CASCO", inspection: "Inspecție tehnică",
    road_tax: "Impozit auto", vignette: "Rovinieta",
    fire_extinguisher: "Extinctor", first_aid_kit: "Trusă medicală",
    oil_change: "Schimb ulei + filtre", air_filter: "Filtru aer",
    cabin_filter: "Filtru habitaclu", timing_belt: "Curea distribuție",
    brakes: "Frâne", battery: "Baterie", tires: "Anvelope (schimb)",
    ac_service: "Service climatizare", general_service: "Revizie generală",
    days_remaining: (n) => n === 1 ? "1 zi" : `${n} zile`,
    days_ago: (n) => n === 1 ? "acum 1 zi" : `acum ${n} zile`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km depășit`,
    expired: "Expirat", not_set: "Necompletat",
    issues: (n) => n === 1 ? "1 problemă" : `${n} probleme`,
    warnings: (n) => n === 1 ? "1 atenție" : `${n} atenții`,
    all_ok: "Totul OK", notes: "Notițe",
    last_service: "ultimul service",
    days: "zile",
  },
  de: {
    documents: "Dokumente", service: "Wartung", odometer: "Kilometerstand",
    insurance: "KFZ-Haftpflicht", casco: "Vollkasko", inspection: "TÜV / HU",
    road_tax: "KFZ-Steuer", vignette: "Vignette",
    fire_extinguisher: "Feuerlöscher", first_aid_kit: "Verbandskasten",
    oil_change: "Ölwechsel", air_filter: "Luftfilter", cabin_filter: "Innenraumfilter",
    timing_belt: "Zahnriemen", brakes: "Bremsen", battery: "Batterie",
    tires: "Reifen (Wechsel)", ac_service: "Klimaanlage-Service", inspection_label: "TÜV / HU",
    general_service: "Inspektion",
    days_remaining: (n) => n === 1 ? "1 Tag" : `${n} Tage`,
    days_ago: (n) => n === 1 ? "vor 1 Tag" : `vor ${n} Tagen`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km überfällig`,
    expired: "Abgelaufen", not_set: "Nicht gesetzt",
    issues: (n) => n === 1 ? "1 Problem" : `${n} Probleme`,
    warnings: (n) => n === 1 ? "1 Hinweis" : `${n} Hinweise`,
    all_ok: "Alles OK", notes: "Notizen",
    last_service: "letzte Wartung",
    days: "Tage",
  },
  fr: {
    documents: "Documents", service: "Entretien", odometer: "Kilométrage",
    insurance: "Assurance RC", casco: "Tous risques", inspection: "Contrôle Technique",
    road_tax: "Taxe véhicule", vignette: "Vignette",
    fire_extinguisher: "Extincteur", first_aid_kit: "Trousse de secours",
    oil_change: "Vidange", air_filter: "Filtre à air", cabin_filter: "Filtre habitacle",
    timing_belt: "Courroie de distribution", brakes: "Freins", battery: "Batterie",
    tires: "Pneus (dernier changement)", ac_service: "Service climatisation",
    general_service: "Révision générale",
    days_remaining: (n) => n === 1 ? "1 jour" : `${n} jours`,
    days_ago: (n) => n === 1 ? "il y a 1 jour" : `il y a ${n} jours`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km dépassé`,
    expired: "Expiré", not_set: "Non défini",
    issues: (n) => n === 1 ? "1 problème" : `${n} problèmes`,
    warnings: (n) => n === 1 ? "1 avertissement" : `${n} avertissements`,
    all_ok: "Tout OK", notes: "Notes",
    last_service: "dernier entretien",
    days: "jours",
  },
  it: {
    documents: "Documenti", service: "Manutenzione", odometer: "Chilometraggio",
    insurance: "RCA", casco: "Kasko", inspection: "Revisione",
    road_tax: "Bollo auto", vignette: "Vignetta",
    fire_extinguisher: "Estintore", first_aid_kit: "Kit pronto soccorso",
    oil_change: "Cambio olio", air_filter: "Filtro aria", cabin_filter: "Filtro abitacolo",
    timing_belt: "Cinghia distribuzione", brakes: "Freni", battery: "Batteria",
    tires: "Gomme (ultimo cambio)", ac_service: "Service clima",
    general_service: "Tagliando",
    days_remaining: (n) => n === 1 ? "1 giorno" : `${n} giorni`,
    days_ago: (n) => n === 1 ? "1 giorno fa" : `${n} giorni fa`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km scaduto`,
    expired: "Scaduto", not_set: "Non impostato",
    issues: (n) => n === 1 ? "1 problema" : `${n} problemi`,
    warnings: (n) => n === 1 ? "1 avviso" : `${n} avvisi`,
    all_ok: "Tutto OK", notes: "Note",
    last_service: "ultimo tagliando",
    days: "giorni",
  },
  es: {
    documents: "Documentos", service: "Mantenimiento", odometer: "Kilometraje",
    insurance: "Seguro obligatorio", casco: "Todo riesgo", inspection: "ITV",
    road_tax: "IVTM", vignette: "Vignette",
    fire_extinguisher: "Extintor", first_aid_kit: "Botiquín",
    oil_change: "Cambio de aceite", air_filter: "Filtro de aire",
    cabin_filter: "Filtro habitáculo", timing_belt: "Correa de distribución",
    brakes: "Frenos", battery: "Batería", tires: "Neumáticos (último cambio)",
    ac_service: "Service A/C", general_service: "Revisión general",
    days_remaining: (n) => n === 1 ? "1 día" : `${n} días`,
    days_ago: (n) => n === 1 ? "hace 1 día" : `hace ${n} días`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km vencido`,
    expired: "Vencido", not_set: "No definido",
    issues: (n) => n === 1 ? "1 problema" : `${n} problemas`,
    warnings: (n) => n === 1 ? "1 aviso" : `${n} avisos`,
    all_ok: "Todo OK", notes: "Notas",
    last_service: "último servicio",
    days: "días",
  },
  pl: {
    documents: "Dokumenty", service: "Serwis", odometer: "Przebieg",
    insurance: "OC", casco: "AC (Autocasco)", inspection: "Przegląd techniczny",
    road_tax: "Podatek drogowy", vignette: "e-TOLL",
    fire_extinguisher: "Gaśnica", first_aid_kit: "Apteczka",
    oil_change: "Wymiana oleju", air_filter: "Filtr powietrza",
    cabin_filter: "Filtr kabinowy", timing_belt: "Pasek rozrządu",
    brakes: "Hamulce", battery: "Akumulator", tires: "Opony (ostatnia wymiana)",
    ac_service: "Serwis klimatyzacji", general_service: "Przegląd ogólny",
    days_remaining: (n) => n === 1 ? "1 dzień" : `${n} dni`,
    days_ago: (n) => n === 1 ? "1 dzień temu" : `${n} dni temu`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km po terminie`,
    expired: "Wygasłe", not_set: "Nie ustawiono",
    issues: (n) => n === 1 ? "1 problem" : `${n} problemy`,
    warnings: (n) => n === 1 ? "1 ostrzeżenie" : `${n} ostrzeżenia`,
    all_ok: "Wszystko OK", notes: "Notatki",
    last_service: "ostatni serwis",
    days: "dni",
  },
  hu: {
    documents: "Dokumentumok", service: "Szerviz", odometer: "Kilométerállás",
    insurance: "Kötelező biztosítás", casco: "CASCO", inspection: "Műszaki vizsga",
    road_tax: "Gépjárműadó", vignette: "Autópálya-matrica",
    fire_extinguisher: "Tűzoltó készülék", first_aid_kit: "Elsősegély-csomag",
    oil_change: "Olajcsere", air_filter: "Légszűrő", cabin_filter: "Pollenszűrő",
    timing_belt: "Vezérműszíj", brakes: "Fékek", battery: "Akkumulátor",
    tires: "Gumiabroncsok (utolsó csere)", ac_service: "Légkondicionáló szerviz",
    general_service: "Általános szerviz",
    days_remaining: (n) => n === 1 ? "1 nap" : `${n} nap`,
    days_ago: (n) => n === 1 ? "1 napja" : `${n} napja`,
    km_remaining: (n) => `${fmtKm(n)} km`,
    km_overdue: (n) => `+${fmtKm(Math.abs(n))} km lejárt`,
    expired: "Lejárt", not_set: "Nincs beállítva",
    issues: (n) => n === 1 ? "1 probléma" : `${n} probléma`,
    warnings: (n) => n === 1 ? "1 figyelmeztetés" : `${n} figyelmeztetés`,
    all_ok: "Minden OK", notes: "Megjegyzések",
    last_service: "utolsó szerviz",
    days: "nap",
  },
};

// ─── Country-specific names (override generic labels) ────────────────────────
const COUNTRY_LABELS = {
  inspection: {
    RO: "ITP", DE: "TÜV / HU", FR: "Contrôle Technique", IT: "Revisione",
    AT: "§57a Pickerl", ES: "ITV", PL: "Przegląd tech.", NL: "APK",
    HU: "Műszaki vizsga", CZ: "STK",
  },
  road_tax: {
    RO: "Impozit auto", DE: "KFZ-Steuer", FR: "Taxe véhicule", IT: "Bollo auto",
    AT: "KFZ-Steuer", ES: "IVTM", PL: "Podatek drogowy", NL: "Wegenbelasting",
    HU: "Gépjárműadó", CZ: "Silniční daň",
  },
  insurance: {
    RO: "RCA", DE: "KFZ-Haftpflicht", FR: "Assurance RC", IT: "RCA",
    AT: "KFZ-Haftpflicht", ES: "Seguro obligatorio", PL: "OC",
    NL: "WA-verzekering", HU: "KGFB", CZ: "Povinné ručení",
  },
  vignette: {
    RO: "Rovinieta", AT: "Autobahnvignette", PL: "e-TOLL",
    HU: "Autópálya-matrica", CZ: "Dálniční známka",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtKm(n) {
  return Math.abs(n).toLocaleString("en").replace(/,/g, "\u2009");
}

function fmtDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

function statusColor(status) {
  return {
    ok: "#22c55e",
    warning: "#f59e0b",
    critical: "#ef4444",
    expired: "#b91c1c",
    overdue: "#b91c1c",
    unknown: "#9ca3af",
  }[status] || "#9ca3af";
}

function statusBg(status) {
  return {
    ok: "rgba(34,197,94,0.10)",
    warning: "rgba(245,158,11,0.12)",
    critical: "rgba(239,68,68,0.12)",
    expired: "rgba(185,28,28,0.14)",
    overdue: "rgba(185,28,28,0.14)",
    unknown: "rgba(156,163,175,0.08)",
  }[status] || "rgba(156,163,175,0.08)";
}

function worstStatus(statuses) {
  const priority = ["expired", "overdue", "critical", "warning", "ok", "unknown"];
  for (const p of priority) if (statuses.includes(p)) return p;
  return "unknown";
}

// ─── Card ─────────────────────────────────────────────────────────────────────
class VehicleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._serviceCollapsed = false;
  }

  setConfig(config) {
    if (!config.car_slug) throw new Error("vehicle-card: car_slug is required");
    this._config = config;
    this._serviceCollapsed = config.collapsed_service || false;
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  // ── Entity helpers ──────────────────────────────────────────────────────────
  _eid(type) {
    return `sensor.vehicle_${this._config.car_slug}_${type}`;
  }

  _state(type) {
    return this._hass?.states[this._eid(type)];
  }

  _attr(type, key) {
    return this._state(type)?.attributes?.[key];
  }

  _status(type) {
    return this._attr(type, "status") || "unknown";
  }

  // ── Language ────────────────────────────────────────────────────────────────
  _lang() {
    const lang = this._config.language || this._hass?.language || "en";
    return I18N[lang] || I18N["en"];
  }

  _label(type) {
    const country = this._attr(type, "country") || this._attr("insurance", "country") || "";
    if (COUNTRY_LABELS[type]?.[country]) return COUNTRY_LABELS[type][country];
    return this._lang()[type] || type.replace(/_/g, " ");
  }

  // ── Summary counts ─────────────────────────────────────────────────────────
  _counts() {
    const docTypes = ["insurance", "casco", "inspection", "road_tax", "vignette",
                      "fire_extinguisher", "first_aid_kit"];
    const svcTypes = ["oil_change", "air_filter", "cabin_filter", "timing_belt",
                      "brakes", "battery", "tires", "ac_service", "general_service"];
    let issues = 0, warnings = 0;
    for (const t of [...docTypes, ...svcTypes]) {
      const s = this._status(t);
      if (s === "expired" || s === "critical" || s === "overdue") issues++;
      else if (s === "warning") warnings++;
    }
    return { issues, warnings };
  }

  // ── Value display for date sensors ─────────────────────────────────────────
  _dateValue(type) {
    const t = this._lang();
    const state = this._state(type);
    if (!state || state.state === "unavailable") return { main: t.not_set, sub: "", status: "unknown" };
    const attrs = state.attributes;
    const status = attrs.status || "unknown";

    if (attrs.is_expiry !== false) {
      const days = parseInt(state.state);
      if (isNaN(days)) return { main: t.not_set, sub: "", status: "unknown" };
      if (days < 0) return { main: t.expired, sub: fmtDate(attrs.date), status };
      return { main: t.days_remaining(days), sub: fmtDate(attrs.date), status };
    } else {
      // days_since type (battery, tires, ac)
      const days = parseInt(state.state);
      if (isNaN(days)) return { main: t.not_set, sub: "", status: "unknown" };
      return { main: t.days_ago(days), sub: fmtDate(attrs.date), status };
    }
  }

  // ── Value display for service sensors ──────────────────────────────────────
  _serviceValue(type) {
    const t = this._lang();
    const state = this._state(type);
    if (!state || state.state === "unavailable") return { main: t.not_set, sub: "", km: "", status: "unknown" };
    const attrs = state.attributes;
    const status = attrs.status || "unknown";
    const kmRem = attrs.km_remaining;
    const daysSince = attrs.days_since_service;

    let main = t.not_set;
    let sub = "";
    let km = "";

    if (kmRem !== null && kmRem !== undefined) {
      main = kmRem < 0 ? t.km_overdue(kmRem) : t.km_remaining(kmRem);
    } else {
      main = t.not_set;
    }
    if (attrs.last_service_date) sub = fmtDate(attrs.last_service_date);
    if (daysSince !== null && daysSince !== undefined) {
      km = t.days_ago(daysSince);
    }

    return { main, sub, km, status };
  }

  // ── Render an item card ────────────────────────────────────────────────────
  _itemCard(type, isService = false) {
    const data = isService ? this._serviceValue(type) : this._dateValue(type);
    const { main, sub, km, status } = data;
    const color = statusColor(status);
    const bg = statusBg(status);
    const label = this._label(type);

    const icons = {
      insurance: "🛡️", casco: "🔒", inspection: "🔍", road_tax: "🏛️",
      vignette: "🛣️", fire_extinguisher: "🧯", first_aid_kit: "🩺",
      oil_change: "🛢️", air_filter: "💨", cabin_filter: "🌿",
      timing_belt: "⚙️", brakes: "🔴", battery: "🔋",
      tires: "🔘", ac_service: "❄️", general_service: "🔧",
    };
    const icon = icons[type] || "📋";

    return `
      <div class="item" style="background:${bg};border-left:3px solid ${color}">
        <div class="item-header">
          <span class="item-icon">${icon}</span>
          <span class="item-name">${label}</span>
          <span class="item-dot" style="background:${color}" title="${status}"></span>
        </div>
        <div class="item-main" style="color:${color}">${main}</div>
        ${sub ? `<div class="item-sub">${sub}${km ? ` · ${km}` : ""}</div>` : ""}
      </div>`;
  }

  // ── Full render ─────────────────────────────────────────────────────────────
  _render() {
    if (!this._hass || !this._config) return;
    const t = this._lang();
    const { issues, warnings } = this._counts();

    // Car metadata from first available sensor
    const anchor = this._state("insurance") || this._state("oil_change") || this._state("odometer");
    const attrs = anchor?.attributes || {};
    const carName = attrs.car_name || this._config.car_slug?.replace(/_/g, " ");
    const make = attrs.make || "";
    const model = attrs.model || "";
    const year = attrs.year || "";
    const plate = attrs.plate || "";
    const flag = attrs.flag || "";
    const odometer = this._state("odometer")?.state;
    const notes = attrs.notes || "";

    const docTypes = ["insurance", "casco", "inspection", "road_tax", "vignette",
                      "fire_extinguisher", "first_aid_kit"];
    const svcTypes = ["oil_change", "air_filter", "cabin_filter", "timing_belt",
                      "brakes", "battery", "tires", "ac_service", "general_service"];

    // Filter doc types: only show if sensor exists
    const visibleDocs = docTypes.filter(t => this._state(t));
    const visibleSvc = svcTypes.filter(t => this._state(t));

    let summaryHtml = "";
    if (issues > 0) summaryHtml += `<span class="badge badge-issue">⚠ ${t.issues(issues)}</span>`;
    if (warnings > 0) summaryHtml += `<span class="badge badge-warn">⏰ ${t.warnings(warnings)}</span>`;
    if (issues === 0 && warnings === 0) summaryHtml = `<span class="badge badge-ok">✓ ${t.all_ok}</span>`;

    const showNotes = this._config.show_notes !== false && notes;
    const svcClass = this._serviceCollapsed ? "section-body collapsed" : "section-body";

    this.shadowRoot.innerHTML = `
<style>
  :host { display: block; }
  .card {
    background: var(--card-background-color, #1c1c2e);
    border-radius: 16px;
    overflow: hidden;
    font-family: var(--primary-font-family, -apple-system, sans-serif);
    box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  }
  /* Header */
  .header {
    padding: 16px 18px 12px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .header-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .car-info { display: flex; align-items: center; gap: 10px; }
  .car-emoji { font-size: 28px; }
  .car-name { font-size: 1.1em; font-weight: 700; color: var(--primary-text-color, #f1f5f9); }
  .car-meta { font-size: 0.78em; color: var(--secondary-text-color, #94a3b8); margin-top: 1px; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; }
  .badge {
    font-size: 0.72em; font-weight: 600; padding: 3px 9px;
    border-radius: 99px; white-space: nowrap;
  }
  .badge-issue { background: rgba(239,68,68,0.18); color: #f87171; }
  .badge-warn  { background: rgba(245,158,11,0.18); color: #fbbf24; }
  .badge-ok    { background: rgba(34,197,94,0.18); color: #4ade80; }
  .odometer { font-size: 0.78em; color: var(--secondary-text-color, #94a3b8); margin-top: 6px; }
  /* Section */
  .section { padding: 0 }
  .section-title {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 18px 8px; cursor: pointer; user-select: none;
    font-size: 0.72em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--secondary-text-color, #64748b);
  }
  .section-title:hover { color: var(--primary-text-color, #f1f5f9); }
  .section-toggle { font-size: 0.9em; transition: transform 0.2s; }
  .section-toggle.open { transform: rotate(90deg); }
  .section-body { padding: 0 12px 12px; }
  .section-body.collapsed { display: none; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
  /* Item */
  .item {
    border-radius: 10px; padding: 10px 11px 8px; cursor: default;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .item:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
  .item-header { display: flex; align-items: center; gap: 5px; margin-bottom: 4px; }
  .item-icon { font-size: 0.9em; }
  .item-name { font-size: 0.72em; color: var(--secondary-text-color, #94a3b8); flex: 1; line-height: 1.2; }
  .item-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .item-main { font-size: 0.85em; font-weight: 700; line-height: 1.2; margin-bottom: 2px; }
  .item-sub { font-size: 0.68em; color: var(--secondary-text-color, #94a3b8); }
  /* Notes */
  .notes { margin: 0 12px 14px; padding: 10px 12px;
    background: rgba(255,255,255,0.04); border-radius: 10px;
    font-size: 0.78em; color: var(--secondary-text-color, #94a3b8);
    border-left: 3px solid rgba(255,255,255,0.12); }
  .notes-title { font-weight: 600; color: var(--primary-text-color, #e2e8f0); margin-bottom: 4px; font-size: 0.85em; }
  /* Divider */
  .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0 12px; }
</style>

<div class="card">
  <div class="header">
    <div class="header-top">
      <div class="car-info">
        <span class="car-emoji">🚗</span>
        <div>
          <div class="car-name">${carName}</div>
          <div class="car-meta">${[make, model, year].filter(Boolean).join(" ")}${plate ? ` · ${plate}` : ""}${flag ? ` · ${flag}` : ""}</div>
        </div>
      </div>
      <div class="badges">${summaryHtml}</div>
    </div>
    ${odometer ? `<div class="odometer">📍 ${fmtKm(parseInt(odometer))} km</div>` : ""}
  </div>

  <div class="section">
    <div class="section-title" id="docs-title">
      <span>📄 ${t.documents}</span>
      <span class="section-toggle open">▶</span>
    </div>
    <div class="section-body" id="docs-body">
      <div class="grid">${visibleDocs.map(tp => this._itemCard(tp, false)).join("")}</div>
    </div>
  </div>

  <div class="divider"></div>

  <div class="section">
    <div class="section-title" id="svc-title">
      <span>🔧 ${t.service}</span>
      <span class="section-toggle ${this._serviceCollapsed ? "" : "open"}">▶</span>
    </div>
    <div class="${svcClass}" id="svc-body">
      <div class="grid">${visibleSvc.map(tp => this._itemCard(tp, true)).join("")}</div>
    </div>
  </div>

  ${showNotes ? `
  <div class="divider"></div>
  <div class="notes">
    <div class="notes-title">📝 ${t.notes}</div>
    ${notes}
  </div>` : ""}
</div>`;

    // Collapse toggles
    this.shadowRoot.getElementById("docs-title")?.addEventListener("click", () => {
      const body = this.shadowRoot.getElementById("docs-body");
      const tog = this.shadowRoot.querySelector("#docs-title .section-toggle");
      body.classList.toggle("collapsed");
      tog.classList.toggle("open");
    });
    this.shadowRoot.getElementById("svc-title")?.addEventListener("click", () => {
      const body = this.shadowRoot.getElementById("svc-body");
      const tog = this.shadowRoot.querySelector("#svc-title .section-toggle");
      this._serviceCollapsed = !this._serviceCollapsed;
      body.classList.toggle("collapsed");
      tog.classList.toggle("open");
    });
  }

  getCardSize() { return 6; }

  static getStubConfig() {
    return { car_slug: "my_car", language: "en", show_notes: true };
  }
}

customElements.define("vehicle-card", VehicleCard);

// Register card in HACS / HA card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: "vehicle-card",
  name: "Vehicle Manager Card",
  description: "Displays vehicle documents and service status with multi-language support.",
  preview: true,
});
