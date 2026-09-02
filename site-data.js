/*
  ================================================================
  EDIT THIS FILE FIRST.
  Most text shown on the website is controlled here.
  Empty links and sections are automatically hidden.
  ================================================================
*/

window.SITE_DATA = {
  site: {
    name: "Seong Youn Kim",
    shortName: "SYK",
    pageTitle: "Seong Youn Kim | Mathematics",
    description:
      "Research website of Seong Youn Kim — character varieties, skein algebras, mapping class groups, and moduli spaces.",
    accentWord: "Mathematics",
    lastUpdated: "September 2026"
  },

  profile: {
    // TODO: Replace the two lines below.
    position: "[Position]",
    affiliation: "[Department], [Institution]",
    location: "Republic of Korea",

    // Leave photo empty to use the monogram portrait.
    // Example: photo: "assets/profile.jpg"
    photo: "",
    photoAlt: "Portrait of Seong Youn Kim",

    headline:
      "I study geometric structures arising from surfaces through character varieties, skein algebras, and mapping class groups.",

    bio: [
      "My research lies at the intersection of geometric topology, algebraic geometry, and representation theory. I am interested in moduli spaces attached to surfaces, especially character varieties and skein algebras, together with their symmetries, compactifications, and combinatorial structures.",
      "Current themes include toric and log Calabi–Yau compactifications, geometric P=W phenomena, mapping class group rigidity, and the use of webs, train tracks, and filtrations to study moduli of local systems."
    ],

    // TODO: Replace with your actual public email.
    email: "your.email@institution.edu"
  },

  links: [
    {
      label: "Email",
      // This automatically uses profile.email above.
      url: "email",
      icon: "mail",
      primary: true
    },
    {
      label: "CV",
      // Put your CV at assets/cv.pdf and set enabled to true.
      url: "assets/cv.pdf",
      icon: "file",
      enabled: false
    },
    {
      label: "arXiv",
      url: "https://arxiv.org/search/?query=Seong+Youn+Kim&searchtype=author",
      icon: "external"
    },
    {
      label: "Google Scholar",
      // TODO: Add your Google Scholar profile URL.
      url: "",
      icon: "external",
      enabled: false
    },
    {
      label: "ORCID",
      // TODO: Add your ORCID profile URL.
      url: "",
      icon: "external",
      enabled: false
    },
    {
      label: "GitHub",
      // TODO: Add your GitHub profile URL.
      url: "",
      icon: "external",
      enabled: false
    }
  ],

  researchThemes: [
    {
      number: "01",
      title: "Character varieties",
      text:
        "Algebraic and geometric structures on moduli spaces of surface-group representations, with an emphasis on relative character varieties."
    },
    {
      number: "02",
      title: "Skein algebras",
      text:
        "Classical and quantum skein-theoretic models for character varieties, including filtrations arising from traces, webs, and ideal triangulations."
    },
    {
      number: "03",
      title: "Compactification & P=W",
      text:
        "Toric and log Calabi–Yau compactifications of moduli spaces and their relation to geometric P=W phenomena."
    },
    {
      number: "04",
      title: "Mapping class groups",
      text:
        "Rigidity and reconstruction of mapping class groups from algebraic automorphisms of character varieties and related moduli spaces."
    }
  ],

  news: {
    show: true,
    items: [
      {
        date: "2026-08-31",
        text:
          "New preprint: Compactification of SL(3, ℂ)-Character Varieties of Surfaces via Skein Algebras.",
        url: "https://arxiv.org/abs/2608.30217"
      },
      {
        date: "2026-07-21",
        text: "Revised version of Algebraic Mapping Class Group Rigidity posted on arXiv.",
        url: "https://arxiv.org/abs/2508.09421"
      }
    ]
  },

  publications: [
    {
      year: "2026",
      type: "Preprint",
      featured: true,
      title:
        "Compactification of SL(3, ℂ)-Character Varieties of Surfaces via Skein Algebras",
      authors: "Seong Youn Kim",
      venue:
        "arXiv:2608.30217 · Algebraic Geometry, Combinatorics, Geometric Topology",
      summary:
        "Studies filtrations of skein algebras induced by the quantum trace map, constructs log Calabi–Yau compactifications of relative SL(3, ℂ)-character varieties of punctured surfaces, and establishes a weak geometric P=W statement.",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2608.30217" },
        { label: "PDF", url: "https://arxiv.org/pdf/2608.30217" }
      ],
      bibtex: `@misc{kim2026compactification,
  title         = {Compactification of {SL}(3, C)-Character Varieties of Surfaces via Skein Algebras},
  author        = {Kim, Seong Youn},
  year          = {2026},
  eprint        = {2608.30217},
  archivePrefix = {arXiv},
  primaryClass  = {math.AG}
}`
    },
    {
      year: "2025",
      type: "Preprint · revised 2026",
      featured: false,
      title: "Algebraic Mapping Class Group Rigidity",
      authors: "Seong Youn Kim",
      venue: "arXiv:2508.09421 · Geometric Topology",
      summary:
        "Shows that the relative automorphism group of an SL(2)-character variety of a punctured surface is a finite extension of the mapping class group, and gives a moduli-theoretic description in exceptional cases.",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2508.09421" },
        { label: "PDF", url: "https://arxiv.org/pdf/2508.09421" }
      ],
      bibtex: `@misc{kim2025algebraic,
  title         = {Algebraic Mapping Class Group Rigidity},
  author        = {Kim, Seong Youn},
  year          = {2025},
  eprint        = {2508.09421},
  archivePrefix = {arXiv},
  primaryClass  = {math.GT}
}`
    }
  ],

  talks: {
    // Change show to true after adding talks.
    show: false,
    items: [
      {
        date: "2026-00-00",
        title: "[Talk title]",
        event: "[Conference or seminar]",
        location: "[Institution / City]",
        links: []
      }
    ]
  },

  teaching: {
    // Change show to true after adding courses.
    show: false,
    items: [
      {
        term: "Fall 2026",
        course: "[Course title]",
        institution: "[Institution]",
        role: "[Instructor / Teaching Assistant]",
        url: ""
      }
    ]
  },

  footer: {
    note:
      "Research in geometric topology, algebraic geometry, and representation theory."
  }
};
