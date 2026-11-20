/* Innhold for konseptet.
   REAL = hentet fra dagens norgesdartsforbund.no (nov. 2026).
   DEMO = eksempeldata som skal erstattes av data fra medlemsregisteret/terminlisten. */

window.NDF = {
  /* REAL: titles, dates, links. Short summaries written for the concept. */
  news: [
    { id: 151, date: "2026-11-15", title: "Terminliste 2027", tag: "Terminliste",
      summary: "Terminlisten for 2027 er publisert. Endringer kan komme hvis WDF endrer sin terminliste.",
      body: ["Terminlisten for sesongen 2027 er nå publisert.", "Datoene kan bli justert dersom World Darts Federation (WDF) endrer sin internasjonale terminliste. Følg med her og på Facebook for oppdateringer."],
      source: "https://norgesdartsforbund.no/News/151/Terminliste-2027.aspx" },
    { id: 150, date: "2026-10-26", title: "Styremøte gjennomført", tag: "Forbundet",
      summary: "Styret i NDF har hatt møte.",
      body: ["Styret i Norges Dartsforbund har gjennomført styremøte. Protokollen publiseres under Om NDF når den er godkjent."],
      source: "https://norgesdartsforbund.no/News/150/Styrem%C3%B8te-gjennomf%C3%B8rt.aspx" },
    { id: 149, date: "2026-10-20", title: "Norges Dartsforbund søker leverandør av ny nettsideløsning", tag: "Forbundet",
      summary: "NDF ser etter en leverandør som kan levere en ny nettside.",
      body: ["Norges Dartsforbund ønsker en ny nettsideløsning og søker leverandør."],
      source: "https://norgesdartsforbund.no/News/149/Norges-Dartsforbund-s%C3%B8ker-leverand%C3%B8r-av-ny-nettsidel%C3%B8sning.aspx" },
    { id: 147, date: "2026-10-06", title: "Påminnelse om ekstraordinært forbundsting", tag: "Forbundsting",
      summary: "Påminnelse til klubbene om det ekstraordinære forbundstinget.",
      body: ["Dette er en påminnelse om det ekstraordinære forbundstinget. Sakspapirer og påmelding finner du i den opprinnelige saken."],
      source: "https://norgesdartsforbund.no/News/147/P%C3%A5minnelse-om-ekstraordin%C3%A6rt-forbundsting.aspx" },
    { id: 146, date: "2026-09-26", title: "NDFs Facebook-side", tag: "Forbundet",
      summary: "NDF har en egen Facebook-side for nyheter og oppdateringer.",
      body: ["Følg Norges Dartsforbund på Facebook for løpende oppdateringer fra mesterskap og forbundet."],
      source: "https://norgesdartsforbund.no/News/146/NDFs-Facebook-side-.aspx" },
    { id: 143, date: "2026-06-11", title: "Overnatting i forbindelse med NWM, Norsk Cricket og NM Kretslag", tag: "Mesterskap",
      summary: "Informasjon om overnatting for spillere og lag.",
      body: ["Her finner du informasjon om overnatting i forbindelse med NWM, Norsk Cricket og NM Kretslag."],
      source: "https://norgesdartsforbund.no/News/143/Overnatting-i-forbindelse-med-NWM,-Norsk-Cricket-og-NM-Kretslag.aspx" },
    { id: 142, date: "2026-04-08", title: "Nordic Cup og Nordic Cup Open", tag: "Internasjonalt",
      summary: "Informasjon om Nordic Cup og Nordic Cup Open.",
      body: ["Informasjon om Nordic Cup og den åpne turneringen Nordic Cup Open."],
      source: "https://norgesdartsforbund.no/News/142/Nordic-Cup-og-Nordic-Cup-Open.aspx" },
    { id: 141, date: "2026-03-18", title: "NM Singel dame og åpen klasse", tag: "Mesterskap",
      summary: "Informasjon om NM Singel i dameklassen og åpen klasse.",
      body: ["Informasjon om NM Singel for damer og i åpen klasse."],
      source: "https://norgesdartsforbund.no/News/141/NM-Singel-dame-og-%C3%A5pen-klasse.aspx" }
  ],

  /* DEMO: terminliste 2027 */
  events: [
    { id: "e1", name: "Vinterturneringen", start: "2027-01-16", end: "2027-01-16", place: "Hamar", level: "krets", org: "Innlandet Dartkrets", deadline: "2027-01-09" },
    { id: "e2", name: "NDF Ranking 1", start: "2027-02-06", end: "2027-02-07", place: "Oslo", level: "nasjonal", org: "NDF", deadline: "2027-01-27", ranking: true },
    { id: "e3", name: "Vestlandsmesterskapet", start: "2027-02-20", end: "2027-02-20", place: "Bergen", level: "krets", org: "Vestland Dartkrets", deadline: "2027-02-13" },
    { id: "e4", name: "NDF Ranking 2", start: "2027-03-13", end: "2027-03-14", place: "Trondheim", level: "nasjonal", org: "NDF", deadline: "2027-03-03", ranking: true },
    { id: "e5", name: "NM Singel, dame og åpen klasse", start: "2027-04-17", end: "2027-04-18", place: "Sandefjord", level: "nasjonal", org: "NDF", deadline: "2027-04-02", championship: true },
    { id: "e6", name: "Nordic Cup og Nordic Cup Open", start: "2027-05-14", end: "2027-05-16", place: "Danmark", level: "internasjonal", org: "Nordic Darts Federation", deadline: "2027-04-15" },
    { id: "e7", name: "Nordlandsåpen", start: "2027-06-05", end: "2027-06-05", place: "Bodø", level: "krets", org: "Nordland Dartkrets", deadline: "2027-05-29" },
    { id: "e8", name: "NDF Ranking 3", start: "2027-08-21", end: "2027-08-22", place: "Kristiansand", level: "nasjonal", org: "NDF", deadline: "2027-08-11", ranking: true },
    { id: "e9", name: "NM Kretslag og Norsk Cricket", start: "2027-09-24", end: "2027-09-26", place: "Ålesund", level: "nasjonal", org: "NDF", deadline: "2027-09-01", championship: true },
    { id: "e10", name: "WDF Europa-turnering", start: "2027-10-08", end: "2027-10-10", place: "Utlandet", level: "internasjonal", org: "WDF", deadline: "2027-09-10" },
    { id: "e11", name: "NM Klubblag og damelag", start: "2027-11-06", end: "2027-11-07", place: "Lillestrøm", level: "nasjonal", org: "NDF", deadline: "2027-10-20", championship: true },
    { id: "e12", name: "Julecupen", start: "2027-12-04", end: "2027-12-04", place: "Tromsø", level: "krets", org: "Troms og Finnmark Dartkrets", deadline: "2027-11-27" }
  ],

  /* DEMO: rangering, invented names */
  ranking: {
    herrer: [
      ["Henrik Solberg", "Fjordbyen DK", 412, 6, 0], ["Martin Aasen", "Nordlys Darts", 388, 6, 2], ["Erik Thorsen", "Bryggen DC", 361, 5, -1],
      ["Jonas Myhre", "Kystens Dartklubb", 340, 6, 1], ["Stian Lunde", "Fjordbyen DK", 322, 5, -2], ["Ole Kristian Berg", "Midtnorsk DK", 298, 4, 3],
      ["Anders Vik", "Sørlandet Darts", 276, 5, 0], ["Thomas Eide", "Bryggen DC", 260, 4, -1], ["Kim Rønning", "Trippel 20 DK", 241, 4, 4],
      ["Mats Haugland", "Elvebyen DC", 233, 5, -2], ["Pål Dahle", "Kystens Dartklubb", 219, 3, 0], ["Sindre Fossum", "Vidda Darts", 204, 4, 1]
    ],
    damer: [
      ["Ingrid Hovland", "Nordlys Darts", 398, 6, 0], ["Camilla Strand", "Fjordbyen DK", 371, 6, 1], ["Marte Bakken", "Midtnorsk DK", 349, 5, -1],
      ["Silje Nygård", "Bryggen DC", 318, 5, 2], ["Hanne Moe", "Elvebyen DC", 290, 4, 0], ["Lene Aune", "Sørlandet Darts", 266, 5, -2],
      ["Kari Sandvik", "Trippel 20 DK", 241, 4, 1], ["Tone Lie", "Vidda Darts", 222, 3, -1]
    ],
    junior: [
      ["Emil Brekke", "Fjordbyen DK", 210, 4, 1], ["Sara Holm", "Nordlys Darts", 198, 4, -1], ["Noah Engen", "Bryggen DC", 176, 3, 0],
      ["Ida Fjeld", "Midtnorsk DK", 160, 3, 2], ["Jakob Ruud", "Kystens Dartklubb", 142, 3, 0], ["Maja Tangen", "Elvebyen DC", 121, 2, -1]
    ]
  },

  /* DEMO: results */
  results: [
    { id: "r1", name: "NM Singel 2026, åpen klasse", date: "2026-04-19", place: "Eksempelby",
      podium: [["Henrik Solberg", "Fjordbyen DK"], ["Martin Aasen", "Nordlys Darts"], ["Erik Thorsen", "Bryggen DC"]],
      bracket: {
        "Kvartfinale": [["Henrik Solberg", 5, "Kim Rønning", 2], ["Jonas Myhre", 3, "Erik Thorsen", 5], ["Martin Aasen", 5, "Anders Vik", 4], ["Stian Lunde", 5, "Ole Kristian Berg", 1]],
        "Semifinale": [["Henrik Solberg", 6, "Erik Thorsen", 4], ["Martin Aasen", 6, "Stian Lunde", 5]],
        "Finale": [["Henrik Solberg", 7, "Martin Aasen", 5]]
      } },
    { id: "r2", name: "NM Singel 2026, dameklassen", date: "2026-04-19", place: "Eksempelby",
      podium: [["Ingrid Hovland", "Nordlys Darts"], ["Camilla Strand", "Fjordbyen DK"], ["Marte Bakken", "Midtnorsk DK"]],
      bracket: {
        "Kvartfinale": [["Ingrid Hovland", 5, "Tone Lie", 1], ["Silje Nygård", 4, "Marte Bakken", 5], ["Camilla Strand", 5, "Lene Aune", 3], ["Hanne Moe", 5, "Kari Sandvik", 4]],
        "Semifinale": [["Ingrid Hovland", 6, "Marte Bakken", 3], ["Camilla Strand", 6, "Hanne Moe", 4]],
        "Finale": [["Ingrid Hovland", 7, "Camilla Strand", 6]]
      } }
  ],

  /* DEMO: clubs, invented */
  kretser: ["Oslo og Akershus", "Innlandet", "Vestfold og Telemark", "Agder", "Rogaland", "Vestland", "Møre og Romsdal", "Trøndelag", "Nordland", "Troms og Finnmark"],
  clubs: [
    { name: "Fjordbyen DK", place: "Oslo", krets: "Oslo og Akershus", nights: "Tirsdag og torsdag", newcomers: true, juniors: true },
    { name: "Elvebyen DC", place: "Lillestrøm", krets: "Oslo og Akershus", nights: "Onsdag", newcomers: true, juniors: false },
    { name: "Vidda Darts", place: "Hamar", krets: "Innlandet", nights: "Mandag", newcomers: true, juniors: true },
    { name: "Trippel 20 DK", place: "Tønsberg", krets: "Vestfold og Telemark", nights: "Tirsdag", newcomers: true, juniors: false },
    { name: "Sørlandet Darts", place: "Kristiansand", krets: "Agder", nights: "Torsdag", newcomers: true, juniors: true },
    { name: "Kystens Dartklubb", place: "Stavanger", krets: "Rogaland", nights: "Onsdag og søndag", newcomers: false, juniors: false },
    { name: "Bryggen DC", place: "Bergen", krets: "Vestland", nights: "Tirsdag", newcomers: true, juniors: true },
    { name: "Fjellheimen DK", place: "Ålesund", krets: "Møre og Romsdal", nights: "Torsdag", newcomers: true, juniors: false },
    { name: "Midtnorsk DK", place: "Trondheim", krets: "Trøndelag", nights: "Mandag og onsdag", newcomers: true, juniors: true },
    { name: "Saltstraumen Darts", place: "Bodø", krets: "Nordland", nights: "Onsdag", newcomers: true, juniors: false },
    { name: "Nordlys Darts", place: "Tromsø", krets: "Troms og Finnmark", nights: "Tirsdag og fredag", newcomers: true, juniors: true },
    { name: "Polarbyen DC", place: "Alta", krets: "Troms og Finnmark", nights: "Torsdag", newcomers: false, juniors: false }
  ],

  /* REAL: from Organization.aspx, Nov 2026 */
  board: [
    ["President", "Mona-Lisa Brodin", "DK 1500", "president@darts.no"],
    ["Visepresident", "Kjetil Aa. Eikesdal", "Sunnmøre Dartklubb", "kjetil@darts.no"],
    ["Sekretær", "Morten Ingdahl", "Sørøya Dartklubb", "morteni@online.no"],
    ["Kasserer", "Hege Laberg", "Point Blank DC", "hlaberg69@gmail.com"],
    ["Styremedlem", "Rune Engrønningen", "Sandefjord Dartklubb", "rune@darts.no"],
    ["1. varamedlem", "Jan Erik Laberg", "Point Blank DC", "janerik@darts.no"]
  ],

  /* REAL: 2026 fees from MemberShip.aspx */
  fees: [
    ["Senior", 800], ["Senior, nytt medlem eller ikke betalt de siste 3 årene", 400], ["Støttemedlem", 400],
    ["Junior", 200], ["Passivt medlem", 200], ["Klubb", 2400], ["Ny klubb, første år", 1200]
  ],

  sponsors: [
    ["Strawberry", "https://www.strawberry.no/"], ["Dartbutikk", "https://dartbutikk.no/"],
    ["Dartsupply", "http://www.dartsupply.no"], ["Superdarts", "https://superdarts.no/"]
  ]
};
