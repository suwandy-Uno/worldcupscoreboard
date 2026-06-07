import type { Injury } from "@/lib/types";

export const injuries: Injury[] = [
  // Germany — Group E
  { id: "i1",  player: "J. Kimmich",      team: "Germany",        group: "Group E", status: "Out",      severity: "Medium", issue: "Muscle injury",           expectedReturn: "Group stage review",  source: "DFB Official",       updatedAt: new Date().toISOString() },
  { id: "i2",  player: "F. Wirtz",         team: "Germany",        group: "Group E", status: "Doubtful", severity: "Low",    issue: "Knock",                   expectedReturn: "Matchday decision",   source: "DFB Official",       updatedAt: new Date().toISOString() },

  // Brazil — Group B
  { id: "i3",  player: "Neymar Jr.",       team: "Brazil",         group: "Group B", status: "Doubtful", severity: "High",   issue: "Knee injury",             expectedReturn: "Matchday decision",   source: "CBF Official",       updatedAt: new Date().toISOString() },
  { id: "i4",  player: "G. Jesus",         team: "Brazil",         group: "Group B", status: "Out",      severity: "High",   issue: "Hamstring strain",        expectedReturn: "Round of 16",         source: "CBF Official",       updatedAt: new Date().toISOString() },

  // France — Group D
  { id: "i5",  player: "P. Pogba",         team: "France",         group: "Group D", status: "Out",      severity: "High",   issue: "Ankle injury",            expectedReturn: "Unknown",             source: "FFF Official",       updatedAt: new Date().toISOString() },
  { id: "i6",  player: "K. Benzema",       team: "France",         group: "Group D", status: "Out",      severity: "High",   issue: "Thigh tear",              expectedReturn: "Tournament doubt",    source: "FFF Official",       updatedAt: new Date().toISOString() },
  { id: "i7",  player: "L. Hernandez",     team: "France",         group: "Group D", status: "Doubtful", severity: "Medium", issue: "Knee soreness",           expectedReturn: "Group stage review",  source: "FFF Official",       updatedAt: new Date().toISOString() },

  // England — Group G
  { id: "i8",  player: "R. James",         team: "England",        group: "Group G", status: "Out",      severity: "High",   issue: "Hamstring",               expectedReturn: "Quarterfinal",        source: "FA Official",        updatedAt: new Date().toISOString() },
  { id: "i9",  player: "B. Saka",          team: "England",        group: "Group G", status: "Fit",      severity: "Low",    issue: "Minor knock (cleared)",   expectedReturn: "Available",           source: "FA Official",        updatedAt: new Date().toISOString() },

  // Spain — Group F
  { id: "i10", player: "G. Ramos",         team: "Spain",          group: "Group F", status: "Fit",      severity: "Low",    issue: "Precautionary rest",      expectedReturn: "Available",           source: "RFEF Official",      updatedAt: new Date().toISOString() },
  { id: "i11", player: "D. Carvajal",      team: "Spain",          group: "Group F", status: "Out",      severity: "High",   issue: "Knee ligament",           expectedReturn: "Tournament doubt",    source: "RFEF Official",      updatedAt: new Date().toISOString() },

  // Argentina — Group C
  { id: "i12", player: "P. Dybala",        team: "Argentina",      group: "Group C", status: "Doubtful", severity: "Medium", issue: "Thigh concern",           expectedReturn: "Matchday decision",   source: "AFA Official",       updatedAt: new Date().toISOString() },
  { id: "i13", player: "N. González",      team: "Argentina",      group: "Group C", status: "Out",      severity: "Medium", issue: "Calf strain",             expectedReturn: "Group stage review",  source: "AFA Official",       updatedAt: new Date().toISOString() },

  // Portugal — Group H
  { id: "i14", player: "D. Jota",          team: "Portugal",       group: "Group H", status: "Out",      severity: "High",   issue: "Knee surgery",            expectedReturn: "Tournament doubt",    source: "FPF Official",       updatedAt: new Date().toISOString() },
  { id: "i15", player: "N. Mendes",        team: "Portugal",       group: "Group H", status: "Doubtful", severity: "Medium", issue: "Muscle fatigue",          expectedReturn: "Matchday decision",   source: "FPF Official",       updatedAt: new Date().toISOString() },

  // Netherlands — Group A
  { id: "i16", player: "V. van Dijk",      team: "Netherlands",    group: "Group A", status: "Fit",      severity: "Low",    issue: "Minor groin (cleared)",   expectedReturn: "Available",           source: "KNVB Official",      updatedAt: new Date().toISOString() },
  { id: "i17", player: "M. de Ligt",       team: "Netherlands",    group: "Group A", status: "Doubtful", severity: "Medium", issue: "Back spasms",             expectedReturn: "Group stage review",  source: "KNVB Official",      updatedAt: new Date().toISOString() },

  // USA — Group B
  { id: "i18", player: "T. Adams",         team: "USA",            group: "Group B", status: "Fit",      severity: "Low",    issue: "Managed minutes",         expectedReturn: "Available",           source: "US Soccer",          updatedAt: new Date().toISOString() },
  { id: "i19", player: "C. Pulisic",       team: "USA",            group: "Group B", status: "Fit",      severity: "Low",    issue: "Ankle tape (minor)",      expectedReturn: "Available",           source: "US Soccer",          updatedAt: new Date().toISOString() },
  { id: "i20", player: "G. Reyna",         team: "USA",            group: "Group B", status: "Doubtful", severity: "Medium", issue: "Recurring hamstring",     expectedReturn: "Matchday decision",   source: "US Soccer",          updatedAt: new Date().toISOString() },

  // Morocco — Group J
  { id: "i21", player: "H. Ziyech",        team: "Morocco",        group: "Group J", status: "Fit",      severity: "Low",    issue: "Shoulder (cleared)",      expectedReturn: "Available",           source: "FRMF Official",      updatedAt: new Date().toISOString() },
  { id: "i22", player: "N. Mazraoui",      team: "Morocco",        group: "Group J", status: "Out",      severity: "Medium", issue: "Hip flexor",              expectedReturn: "Group stage review",  source: "FRMF Official",      updatedAt: new Date().toISOString() },

  // Japan — Group E
  { id: "i23", player: "D. Ito",           team: "Japan",          group: "Group E", status: "Doubtful", severity: "Medium", issue: "Ankle sprain",            expectedReturn: "Matchday decision",   source: "JFA Official",       updatedAt: new Date().toISOString() },
  { id: "i24", player: "W. Endo",          team: "Japan",          group: "Group E", status: "Fit",      severity: "Low",    issue: "Rib knock (cleared)",     expectedReturn: "Available",           source: "JFA Official",       updatedAt: new Date().toISOString() },

  // Mexico — Group K
  { id: "i25", player: "H. Lozano",        team: "Mexico",         group: "Group K", status: "Fit",      severity: "Low",    issue: "Shoulder (monitoring)",   expectedReturn: "Available",           source: "FMF Official",       updatedAt: new Date().toISOString() },
  { id: "i26", player: "R. Jiménez",       team: "Mexico",         group: "Group K", status: "Doubtful", severity: "High",   issue: "Groin strain",            expectedReturn: "Matchday decision",   source: "FMF Official",       updatedAt: new Date().toISOString() },

  // Canada — Group L
  { id: "i27", player: "A. Davies",        team: "Canada",         group: "Group L", status: "Fit",      severity: "Low",    issue: "Precautionary rest",      expectedReturn: "Available",           source: "Canada Soccer",      updatedAt: new Date().toISOString() },
  { id: "i28", player: "J. David",         team: "Canada",         group: "Group L", status: "Doubtful", severity: "Medium", issue: "Quad tightness",          expectedReturn: "Group stage review",  source: "Canada Soccer",      updatedAt: new Date().toISOString() },

  // Senegal — Group C
  { id: "i29", player: "S. Mané",          team: "Senegal",        group: "Group C", status: "Fit",      severity: "Low",    issue: "Fitness monitored",       expectedReturn: "Available",           source: "FSF Official",       updatedAt: new Date().toISOString() },

  // Korea Republic — Group H
  { id: "i30", player: "H. Son",           team: "Korea Republic", group: "Group H", status: "Fit",      severity: "Low",    issue: "Facial (healed)",         expectedReturn: "Available",           source: "KFA Official",       updatedAt: new Date().toISOString() },
  { id: "i31", player: "H. Hwang",         team: "Korea Republic", group: "Group H", status: "Doubtful", severity: "Medium", issue: "Knee soreness",           expectedReturn: "Matchday decision",   source: "KFA Official",       updatedAt: new Date().toISOString() },

  // Italy — Group G
  { id: "i32", player: "G. Donnarumma",    team: "Italy",          group: "Group G", status: "Fit",      severity: "Low",    issue: "Minor hand injury",       expectedReturn: "Available",           source: "FIGC Official",      updatedAt: new Date().toISOString() },
  { id: "i33", player: "F. Chiesa",        team: "Italy",          group: "Group G", status: "Out",      severity: "High",   issue: "ACL recovery",            expectedReturn: "Tournament doubt",    source: "FIGC Official",      updatedAt: new Date().toISOString() },

  // Belgium — Group F
  { id: "i34", player: "K. De Bruyne",     team: "Belgium",        group: "Group F", status: "Doubtful", severity: "High",   issue: "Hamstring concern",       expectedReturn: "Matchday decision",   source: "RBFA Official",      updatedAt: new Date().toISOString() },
  { id: "i35", player: "R. Lukaku",        team: "Belgium",        group: "Group F", status: "Fit",      severity: "Low",    issue: "Fitness programme",       expectedReturn: "Available",           source: "RBFA Official",      updatedAt: new Date().toISOString() },

  // Uruguay — Group D
  { id: "i36", player: "D. Núñez",         team: "Uruguay",        group: "Group D", status: "Doubtful", severity: "Medium", issue: "Ankle knock",             expectedReturn: "Matchday decision",   source: "AUF Official",       updatedAt: new Date().toISOString() },
  { id: "i37", player: "F. Valverde",      team: "Uruguay",        group: "Group D", status: "Fit",      severity: "Low",    issue: "Fatigue management",      expectedReturn: "Available",           source: "AUF Official",       updatedAt: new Date().toISOString() },

  // Colombia — Group I
  { id: "i38", player: "L. Díaz",          team: "Colombia",       group: "Group I", status: "Fit",      severity: "Low",    issue: "Shoulder (cleared)",      expectedReturn: "Available",           source: "FCF Official",       updatedAt: new Date().toISOString() },
  { id: "i39", player: "J. Cuadrado",      team: "Colombia",       group: "Group I", status: "Out",      severity: "High",   issue: "Knee ligament",           expectedReturn: "Tournament doubt",    source: "FCF Official",       updatedAt: new Date().toISOString() },

  // Australia — Group J
  { id: "i40", player: "M. Leckie",        team: "Australia",      group: "Group J", status: "Doubtful", severity: "Medium", issue: "Hamstring tightness",     expectedReturn: "Group stage review",  source: "Football Australia", updatedAt: new Date().toISOString() },
  { id: "i41", player: "A. Hrustic",       team: "Australia",      group: "Group J", status: "Out",      severity: "Medium", issue: "Calf tear",               expectedReturn: "Round of 16",         source: "Football Australia", updatedAt: new Date().toISOString() },

  // Croatia — Group E
  { id: "i42", player: "L. Modrić",        team: "Croatia",        group: "Group E", status: "Fit",      severity: "Low",    issue: "Managed workload",        expectedReturn: "Available",           source: "HNS Official",       updatedAt: new Date().toISOString() },
  { id: "i43", player: "I. Gvardiol",      team: "Croatia",        group: "Group E", status: "Doubtful", severity: "Medium", issue: "Groin strain",            expectedReturn: "Matchday decision",   source: "HNS Official",       updatedAt: new Date().toISOString() },

  // Switzerland — Group A
  { id: "i44", player: "G. Xhaka",         team: "Switzerland",    group: "Group A", status: "Fit",      severity: "Low",    issue: "Knee (monitoring)",       expectedReturn: "Available",           source: "SFV Official",       updatedAt: new Date().toISOString() },
  { id: "i45", player: "B. Embolo",        team: "Switzerland",    group: "Group A", status: "Doubtful", severity: "Medium", issue: "Thigh strain",            expectedReturn: "Matchday decision",   source: "SFV Official",       updatedAt: new Date().toISOString() },

  // Poland — Group D
  { id: "i46", player: "R. Lewandowski",   team: "Poland",         group: "Group D", status: "Fit",      severity: "Low",    issue: "Minor rib knock",         expectedReturn: "Available",           source: "PZPN Official",      updatedAt: new Date().toISOString() },
  { id: "i47", player: "P. Zieliński",     team: "Poland",         group: "Group D", status: "Out",      severity: "High",   issue: "Knee surgery",            expectedReturn: "Tournament doubt",    source: "PZPN Official",      updatedAt: new Date().toISOString() },

  // Ecuador — Group A
  { id: "i48", player: "E. Valencia",      team: "Ecuador",        group: "Group A", status: "Doubtful", severity: "Medium", issue: "Calf tightness",          expectedReturn: "Matchday decision",   source: "FEF Official",       updatedAt: new Date().toISOString() },

  // Saudi Arabia — Group K
  { id: "i49", player: "S. Al-Dawsari",    team: "Saudi Arabia",   group: "Group K", status: "Fit",      severity: "Low",    issue: "Precautionary rest",      expectedReturn: "Available",           source: "SAFF Official",      updatedAt: new Date().toISOString() },

  // Ghana — Group B
  { id: "i50", player: "T. Partey",        team: "Ghana",          group: "Group B", status: "Out",      severity: "High",   issue: "Hip flexor tear",         expectedReturn: "Group stage review",  source: "GFA Official",       updatedAt: new Date().toISOString() },
];
