import type { Team } from "@/lib/types";

export const teams: Team[] = [
  // ── Group A ────────────────────────────────────────────────────────────────
  { id: "mex", name: "Mexico",          slug: "mexico",          flag: "🇲🇽", flagCode: "mx",     group: "A", confederation: "CONCACAF",  ranking: 14, form: "WWDLW" },
  { id: "saf", name: "South Africa",    slug: "south-africa",    flag: "🇿🇦", flagCode: "za",     group: "A", confederation: "CAF",       ranking: 66, form: "DWLWL" },
  { id: "ned", name: "Netherlands",     slug: "netherlands",     flag: "🇳🇱", flagCode: "nl",     group: "A", confederation: "UEFA",      ranking: 7,  form: "WDWWW" },
  { id: "ecu", name: "Ecuador",         slug: "ecuador",         flag: "🇪🇨", flagCode: "ec",     group: "A", confederation: "CONMEBOL",  ranking: 32, form: "LDWWL" },

  // ── Group B ────────────────────────────────────────────────────────────────
  { id: "esp", name: "Spain",           slug: "spain",           flag: "🇪🇸", flagCode: "es",     group: "B", confederation: "UEFA",      ranking: 8,  form: "WWDWW" },
  { id: "jpn", name: "Japan",           slug: "japan",           flag: "🇯🇵", flagCode: "jp",     group: "B", confederation: "AFC",       ranking: 18, form: "WLWWW" },
  { id: "alb", name: "Albania",         slug: "albania",         flag: "🇦🇱", flagCode: "al",     group: "B", confederation: "UEFA",      ranking: 64, form: "DLLWW" },
  { id: "chi", name: "Chile",           slug: "chile",           flag: "🇨🇱", flagCode: "cl",     group: "B", confederation: "CONMEBOL",  ranking: 42, form: "LWDLD" },

  // ── Group C ────────────────────────────────────────────────────────────────
  { id: "usa", name: "USA",             slug: "usa",             flag: "🇺🇸", flagCode: "us",     group: "C", confederation: "CONCACAF",  ranking: 11, form: "DWWDW" },
  { id: "eng", name: "England",         slug: "england",         flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flagCode: "gb-eng", group: "C", confederation: "UEFA",      ranking: 4,  form: "WWWDW" },
  { id: "irn", name: "Iran",            slug: "iran",            flag: "🇮🇷", flagCode: "ir",     group: "C", confederation: "AFC",       ranking: 20, form: "LDWDL" },
  { id: "wal", name: "Wales",           slug: "wales",           flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", flagCode: "gb-wls", group: "C", confederation: "UEFA",      ranking: 29, form: "DDLWL" },

  // ── Group D ────────────────────────────────────────────────────────────────
  { id: "fra", name: "France",          slug: "france",          flag: "🇫🇷", flagCode: "fr",     group: "D", confederation: "UEFA",      ranking: 2,  form: "WWLWW" },
  { id: "aus", name: "Australia",       slug: "australia",       flag: "🇦🇺", flagCode: "au",     group: "D", confederation: "AFC",       ranking: 24, form: "WDLDW" },
  { id: "arg", name: "Argentina",       slug: "argentina",       flag: "🇦🇷", flagCode: "ar",     group: "D", confederation: "CONMEBOL",  ranking: 1,  form: "WWWWW" },
  { id: "can", name: "Canada",          slug: "canada",          flag: "🇨🇦", flagCode: "ca",     group: "D", confederation: "CONCACAF",  ranking: 36, form: "LWWDL" },

  // ── Group E ────────────────────────────────────────────────────────────────
  { id: "bra", name: "Brazil",          slug: "brazil",          flag: "🇧🇷", flagCode: "br",     group: "E", confederation: "CONMEBOL",  ranking: 5,  form: "WDWLW" },
  { id: "kor", name: "Korea Republic",  slug: "korea-republic",  flag: "🇰🇷", flagCode: "kr",     group: "E", confederation: "AFC",       ranking: 23, form: "WWDLL" },
  { id: "ger", name: "Germany",         slug: "germany",         flag: "🇩🇪", flagCode: "de",     group: "E", confederation: "UEFA",      ranking: 12, form: "WDWWW" },
  { id: "mor", name: "Morocco",         slug: "morocco",         flag: "🇲🇦", flagCode: "ma",     group: "E", confederation: "CAF",       ranking: 13, form: "WLWDW" },

  // ── Group F ────────────────────────────────────────────────────────────────
  { id: "por", name: "Portugal",        slug: "portugal",        flag: "🇵🇹", flagCode: "pt",     group: "F", confederation: "UEFA",      ranking: 6,  form: "WWLWW" },
  { id: "sen", name: "Senegal",         slug: "senegal",         flag: "🇸🇳", flagCode: "sn",     group: "F", confederation: "CAF",       ranking: 17, form: "DWDLW" },
  { id: "uru", name: "Uruguay",         slug: "uruguay",         flag: "🇺🇾", flagCode: "uy",     group: "F", confederation: "CONMEBOL",  ranking: 15, form: "WWDWL" },
  { id: "nga", name: "Nigeria",         slug: "nigeria",         flag: "🇳🇬", flagCode: "ng",     group: "F", confederation: "CAF",       ranking: 30, form: "LDWWW" },

  // ── Group G ────────────────────────────────────────────────────────────────
  { id: "bel", name: "Belgium",         slug: "belgium",         flag: "🇧🇪", flagCode: "be",     group: "G", confederation: "UEFA",      ranking: 3,  form: "WWWDW" },
  { id: "cro", name: "Croatia",         slug: "croatia",         flag: "🇭🇷", flagCode: "hr",     group: "G", confederation: "UEFA",      ranking: 10, form: "WDWLW" },
  { id: "qat", name: "Qatar",           slug: "qatar",           flag: "🇶🇦", flagCode: "qa",     group: "G", confederation: "AFC",       ranking: 58, form: "LWLDW" },
  { id: "cmr", name: "Cameroon",        slug: "cameroon",        flag: "🇨🇲", flagCode: "cm",     group: "G", confederation: "CAF",       ranking: 43, form: "WLDWL" },

  // ── Group H ────────────────────────────────────────────────────────────────
  { id: "ita", name: "Italy",           slug: "italy",           flag: "🇮🇹", flagCode: "it",     group: "H", confederation: "UEFA",      ranking: 9,  form: "DWWLW" },
  { id: "col", name: "Colombia",        slug: "colombia",        flag: "🇨🇴", flagCode: "co",     group: "H", confederation: "CONMEBOL",  ranking: 19, form: "WWDWL" },
  { id: "den", name: "Denmark",         slug: "denmark",         flag: "🇩🇰", flagCode: "dk",     group: "H", confederation: "UEFA",      ranking: 21, form: "WDLWW" },
  { id: "gha", name: "Ghana",           slug: "ghana",           flag: "🇬🇭", flagCode: "gh",     group: "H", confederation: "CAF",       ranking: 60, form: "LLDWW" },

  // ── Group I ────────────────────────────────────────────────────────────────
  { id: "swi", name: "Switzerland",     slug: "switzerland",     flag: "🇨🇭", flagCode: "ch",     group: "I", confederation: "UEFA",      ranking: 22, form: "WDWWL" },
  { id: "srb", name: "Serbia",          slug: "serbia",          flag: "🇷🇸", flagCode: "rs",     group: "I", confederation: "UEFA",      ranking: 33, form: "LWWDL" },
  { id: "tun", name: "Tunisia",         slug: "tunisia",         flag: "🇹🇳", flagCode: "tn",     group: "I", confederation: "CAF",       ranking: 35, form: "DWLWW" },
  { id: "civ", name: "Ivory Coast",     slug: "ivory-coast",     flag: "🇨🇮", flagCode: "ci",     group: "I", confederation: "CAF",       ranking: 51, form: "WWDLL" },

  // ── Group J ────────────────────────────────────────────────────────────────
  { id: "pol", name: "Poland",          slug: "poland",          flag: "🇵🇱", flagCode: "pl",     group: "J", confederation: "UEFA",      ranking: 28, form: "LDWWW" },
  { id: "aut", name: "Austria",         slug: "austria",         flag: "🇦🇹", flagCode: "at",     group: "J", confederation: "UEFA",      ranking: 25, form: "WWLDW" },
  { id: "egy", name: "Egypt",           slug: "egypt",           flag: "🇪🇬", flagCode: "eg",     group: "J", confederation: "CAF",       ranking: 38, form: "WLDWL" },
  { id: "jam", name: "Jamaica",         slug: "jamaica",         flag: "🇯🇲", flagCode: "jm",     group: "J", confederation: "CONCACAF",  ranking: 55, form: "DLLWW" },

  // ── Group K ────────────────────────────────────────────────────────────────
  { id: "tur", name: "Turkey",          slug: "turkey",          flag: "🇹🇷", flagCode: "tr",     group: "K", confederation: "UEFA",      ranking: 40, form: "WDLWW" },
  { id: "ksa", name: "Saudi Arabia",    slug: "saudi-arabia",    flag: "🇸🇦", flagCode: "sa",     group: "K", confederation: "AFC",       ranking: 55, form: "WLLWD" },
  { id: "jor", name: "Jordan",          slug: "jordan",          flag: "🇯🇴", flagCode: "jo",     group: "K", confederation: "AFC",       ranking: 70, form: "DWLLD" },
  { id: "nzl", name: "New Zealand",     slug: "new-zealand",     flag: "🇳🇿", flagCode: "nz",     group: "K", confederation: "OFC",       ranking: 100, form: "LLDWL" },

  // ── Group L ────────────────────────────────────────────────────────────────
  { id: "ukr", name: "Ukraine",         slug: "ukraine",         flag: "🇺🇦", flagCode: "ua",     group: "L", confederation: "UEFA",      ranking: 27, form: "WDWLW" },
  { id: "par", name: "Paraguay",        slug: "paraguay",        flag: "🇵🇾", flagCode: "py",     group: "L", confederation: "CONMEBOL",  ranking: 45, form: "LDLDW" },
  { id: "pan", name: "Panama",          slug: "panama",          flag: "🇵🇦", flagCode: "pa",     group: "L", confederation: "CONCACAF",  ranking: 62, form: "WDLLL" },
  { id: "crc", name: "Costa Rica",      slug: "costa-rica",      flag: "🇨🇷", flagCode: "cr",     group: "L", confederation: "CONCACAF",  ranking: 50, form: "WDWLL" },
];
