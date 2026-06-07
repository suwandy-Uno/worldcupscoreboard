import type { Match } from "@/lib/types";

// ─── Venue rotation ─────────────────────────────────────────────────────────
const V = [
  "MetLife Stadium",      "AT&T Stadium",          "SoFi Stadium",
  "Hard Rock Stadium",    "Levi's Stadium",         "Lincoln Financial Field",
  "Arrowhead Stadium",    "Mercedes-Benz Stadium",  "Allegiant Stadium",
  "NRG Stadium",          "Empower Field",          "BC Place",
  "BMO Field",            "Estadio Azteca",         "Estadio BBVA",
  "Estadio Akron",
];

type MI = {
  id: string; group: string; home: string; away: string;
  isoDate: string; venue: string;
  status?: Match["status"]; homeScore?: number | null; awayScore?: number | null;
  minute?: number; scorers?: string[];
};

function mk(i: MI): Match {
  const homeSlug = i.home.toLowerCase().replace(/[\s'&]/g, "-").replace(/-+/g, "-");
  const awaySlug = i.away.toLowerCase().replace(/[\s'&]/g, "-").replace(/-+/g, "-");
  const phase = ["R32","R16","QF","SF","3P","F"].includes(i.group) ? i.group.toLowerCase() : `group-${i.group.toLowerCase()}`;
  return {
    id: i.id,
    slug: `${homeSlug}-vs-${awaySlug}-${phase}`,
    group: i.group,
    home: i.home, away: i.away,
    homeScore: i.homeScore ?? null,
    awayScore: i.awayScore ?? null,
    venue: i.venue, isoDate: i.isoDate,
    status: i.status ?? "upcoming",
    minute: i.minute,
    scorers: i.scorers ?? [],
  };
}

export const matches: Match[] = [
  // ════════════════════════════════════════════════════════════════════════════
  // GROUP STAGE — MATCHDAY 1  (Jun 11–17)
  // ════════════════════════════════════════════════════════════════════════════

  // Group A
  mk({ id:"m1",  group:"A", home:"Mexico",        away:"South Africa",  isoDate:"2026-06-11T20:00:00Z", venue:V[13], status:"live",     homeScore:2, awayScore:1, minute:75, scorers:["H. Lozano 23'","U. Antuna 65'","P. Tau 45+1'"] }),
  mk({ id:"m2",  group:"A", home:"Netherlands",   away:"Ecuador",       isoDate:"2026-06-11T23:00:00Z", venue:V[0],  status:"upcoming" }),

  // Group B
  mk({ id:"m3",  group:"B", home:"Spain",         away:"Japan",         isoDate:"2026-06-11T22:00:00Z", venue:V[11], status:"live",     homeScore:1, awayScore:0, minute:58, scorers:["A. Morata 31'"] }),
  mk({ id:"m4",  group:"B", home:"Albania",       away:"Chile",         isoDate:"2026-06-12T01:00:00Z", venue:V[12], status:"upcoming" }),

  // Group C
  mk({ id:"m5",  group:"C", home:"USA",           away:"Iran",          isoDate:"2026-06-12T00:00:00Z", venue:V[1],  status:"halftime", homeScore:1, awayScore:1, minute:45, scorers:["T. Weah 14'","M. Taremi 37'"] }),
  mk({ id:"m6",  group:"C", home:"England",       away:"Wales",         isoDate:"2026-06-12T03:00:00Z", venue:V[5],  status:"upcoming" }),

  // Group D
  mk({ id:"m7",  group:"D", home:"France",        away:"Australia",     isoDate:"2026-06-12T16:00:00Z", venue:V[7],  status:"upcoming" }),
  mk({ id:"m8",  group:"D", home:"Argentina",     away:"Canada",        isoDate:"2026-06-13T01:00:00Z", venue:V[7],  status:"upcoming" }),

  // Group E
  mk({ id:"m9",  group:"E", home:"Brazil",        away:"Korea Republic",isoDate:"2026-06-12T22:00:00Z", venue:V[2],  status:"upcoming" }),
  mk({ id:"m10", group:"E", home:"Germany",       away:"Morocco",       isoDate:"2026-06-13T19:00:00Z", venue:V[1],  status:"upcoming" }),

  // Group F
  mk({ id:"m11", group:"F", home:"Portugal",      away:"Senegal",       isoDate:"2026-06-11T17:00:00Z", venue:V[0],  status:"finished", homeScore:2, awayScore:2, scorers:["B. Fernandes 12'","C. Ronaldo 78'","S. Mane 45'","I. Sarr 89'"] }),
  mk({ id:"m12", group:"F", home:"Uruguay",       away:"Nigeria",       isoDate:"2026-06-13T22:00:00Z", venue:V[3],  status:"upcoming" }),

  // Group G
  mk({ id:"m13", group:"G", home:"Belgium",       away:"Croatia",       isoDate:"2026-06-13T16:00:00Z", venue:V[6],  status:"upcoming" }),
  mk({ id:"m14", group:"G", home:"Qatar",         away:"Cameroon",      isoDate:"2026-06-14T01:00:00Z", venue:V[14], status:"upcoming" }),

  // Group H
  mk({ id:"m15", group:"H", home:"Italy",         away:"Colombia",      isoDate:"2026-06-14T16:00:00Z", venue:V[3],  status:"upcoming" }),
  mk({ id:"m16", group:"H", home:"Denmark",       away:"Ghana",         isoDate:"2026-06-14T22:00:00Z", venue:V[4],  status:"upcoming" }),

  // Group I
  mk({ id:"m17", group:"I", home:"Switzerland",   away:"Serbia",        isoDate:"2026-06-15T16:00:00Z", venue:V[8],  status:"upcoming" }),
  mk({ id:"m18", group:"I", home:"Tunisia",       away:"Ivory Coast",   isoDate:"2026-06-15T22:00:00Z", venue:V[9],  status:"upcoming" }),

  // Group J
  mk({ id:"m19", group:"J", home:"Poland",        away:"Austria",       isoDate:"2026-06-16T16:00:00Z", venue:V[10], status:"upcoming" }),
  mk({ id:"m20", group:"J", home:"Egypt",         away:"Jamaica",       isoDate:"2026-06-16T22:00:00Z", venue:V[5],  status:"upcoming" }),

  // Group K
  mk({ id:"m21", group:"K", home:"Turkey",        away:"Saudi Arabia",  isoDate:"2026-06-17T16:00:00Z", venue:V[13], status:"upcoming" }),
  mk({ id:"m22", group:"K", home:"Jordan",        away:"New Zealand",   isoDate:"2026-06-17T22:00:00Z", venue:V[15], status:"upcoming" }),

  // Group L
  mk({ id:"m23", group:"L", home:"Ukraine",       away:"Paraguay",      isoDate:"2026-06-17T19:00:00Z", venue:V[0],  status:"upcoming" }),
  mk({ id:"m24", group:"L", home:"Panama",        away:"Costa Rica",    isoDate:"2026-06-17T01:00:00Z", venue:V[12], status:"upcoming" }),

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP STAGE — MATCHDAY 2  (Jun 18–24)
  // ════════════════════════════════════════════════════════════════════════════

  // Group A
  mk({ id:"m25", group:"A", home:"Mexico",        away:"Netherlands",   isoDate:"2026-06-18T22:00:00Z", venue:V[14], status:"upcoming" }),
  mk({ id:"m26", group:"A", home:"Ecuador",       away:"South Africa",  isoDate:"2026-06-18T19:00:00Z", venue:V[1],  status:"upcoming" }),

  // Group B
  mk({ id:"m27", group:"B", home:"Spain",         away:"Albania",       isoDate:"2026-06-18T16:00:00Z", venue:V[0],  status:"upcoming" }),
  mk({ id:"m28", group:"B", home:"Japan",         away:"Chile",         isoDate:"2026-06-19T01:00:00Z", venue:V[11], status:"upcoming" }),

  // Group C
  mk({ id:"m29", group:"C", home:"USA",           away:"England",       isoDate:"2026-06-19T22:00:00Z", venue:V[1],  status:"upcoming" }),
  mk({ id:"m30", group:"C", home:"Iran",          away:"Wales",         isoDate:"2026-06-19T19:00:00Z", venue:V[5],  status:"upcoming" }),

  // Group D
  mk({ id:"m31", group:"D", home:"France",        away:"Argentina",     isoDate:"2026-06-19T16:00:00Z", venue:V[7],  status:"upcoming" }),
  mk({ id:"m32", group:"D", home:"Australia",     away:"Canada",        isoDate:"2026-06-20T01:00:00Z", venue:V[12], status:"upcoming" }),

  // Group E
  mk({ id:"m33", group:"E", home:"Brazil",        away:"Germany",       isoDate:"2026-06-20T22:00:00Z", venue:V[2],  status:"upcoming" }),
  mk({ id:"m34", group:"E", home:"Korea Republic",away:"Morocco",       isoDate:"2026-06-20T19:00:00Z", venue:V[3],  status:"upcoming" }),

  // Group F
  mk({ id:"m35", group:"F", home:"Portugal",      away:"Uruguay",       isoDate:"2026-06-21T22:00:00Z", venue:V[0],  status:"upcoming" }),
  mk({ id:"m36", group:"F", home:"Nigeria",       away:"Senegal",       isoDate:"2026-06-21T19:00:00Z", venue:V[4],  status:"upcoming" }),

  // Group G
  mk({ id:"m37", group:"G", home:"Belgium",       away:"Qatar",         isoDate:"2026-06-21T16:00:00Z", venue:V[6],  status:"upcoming" }),
  mk({ id:"m38", group:"G", home:"Croatia",       away:"Cameroon",      isoDate:"2026-06-22T01:00:00Z", venue:V[13], status:"upcoming" }),

  // Group H
  mk({ id:"m39", group:"H", home:"Italy",         away:"Denmark",       isoDate:"2026-06-22T22:00:00Z", venue:V[3],  status:"upcoming" }),
  mk({ id:"m40", group:"H", home:"Colombia",      away:"Ghana",         isoDate:"2026-06-22T19:00:00Z", venue:V[8],  status:"upcoming" }),

  // Group I
  mk({ id:"m41", group:"I", home:"Switzerland",   away:"Ivory Coast",   isoDate:"2026-06-22T16:00:00Z", venue:V[9],  status:"upcoming" }),
  mk({ id:"m42", group:"I", home:"Serbia",        away:"Tunisia",       isoDate:"2026-06-23T01:00:00Z", venue:V[10], status:"upcoming" }),

  // Group J
  mk({ id:"m43", group:"J", home:"Poland",        away:"Egypt",         isoDate:"2026-06-23T22:00:00Z", venue:V[5],  status:"upcoming" }),
  mk({ id:"m44", group:"J", home:"Austria",       away:"Jamaica",       isoDate:"2026-06-23T19:00:00Z", venue:V[0],  status:"upcoming" }),

  // Group K
  mk({ id:"m45", group:"K", home:"Turkey",        away:"Jordan",        isoDate:"2026-06-23T16:00:00Z", venue:V[14], status:"upcoming" }),
  mk({ id:"m46", group:"K", home:"Saudi Arabia",  away:"New Zealand",   isoDate:"2026-06-24T01:00:00Z", venue:V[15], status:"upcoming" }),

  // Group L
  mk({ id:"m47", group:"L", home:"Ukraine",       away:"Panama",        isoDate:"2026-06-24T22:00:00Z", venue:V[1],  status:"upcoming" }),
  mk({ id:"m48", group:"L", home:"Paraguay",      away:"Costa Rica",    isoDate:"2026-06-24T19:00:00Z", venue:V[11], status:"upcoming" }),

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP STAGE — MATCHDAY 3  (Jun 25–26, simultaneous pairs)
  // ════════════════════════════════════════════════════════════════════════════

  // Group A (simultaneous)
  mk({ id:"m49", group:"A", home:"Mexico",        away:"Ecuador",       isoDate:"2026-06-25T20:00:00Z", venue:V[13], status:"upcoming" }),
  mk({ id:"m50", group:"A", home:"South Africa",  away:"Netherlands",   isoDate:"2026-06-25T20:00:00Z", venue:V[0],  status:"upcoming" }),

  // Group B (simultaneous)
  mk({ id:"m51", group:"B", home:"Spain",         away:"Chile",         isoDate:"2026-06-25T23:00:00Z", venue:V[11], status:"upcoming" }),
  mk({ id:"m52", group:"B", home:"Japan",         away:"Albania",       isoDate:"2026-06-25T23:00:00Z", venue:V[12], status:"upcoming" }),

  // Group C (simultaneous)
  mk({ id:"m53", group:"C", home:"USA",           away:"Wales",         isoDate:"2026-06-25T17:00:00Z", venue:V[1],  status:"upcoming" }),
  mk({ id:"m54", group:"C", home:"England",       away:"Iran",          isoDate:"2026-06-25T17:00:00Z", venue:V[5],  status:"upcoming" }),

  // Group D (simultaneous)
  mk({ id:"m55", group:"D", home:"France",        away:"Canada",        isoDate:"2026-06-26T20:00:00Z", venue:V[7],  status:"upcoming" }),
  mk({ id:"m56", group:"D", home:"Argentina",     away:"Australia",     isoDate:"2026-06-26T20:00:00Z", venue:V[0],  status:"upcoming" }),

  // Group E (simultaneous)
  mk({ id:"m57", group:"E", home:"Brazil",        away:"Morocco",       isoDate:"2026-06-26T17:00:00Z", venue:V[2],  status:"upcoming" }),
  mk({ id:"m58", group:"E", home:"Korea Republic",away:"Germany",       isoDate:"2026-06-26T17:00:00Z", venue:V[3],  status:"upcoming" }),

  // Group F (simultaneous)
  mk({ id:"m59", group:"F", home:"Portugal",      away:"Nigeria",       isoDate:"2026-06-26T23:00:00Z", venue:V[4],  status:"upcoming" }),
  mk({ id:"m60", group:"F", home:"Senegal",       away:"Uruguay",       isoDate:"2026-06-26T23:00:00Z", venue:V[9],  status:"upcoming" }),

  // Group G (simultaneous)
  mk({ id:"m61", group:"G", home:"Belgium",       away:"Cameroon",      isoDate:"2026-06-25T20:00:00Z", venue:V[6],  status:"upcoming" }),
  mk({ id:"m62", group:"G", home:"Croatia",       away:"Qatar",         isoDate:"2026-06-25T20:00:00Z", venue:V[14], status:"upcoming" }),

  // Group H (simultaneous)
  mk({ id:"m63", group:"H", home:"Italy",         away:"Ghana",         isoDate:"2026-06-25T23:00:00Z", venue:V[8],  status:"upcoming" }),
  mk({ id:"m64", group:"H", home:"Denmark",       away:"Colombia",      isoDate:"2026-06-25T23:00:00Z", venue:V[10], status:"upcoming" }),

  // Group I (simultaneous)
  mk({ id:"m65", group:"I", home:"Switzerland",   away:"Tunisia",       isoDate:"2026-06-26T20:00:00Z", venue:V[15], status:"upcoming" }),
  mk({ id:"m66", group:"I", home:"Serbia",        away:"Ivory Coast",   isoDate:"2026-06-26T20:00:00Z", venue:V[5],  status:"upcoming" }),

  // Group J (simultaneous)
  mk({ id:"m67", group:"J", home:"Poland",        away:"Jamaica",       isoDate:"2026-06-26T17:00:00Z", venue:V[0],  status:"upcoming" }),
  mk({ id:"m68", group:"J", home:"Austria",       away:"Egypt",         isoDate:"2026-06-26T17:00:00Z", venue:V[1],  status:"upcoming" }),

  // Group K (simultaneous)
  mk({ id:"m69", group:"K", home:"Turkey",        away:"New Zealand",   isoDate:"2026-06-26T23:00:00Z", venue:V[13], status:"upcoming" }),
  mk({ id:"m70", group:"K", home:"Saudi Arabia",  away:"Jordan",        isoDate:"2026-06-26T23:00:00Z", venue:V[14], status:"upcoming" }),

  // Group L (simultaneous)
  mk({ id:"m71", group:"L", home:"Ukraine",       away:"Costa Rica",    isoDate:"2026-06-26T20:00:00Z", venue:V[11], status:"upcoming" }),
  mk({ id:"m72", group:"L", home:"Panama",        away:"Paraguay",      isoDate:"2026-06-26T20:00:00Z", venue:V[12], status:"upcoming" }),

  // ════════════════════════════════════════════════════════════════════════════
  // ROUND OF 32  (Jun 28 – Jul 2)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m73", group:"R32", home:"Winner Group A",    away:"3rd B/C/D",      isoDate:"2026-06-28T20:00:00Z", venue:V[0]  }),
  mk({ id:"m74", group:"R32", home:"Winner Group C",    away:"Runner-up Group A",isoDate:"2026-06-28T23:00:00Z",venue:V[1]  }),
  mk({ id:"m75", group:"R32", home:"Winner Group B",    away:"3rd A/C/D",      isoDate:"2026-06-29T17:00:00Z", venue:V[2]  }),
  mk({ id:"m76", group:"R32", home:"Winner Group D",    away:"Runner-up Group B",isoDate:"2026-06-29T20:00:00Z",venue:V[3]  }),
  mk({ id:"m77", group:"R32", home:"Winner Group E",    away:"3rd E/F/G",      isoDate:"2026-06-29T23:00:00Z", venue:V[4]  }),
  mk({ id:"m78", group:"R32", home:"Winner Group G",    away:"Runner-up Group E",isoDate:"2026-06-30T17:00:00Z",venue:V[5]  }),
  mk({ id:"m79", group:"R32", home:"Winner Group F",    away:"3rd F/H/I",      isoDate:"2026-06-30T20:00:00Z", venue:V[6]  }),
  mk({ id:"m80", group:"R32", home:"Winner Group H",    away:"Runner-up Group F",isoDate:"2026-06-30T23:00:00Z",venue:V[7]  }),
  mk({ id:"m81", group:"R32", home:"Winner Group I",    away:"3rd I/J/K",      isoDate:"2026-07-01T17:00:00Z", venue:V[8]  }),
  mk({ id:"m82", group:"R32", home:"Winner Group K",    away:"Runner-up Group I",isoDate:"2026-07-01T20:00:00Z",venue:V[9]  }),
  mk({ id:"m83", group:"R32", home:"Winner Group J",    away:"3rd J/K/L",      isoDate:"2026-07-01T23:00:00Z", venue:V[10] }),
  mk({ id:"m84", group:"R32", home:"Winner Group L",    away:"Runner-up Group J",isoDate:"2026-07-02T17:00:00Z",venue:V[11] }),
  mk({ id:"m85", group:"R32", home:"Runner-up Group C", away:"Runner-up Group D",isoDate:"2026-07-02T20:00:00Z",venue:V[12] }),
  mk({ id:"m86", group:"R32", home:"Runner-up Group G", away:"Runner-up Group H",isoDate:"2026-07-02T23:00:00Z",venue:V[13] }),
  mk({ id:"m87", group:"R32", home:"Runner-up Group K", away:"Runner-up Group L",isoDate:"2026-07-03T17:00:00Z",venue:V[14] }),
  mk({ id:"m88", group:"R32", home:"Best 3rd Place",    away:"Best 3rd Place",  isoDate:"2026-07-03T20:00:00Z", venue:V[15] }),

  // ════════════════════════════════════════════════════════════════════════════
  // ROUND OF 16  (Jul 5–8)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m89", group:"R16", home:"R32 Winner 1", away:"R32 Winner 2", isoDate:"2026-07-05T20:00:00Z", venue:V[0]  }),
  mk({ id:"m90", group:"R16", home:"R32 Winner 3", away:"R32 Winner 4", isoDate:"2026-07-05T23:00:00Z", venue:V[1]  }),
  mk({ id:"m91", group:"R16", home:"R32 Winner 5", away:"R32 Winner 6", isoDate:"2026-07-06T20:00:00Z", venue:V[2]  }),
  mk({ id:"m92", group:"R16", home:"R32 Winner 7", away:"R32 Winner 8", isoDate:"2026-07-06T23:00:00Z", venue:V[3]  }),
  mk({ id:"m93", group:"R16", home:"R32 Winner 9", away:"R32 Winner 10",isoDate:"2026-07-07T20:00:00Z", venue:V[4]  }),
  mk({ id:"m94", group:"R16", home:"R32 Winner 11",away:"R32 Winner 12",isoDate:"2026-07-07T23:00:00Z", venue:V[5]  }),
  mk({ id:"m95", group:"R16", home:"R32 Winner 13",away:"R32 Winner 14",isoDate:"2026-07-08T20:00:00Z", venue:V[6]  }),
  mk({ id:"m96", group:"R16", home:"R32 Winner 15",away:"R32 Winner 16",isoDate:"2026-07-08T23:00:00Z", venue:V[7]  }),

  // ════════════════════════════════════════════════════════════════════════════
  // QUARTER-FINALS  (Jul 11–12)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m97", group:"QF", home:"R16 Winner 1", away:"R16 Winner 2", isoDate:"2026-07-11T20:00:00Z", venue:V[0]  }),
  mk({ id:"m98", group:"QF", home:"R16 Winner 3", away:"R16 Winner 4", isoDate:"2026-07-11T23:00:00Z", venue:V[1]  }),
  mk({ id:"m99", group:"QF", home:"R16 Winner 5", away:"R16 Winner 6", isoDate:"2026-07-12T20:00:00Z", venue:V[2]  }),
  mk({ id:"m100",group:"QF", home:"R16 Winner 7", away:"R16 Winner 8", isoDate:"2026-07-12T23:00:00Z", venue:V[3]  }),

  // ════════════════════════════════════════════════════════════════════════════
  // SEMI-FINALS  (Jul 15–16)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m101",group:"SF", home:"QF Winner 1",  away:"QF Winner 2",  isoDate:"2026-07-15T20:00:00Z", venue:V[0]  }),
  mk({ id:"m102",group:"SF", home:"QF Winner 3",  away:"QF Winner 4",  isoDate:"2026-07-16T20:00:00Z", venue:V[2]  }),

  // ════════════════════════════════════════════════════════════════════════════
  // THIRD PLACE  (Jul 19)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m103",group:"3P", home:"SF Loser 1",   away:"SF Loser 2",   isoDate:"2026-07-19T17:00:00Z", venue:V[1]  }),

  // ════════════════════════════════════════════════════════════════════════════
  // FINAL  (Jul 19)
  // ════════════════════════════════════════════════════════════════════════════

  mk({ id:"m104",group:"F",  home:"SF Winner 1",  away:"SF Winner 2",  isoDate:"2026-07-19T20:00:00Z", venue:V[0]  }),
];
