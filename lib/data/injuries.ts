import type { Injury } from "@/lib/types";

export const injuries: Injury[] = [
  // Germany
  { id: "i1",  player: "J. Kimmich",      team: "Germany",     status: "Out",      severity: "Medium", issue: "Muscle injury",        expectedReturn: "Group stage review",  source: "DFB Official", updatedAt: new Date().toISOString() },
  { id: "i2",  player: "F. Wirtz",         team: "Germany",     status: "Doubtful", severity: "Low",    issue: "Knock",                expectedReturn: "Matchday decision",   source: "DFB Official", updatedAt: new Date().toISOString() },

  // Brazil
  { id: "i3",  player: "Neymar Jr.",       team: "Brazil",      status: "Doubtful", severity: "High",   issue: "Knee injury",          expectedReturn: "Matchday decision",   source: "CBF Official", updatedAt: new Date().toISOString() },
  { id: "i4",  player: "G. Jesus",         team: "Brazil",      status: "Out",      severity: "High",   issue: "Hamstring strain",     expectedReturn: "Round of 16",         source: "CBF Official", updatedAt: new Date().toISOString() },

  // France
  { id: "i5",  player: "P. Pogba",         team: "France",      status: "Out",      severity: "High",   issue: "Ankle injury",         expectedReturn: "Unknown",             source: "FFF Official", updatedAt: new Date().toISOString() },
  { id: "i6",  player: "K. Benzema",       team: "France",      status: "Out",      severity: "High",   issue: "Thigh tear",           expectedReturn: "Tournament doubt",    source: "FFF Official", updatedAt: new Date().toISOString() },
  { id: "i7",  player: "L. Hernandez",     team: "France",      status: "Doubtful", severity: "Medium", issue: "Knee soreness",        expectedReturn: "Group stage review",  source: "FFF Official", updatedAt: new Date().toISOString() },

  // England
  { id: "i8",  player: "R. James",         team: "England",     status: "Out",      severity: "High",   issue: "Hamstring",            expectedReturn: "Quarterfinal",        source: "FA Official",  updatedAt: new Date().toISOString() },
  { id: "i9",  player: "B. Saka",          team: "England",     status: "Fit",      severity: "Low",    issue: "Minor knock (cleared)","expectedReturn": "Available",         source: "FA Official",  updatedAt: new Date().toISOString() },

  // Spain
  { id: "i10", player: "G. Ramos",         team: "Spain",       status: "Fit",      severity: "Low",    issue: "Precautionary rest",   expectedReturn: "Available",           source: "RFEF Official",updatedAt: new Date().toISOString() },
  { id: "i11", player: "D. Carvajal",      team: "Spain",       status: "Out",      severity: "High",   issue: "Knee ligament",        expectedReturn: "Tournament doubt",    source: "RFEF Official",updatedAt: new Date().toISOString() },

  // Argentina
  { id: "i12", player: "P. Dybala",        team: "Argentina",   status: "Doubtful", severity: "Medium", issue: "Thigh concern",        expectedReturn: "Matchday decision",   source: "AFA Official", updatedAt: new Date().toISOString() },
  { id: "i13", player: "N. González",      team: "Argentina",   status: "Out",      severity: "Medium", issue: "Calf strain",          expectedReturn: "Group stage review",  source: "AFA Official", updatedAt: new Date().toISOString() },

  // Portugal
  { id: "i14", player: "D. Jota",          team: "Portugal",    status: "Out",      severity: "High",   issue: "Knee surgery",         expectedReturn: "Tournament doubt",    source: "FPF Official", updatedAt: new Date().toISOString() },
  { id: "i15", player: "N. Mendes",        team: "Portugal",    status: "Doubtful", severity: "Medium", issue: "Muscle fatigue",        expectedReturn: "Matchday decision",   source: "FPF Official", updatedAt: new Date().toISOString() },

  // Netherlands
  { id: "i16", player: "V. van Dijk",      team: "Netherlands", status: "Fit",      severity: "Low",    issue: "Minor groin (cleared)","expectedReturn": "Available",         source: "KNVB Official",updatedAt: new Date().toISOString() },
  { id: "i17", player: "M. de Ligt",       team: "Netherlands", status: "Doubtful", severity: "Medium", issue: "Back spasms",          expectedReturn: "Group stage review",  source: "KNVB Official",updatedAt: new Date().toISOString() },

  // USA
  { id: "i18", player: "T. Adams",         team: "USA",         status: "Fit",      severity: "Low",    issue: "Managed minutes",      expectedReturn: "Available",           source: "US Soccer",    updatedAt: new Date().toISOString() },
  { id: "i19", player: "C. Pulisic",       team: "USA",         status: "Fit",      severity: "Low",    issue: "Ankle tape (minor)",   expectedReturn: "Available",           source: "US Soccer",    updatedAt: new Date().toISOString() },
  { id: "i20", player: "G. Reyna",         team: "USA",         status: "Doubtful", severity: "Medium", issue: "Recurring hamstring",  expectedReturn: "Matchday decision",   source: "US Soccer",    updatedAt: new Date().toISOString() },

  // Morocco
  { id: "i21", player: "H. Ziyech",        team: "Morocco",     status: "Fit",      severity: "Low",    issue: "Shoulder (cleared)",   expectedReturn: "Available",           source: "FRMF Official",updatedAt: new Date().toISOString() },
  { id: "i22", player: "N. Mazraoui",      team: "Morocco",     status: "Out",      severity: "Medium", issue: "Hip flexor",           expectedReturn: "Group stage review",  source: "FRMF Official",updatedAt: new Date().toISOString() },

  // Japan
  { id: "i23", player: "D. Ito",           team: "Japan",       status: "Doubtful", severity: "Medium", issue: "Ankle sprain",         expectedReturn: "Matchday decision",   source: "JFA Official", updatedAt: new Date().toISOString() },
  { id: "i24", player: "W. Endo",          team: "Japan",       status: "Fit",      severity: "Low",    issue: "Rib knock (cleared)",  expectedReturn: "Available",           source: "JFA Official", updatedAt: new Date().toISOString() },

  // Mexico
  { id: "i25", player: "H. Lozano",        team: "Mexico",      status: "Fit",      severity: "Low",    issue: "Shoulder (monitoring)","expectedReturn": "Available",         source: "FMF Official", updatedAt: new Date().toISOString() },
  { id: "i26", player: "R. Jiménez",       team: "Mexico",      status: "Doubtful", severity: "High",   issue: "Groin strain",         expectedReturn: "Matchday decision",   source: "FMF Official", updatedAt: new Date().toISOString() },

  // Canada
  { id: "i27", player: "A. Davies",        team: "Canada",      status: "Fit",      severity: "Low",    issue: "Precautionary rest",   expectedReturn: "Available",           source: "Canada Soccer",updatedAt: new Date().toISOString() },
  { id: "i28", player: "J. David",         team: "Canada",      status: "Doubtful", severity: "Medium", issue: "Quad tightness",       expectedReturn: "Group stage review",  source: "Canada Soccer",updatedAt: new Date().toISOString() },

  // Senegal
  { id: "i29", player: "S. Mané",          team: "Senegal",     status: "Fit",      severity: "Low",    issue: "Fitness monitored",    expectedReturn: "Available",           source: "FSF Official", updatedAt: new Date().toISOString() },

  // Korea Republic
  { id: "i30", player: "H. Son",           team: "Korea Republic", status: "Fit",   severity: "Low",    issue: "Facial (healed)",      expectedReturn: "Available",           source: "KFA Official", updatedAt: new Date().toISOString() },
  { id: "i31", player: "H. Hwang",         team: "Korea Republic", status: "Doubtful", severity: "Medium", issue: "Knee soreness",     expectedReturn: "Matchday decision",   source: "KFA Official", updatedAt: new Date().toISOString() },

  // Italy (if qualified — placeholder)
  { id: "i32", player: "G. Donnarumma",    team: "Italy",       status: "Fit",      severity: "Low",    issue: "Minor hand injury",    expectedReturn: "Available",           source: "FIGC Official",updatedAt: new Date().toISOString() },
  { id: "i33", player: "F. Chiesa",        team: "Italy",       status: "Out",      severity: "High",   issue: "ACL recovery",         expectedReturn: "Tournament doubt",    source: "FIGC Official",updatedAt: new Date().toISOString() },

  // Belgium
  { id: "i34", player: "K. De Bruyne",     team: "Belgium",     status: "Doubtful", severity: "High",   issue: "Hamstring concern",    expectedReturn: "Matchday decision",   source: "RBFA Official", updatedAt: new Date().toISOString() },
  { id: "i35", player: "R. Lukaku",        team: "Belgium",     status: "Fit",      severity: "Low",    issue: "Fitness programme",    expectedReturn: "Available",           source: "RBFA Official", updatedAt: new Date().toISOString() },

  // Uruguay
  { id: "i36", player: "D. Núñez",         team: "Uruguay",     status: "Doubtful", severity: "Medium", issue: "Ankle knock",          expectedReturn: "Matchday decision",   source: "AUF Official",  updatedAt: new Date().toISOString() },
  { id: "i37", player: "F. Valverde",      team: "Uruguay",     status: "Fit",      severity: "Low",    issue: "Fatigue management",   expectedReturn: "Available",           source: "AUF Official",  updatedAt: new Date().toISOString() },

  // Colombia
  { id: "i38", player: "L. Díaz",          team: "Colombia",    status: "Fit",      severity: "Low",    issue: "Shoulder (cleared)",   expectedReturn: "Available",           source: "FCF Official",  updatedAt: new Date().toISOString() },
  { id: "i39", player: "J. Cuadrado",      team: "Colombia",    status: "Out",      severity: "High",   issue: "Knee ligament",        expectedReturn: "Tournament doubt",    source: "FCF Official",  updatedAt: new Date().toISOString() },

  // Australia
  { id: "i40", player: "M. Leckie",        team: "Australia",   status: "Doubtful", severity: "Medium", issue: "Hamstring tightness",  expectedReturn: "Group stage review",  source: "Football Australia", updatedAt: new Date().toISOString() },
  { id: "i41", player: "A. Hrustic",       team: "Australia",   status: "Out",      severity: "Medium", issue: "Calf tear",            expectedReturn: "Round of 16",         source: "Football Australia", updatedAt: new Date().toISOString() },

  // Croatia
  { id: "i42", player: "L. Modrić",        team: "Croatia",     status: "Fit",      severity: "Low",    issue: "Managed workload",     expectedReturn: "Available",           source: "HNS Official",  updatedAt: new Date().toISOString() },
  { id: "i43", player: "I. Gvardiol",      team: "Croatia",     status: "Doubtful", severity: "Medium", issue: "Groin strain",         expectedReturn: "Matchday decision",   source: "HNS Official",  updatedAt: new Date().toISOString() },

  // Switzerland
  { id: "i44", player: "G. Xhaka",         team: "Switzerland", status: "Fit",      severity: "Low",    issue: "Knee (monitoring)",    expectedReturn: "Available",           source: "SFV Official",  updatedAt: new Date().toISOString() },
  { id: "i45", player: "B. Embolo",        team: "Switzerland", status: "Doubtful", severity: "Medium", issue: "Thigh strain",         expectedReturn: "Matchday decision",   source: "SFV Official",  updatedAt: new Date().toISOString() },

  // Poland
  { id: "i46", player: "R. Lewandowski",   team: "Poland",      status: "Fit",      severity: "Low",    issue: "Minor rib knock",      expectedReturn: "Available",           source: "PZPN Official", updatedAt: new Date().toISOString() },
  { id: "i47", player: "P. Zieliński",     team: "Poland",      status: "Out",      severity: "High",   issue: "Knee surgery",         expectedReturn: "Tournament doubt",    source: "PZPN Official", updatedAt: new Date().toISOString() },

  // Ecuador
  { id: "i48", player: "E. Valencia",      team: "Ecuador",     status: "Doubtful", severity: "Medium", issue: "Calf tightness",       expectedReturn: "Matchday decision",   source: "FEF Official",  updatedAt: new Date().toISOString() },

  // Saudi Arabia
  { id: "i49", player: "S. Al-Dawsari",    team: "Saudi Arabia",status: "Fit",      severity: "Low",    issue: "Precautionary rest",   expectedReturn: "Available",           source: "SAFF Official", updatedAt: new Date().toISOString() },

  // Ghana
  { id: "i50", player: "T. Partey",        team: "Ghana",       status: "Out",      severity: "High",   issue: "Hip flexor tear",      expectedReturn: "Group stage review",  source: "GFA Official",  updatedAt: new Date().toISOString() },
];
