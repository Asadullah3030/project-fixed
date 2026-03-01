export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  discountPrice: string;
  originalPrice: string;
  detail: string;
  features: string[];
  images: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  products: Product[];
}

export const dcBreakers: ProductCategory = {
  id: "dc-breakers",
  name: "DC Breakers",
  slug: "dc-breaker",
  image: "https://ik.imagekit.io/dawoodtraders/Dc-32-Breaker.png?updatedAt=1759056896234",
  products: [
    {
      id: "32A",
      title: "Tomzn DC Breaker 32A (2 Pole) – Compact & Reliable Solar Protection Switch",
      shortTitle: "Solar / Breaker 32-A | 2 Pole",
      discountPrice: "1199",
      originalPrice: "1600",
      detail: "The Tomzn DC Breaker (32A, 2 Pole) is a compact and durable breaker designed for small to medium solar systems. It ensures safe operation by providing protection against overloads and short circuits, delivering stable performance for long-term use.",
      features: [
        "Model: TOB7Z-32",
        "Rated Current: 32A",
        "Number of Poles: 2P (Double Pole)",
        "Voltage Rating: DC 500V – 800V",
        "Certified Quality: ISO 9001, ISO 14001, ISO 45001 approved",
        "Reliable Protection: Safeguards against overload & short-circuit",
        "Durable & Safe: Compact design"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/2.jpg?updatedAt=1759058960860",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/1.jpg?updatedAt=1759058960910",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/3.jpg?updatedAt=1759058961401",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/4.jpg?updatedAt=1759058961121",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/5.jpg?updatedAt=1759058961241",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-32-Braker/6.jpg?updatedAt=1759058961405"
      ]
    },
    {
      id: "63A",
      title: "Tomzn DC Breaker 63A (2 Pole) – High Capacity Solar Protection Switch",
      shortTitle: "Solar / Breaker 63-A | 2 Pole",
      discountPrice: "1899",
      originalPrice: "2200",
      detail: "The Tomzn DC Breaker (63A, 2 Pole) is a high-performance breaker designed for solar systems and large electrical setups. It ensures safe and stable operation by protecting against overloads and short circuits.",
      features: [
        "Model: TOB7Z-63",
        "Rated Current: 63A",
        "Number of Poles: 2P (Double Pole)",
        "Voltage Rating: DC 1000V",
        "Certified Quality: ISO 9001, ISO 14001, ISO 45001 approved",
        "Durable & safe – ensures long-term stable performance",
        "Ideal for solar energy systems & high-voltage DC applications"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/10.jpg?updatedAt=1759059159942",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/11.jpg?updatedAt=1759059160732",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/7.jpg?updatedAt=1759059159776",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/9.jpg?updatedAt=1759059159304",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/8.jpg?updatedAt=1759059159909",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-63-Braker/12.jpg?updatedAt=1759059160301"
      ]
    },
    {
      id: "25A",
      title: "TOMZN-DC-MCB TOB7Z-63 (2 Pole, 25A, 1000V DC Miniature Circuit Breaker)",
      shortTitle: "Solar / Breaker 25-A | 2 Pole",
      discountPrice: "2200",
      originalPrice: "2500",
      detail: "TOMZN TOB7Z-63 is a high-quality DC miniature circuit breaker designed for solar PV systems and other DC applications. With a rated current of 25A, 2 poles, and up to 1000V DC capacity, it provides reliable protection against overcurrent and short circuits.",
      features: [
        "Brand: TOMZN",
        "Model: TOB7Z-63",
        "Rated Current: 25A",
        "Number of Poles: 2P (Double Pole)",
        "Rated Voltage: DC 1000V",
        "Standard Compliance: IEC/EN 60947",
        "Certifications: ISO 9001, ISO 14001, ISO 45001"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/2.jpg?updatedAt=1759059764794",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/1.jpg?updatedAt=1759059764918",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/3.jpg?updatedAt=1759059765318",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/4.jpg?updatedAt=1759059764908",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/5.jpg?updatedAt=1759059765509",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-25-Braker/6.jpg?updatedAt=1759059764906"
      ]
    },
    {
      id: "16A",
      title: "TOMZN DC-MCB TOB7Z-63 (2 Pole, 16A, 1000V DC Miniature Circuit Breaker)",
      shortTitle: "Solar / Breaker 16-A | 2 Pole",
      discountPrice: "999",
      originalPrice: "1400",
      detail: "TOMZN TOB7Z-63 is a reliable DC miniature circuit breaker built for solar PV systems and other DC power applications. With a rated current of 16A, 2 poles, and support for up to 1000V DC, it ensures strong protection against overloads and short circuits.",
      features: [
        "Brand: TOMZN",
        "Model: TOB7Z-63",
        "Rated Current: 16A",
        "Number of Poles: 2P (Double Pole)",
        "Type: DC Miniature Circuit Breaker (MCB)",
        "Rated Voltage: DC 1000V",
        "Standard Compliance: IEC/EN 60947-2",
        "Certifications: ISO 9001, ISO 14001, ISO 45001"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/1.jpg?updatedAt=1759059345992",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/2.jpg?updatedAt=1759059345972",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/3.jpg?updatedAt=1759059345964",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/4.jpg?updatedAt=1759059346105",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/5.jpg?updatedAt=1759059345961",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-16-Braker/6.jpg?updatedAt=1759059345984"
      ]
    },
    {
      id: "125A",
      title: "TOMZN DC-MCB TOB7Z-125 (2 Pole, 125A, 1000V DC Miniature Circuit Breaker)",
      shortTitle: "Solar / Breaker 125-A | 2 Pole",
      discountPrice: "3500",
      originalPrice: "5000",
      detail: "TOMZN TOB7Z-125 is a heavy-duty DC miniature circuit breaker designed for high-capacity solar PV systems and industrial DC applications. With 2 poles, a rated current of 125A, and support for up to 1000V DC, it offers reliable protection against overloads and short circuits.",
      features: [
        "Brand: TOMZN",
        "Model: TOB7Z-125",
        "Rated Current: 125A",
        "Number of Poles: 2P (Double Pole)",
        "Type: DC Miniature Circuit Breaker (MCB)",
        "Rated Voltage: DC 1000V",
        "Standard Compliance: IEC/EN 60947-2",
        "Certifications: ISO 9001, ISO 14001, ISO 45001"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/1.jpg?updatedAt=1759060112114",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/2.jpg?updatedAt=1759060112244",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/3.jpg?updatedAt=1759060112126",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/4.jpg?updatedAt=1759060112153",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/5.jpg?updatedAt=1759060112138",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Dc-125-Braker/6.jpg?updatedAt=1759060112218"
      ]
    }
  ]
};

export const acBreakers: ProductCategory = {
  id: "ac-breakers",
  name: "AC Breakers",
  slug: "ac-breaker",
  image: "https://ik.imagekit.io/dawoodtraders/Ac-32-Breaker.png?updatedAt=1759056896001",
  products: [
    {
      id: "32A",
      title: "Tomzn AC Breaker 32A (2 Pole) – Compact & Reliable Circuit Protection",
      shortTitle: "AC / Breaker 32-A | 2 Pole",
      discountPrice: "1399",
      originalPrice: "1900",
      detail: "The Tomzn AC Breaker (32A, 2 Pole) is designed for small to medium AC applications. It provides effective protection against overloads and short circuits, ensuring the safety and stability of your electrical system.",
      features: [
        "Model: TOB7-32 (AC)",
        "Rated Current: 32A",
        "Number of Poles: 2P (Double Pole)",
        "Voltage Rating: AC 230/400V",
        "Certified Quality: ISO 9001, ISO 14001, ISO 45001 approved",
        "Reliable Protection: Safeguards against overload & short-circuit",
        "Durable & Safe: Compact design"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/1.jpg?updatedAt=1759057262998",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/2.jpg?updatedAt=1759057262708",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/3.jpg?updatedAt=1759057262580",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/4.jpg?updatedAt=1759057262569",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/5.jpg?updatedAt=1759057262986",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-32-Braker/6.jpg?updatedAt=1759057262807"
      ]
    },
    {
      id: "63A",
      title: "Tomzn AC Breaker 63A (2 Pole) – High Capacity Circuit Protection Switch",
      shortTitle: "AC / Breaker 63-A | 2 Pole",
      discountPrice: "1999",
      originalPrice: "2500",
      detail: "The Tomzn AC Breaker (63A, 2 Pole) is a high-capacity breaker for large residential, commercial, and industrial AC systems. It ensures maximum safety by protecting against overloads and short circuits.",
      features: [
        "Model: TOB7-63 (AC)",
        "Rated Current: 63A",
        "Number of Poles: 2P (Double Pole)",
        "Voltage Rating: AC 230/400V",
        "Certified Quality: ISO 9001, ISO 14001, ISO 45001 approved",
        "Application: Suitable for high-power AC circuits",
        "Protection: Strong overload & short-circuit protection"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/1.jpg?updatedAt=1759058579501",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/2.jpg?updatedAt=1759058579647",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/3.jpg?updatedAt=1759058579708",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/4.jpg?updatedAt=1759058580120",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/5.jpg?updatedAt=1759058579459",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Ac-63-Braker/6.jpg?updatedAt=1759058579678"
      ]
    }
  ]
};

export const changeoverBreaker: ProductCategory = {
  id: "changeover",
  name: "Changeover Breaker",
  slug: "changeover-breaker",
  image: "https://ik.imagekit.io/dawoodtraders/Type-Change-Braker.png?updatedAt=1759056896344",
  products: [
    {
      id: "63A",
      title: "Tomzn AC Changeover Switch – 2 Pole, 63A, 230V, Generator & Main Supply Transfer Breaker",
      shortTitle: "Changeover Switch 63-A | 2 Pole",
      discountPrice: "1399",
      originalPrice: "1900",
      detail: "The Tomzn AC Changeover Switch (2 Pole, 63A) is a reliable solution for transferring power safely between two sources, such as Main Supply and Generator, Solar and Inverter, or Backup Systems.",
      features: [
        "Brand: Tomzn",
        "Type: AC Changeover Switch / Breaker",
        "Model: SE2196",
        "Poles: 2 Pole",
        "Rated Current: 63A",
        "Rated Voltage: 230V ~ 50Hz",
        "Function: Safe transfer between Main Supply, Generator, Solar or Inverter",
        "Protection: Overload & Short Circuit"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Type-Change-Braker/1.jpg?updatedAt=1759060303980",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Type-Change-Braker/2.jpg?updatedAt=1759060303794",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Type-Change-Braker/4.jpg?updatedAt=1759060303821",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Type-Change-Braker/3.jpg?updatedAt=1759060303967",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Type-Change-Braker/5.jpg?updatedAt=1759060303995"
      ]
    }
  ]
};

export const relayProtection: ProductCategory = {
  id: "relay-protection",
  name: "Relay Protection",
  slug: "relay-protection",
  image: "https://ik.imagekit.io/dawoodtraders/Relay-Protection.png?updatedAt=1759056896039",
  products: [
    {
      id: "Relay-One",
      title: "Digital Voltage Protection Relay with Dual Display (Over & Under Voltage Protector)",
      shortTitle: "Generic Digital Voltage Relay",
      discountPrice: "1350",
      originalPrice: "1750",
      detail: "This Digital Voltage Protection Relay is designed to safeguard electrical appliances and equipment from voltage fluctuations. Featuring a dual LED display, it provides real-time monitoring of input and output voltages.",
      features: [
        "Generic / Unbranded (Common Chinese model)",
        "Over & Under Voltage Protection",
        "Adjustable Settings: Safe operating voltage ranges",
        "Compact Design: DIN-rail mountable",
        "High Accuracy: Stable performance",
        "Wide Application: Home, office, industrial",
        "Quick Response Time"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/1.jpg?updatedAt=1759062216382",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/2.jpg?updatedAt=1759062216462",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/3.jpg?updatedAt=1759062216117",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/4.jpg?updatedAt=1759062216404",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/5.jpg?updatedAt=1759062216664",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-One/6.jpg?updatedAt=1759062216461"
      ]
    },
    {
      id: "Relay-Two",
      title: "OMAS AVP-63 Adjustable Voltage Protection Relay with Dual Display",
      shortTitle: "OMAS AVP-63",
      discountPrice: "1450",
      originalPrice: "1850",
      detail: "The OMAS AVP-63 Adjustable Voltage Protection Relay is a high-quality device designed to protect your electrical appliances from unstable power conditions.",
      features: [
        "Brand: OMAS (18 Months Guarantee)",
        "Model: AVP-63",
        "Dual LED Display",
        "Adjustable Settings",
        "Over & Under Voltage Protection",
        "Over-Current Protection",
        "DIN Rail Mountable"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/1.jpg?updatedAt=1759062361951",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/2.jpg?updatedAt=1759062361941",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/3.jpg?updatedAt=1759062362164",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/4.jpg?updatedAt=1759062361969",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/5.jpg?updatedAt=1759062362145",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Two/6.jpg?updatedAt=1759062362030"
      ]
    },
    {
      id: "Relay-Three",
      title: "NIN Electric NP2-VAKWH Digital Voltage Protection Relay (80A)",
      shortTitle: "NIN Electric NP2-VAKWH",
      discountPrice: "1650",
      originalPrice: "2150",
      detail: "The NIN Electric NP2-VAKWH is a high-performance digital voltage protection relay designed to safeguard electrical appliances from over-voltage, under-voltage, and power fluctuations.",
      features: [
        "Brand: NIN Electric",
        "Model: NP2-VAKWH",
        "Rated Current: 80A",
        "Over-Voltage Protection: AC 230V – 300V",
        "Under-Voltage Protection: AC 210V – 140V",
        "Adjustable Recovery Time: 1 – 600 seconds",
        "Energy Monitoring: 1 – 9999 kWh"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/1.jpg?updatedAt=1759062491103",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/2.jpg?updatedAt=1759062491172",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/3.jpg?updatedAt=1759062491525",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/4.jpg?updatedAt=1759062491340",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/5.jpg?updatedAt=1759062491181",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Three/6.jpg?updatedAt=1759062491527"
      ]
    },
    {
      id: "Relay-Four",
      title: "TOMZN TOB7Z-63 Digital Voltage & Current Protection Relay (63A, 2P, DC 1000V)",
      shortTitle: "TOMZN TOB7Z-63",
      discountPrice: "1750",
      originalPrice: "1950",
      detail: "The TOMZN TOB7Z-63 is a high-quality digital protection relay designed for advanced electrical safety with dual digital displays.",
      features: [
        "Brand: TOMZN",
        "Model: TOB7Z-63",
        "Rated Current: 63A",
        "Voltage Capacity: Up to DC 1000V",
        "Poles: 2P (Double Pole)",
        "Dual LED Display",
        "Adjustable Settings"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/1.jpg?updatedAt=1759062663727",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/2.jpg?updatedAt=1759062663977",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/3.jpg?updatedAt=1759062663727",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/4.jpg?updatedAt=1759062663693",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/5.jpg?updatedAt=1759062663714",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Four/6.jpg?updatedAt=1759062663872"
      ]
    },
    {
      id: "Relay-Five",
      title: "ENTES AVK-40A/63A Adjustable Voltage & Current Protection Relay",
      shortTitle: "ENTES AVK-40A/63A",
      discountPrice: "1250",
      originalPrice: "1650",
      detail: "The ENTES AVK-40A/63A is a premium adjustable protection relay designed to safeguard electrical systems from voltage fluctuations and overload conditions.",
      features: [
        "Brand: ENTES",
        "Model: AVK-40A/63A",
        "Rated Current: 40A or 63A",
        "Input Voltage Range: 100–420V AC",
        "Under-Voltage Protection: 120–210V",
        "Over-Voltage Protection: 230–300V",
        "Dual LED Display"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/1.jpg?updatedAt=1759062972287",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/2.jpg?updatedAt=1759062972282",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/3.jpg?updatedAt=1759062972649",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/4.jpg?updatedAt=1759062972293",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/5.jpg?updatedAt=1759062972466",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Relay-Protection-Five/6.jpg?updatedAt=1759062972448"
      ]
    }
  ]
};

export const distributionBox: ProductCategory = {
  id: "distribution-box",
  name: "Distribution Box",
  slug: "distribution-box",
  image: "https://ik.imagekit.io/dawoodtraders/DbBox.png?updatedAt=1759056896779",
  products: [
    {
      id: "dbBox-One",
      title: "Tense HT-8WAY Electrical Distribution Box (8 Way) – High Quality Waterproof DB Box",
      shortTitle: "Tense HT-8WAY",
      discountPrice: "1400",
      originalPrice: "2400",
      detail: "The Tense HT-8WAY Electrical Distribution Box is a premium quality enclosure designed for safe and organized installation of circuit breakers.",
      features: [
        "Brand: Tense",
        "Model: HT-8WAY",
        "Type: Electrical Distribution Box",
        "Capacity: 8 Way",
        "Material: Fire-resistant plastic",
        "Protection: Waterproof & Dustproof",
        "Design: Compact with clear door"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-One/1.jpg?updatedAt=1759060679436",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-One/2.jpg?updatedAt=1759060679106",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-One/3.jpg?updatedAt=1759060679416",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-One/4.jpg?updatedAt=1759060679131",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-One/5.jpg?updatedAt=1759060679130"
      ]
    },
    {
      id: "dbBox-Two",
      title: "7's Eight Way Multi Distribution Box – Heavy Duty PVC Power Control Unit",
      shortTitle: "7's Eight Way Multi",
      discountPrice: "1600",
      originalPrice: "2100",
      detail: "The 7's Eight Way Multi Distribution Box is a premium power distribution solution designed to provide safe and reliable electrical control.",
      features: [
        "Brand: 7's",
        "Type: Multi Electrical Distribution Box",
        "Capacity: 8 Way",
        "Material: High-grade PVC body",
        "Main Switch: Heavy-duty rotary isolator",
        "Display: Digital voltage meter",
        "Protection: Reliable housing for MCBs"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Two/1.jpg?updatedAt=1759060882273",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Two/2.jpg?updatedAt=1759060882249",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Two/3.jpg?updatedAt=1759060882099",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Two/4.jpg?updatedAt=1759060882576",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Two/5.jpg?updatedAt=1759060882575"
      ]
    },
    {
      id: "dbBox-Three",
      title: "SR Electric 8 Way Pure ABS Distribution Box – Metal Base with Smoke Glass Door",
      shortTitle: "SR Electric 8 Way Pure",
      discountPrice: "1550",
      originalPrice: "2200",
      detail: "The SR Electric 8 Way Distribution Box is a high-quality electrical enclosure with a pure ABS body and metal base.",
      features: [
        "Brand: SR Electric",
        "Model: 8 Way DP Box",
        "Material: Pure ABS body with metal base",
        "Front Cover: Smoke glass door",
        "Capacity: 8 Way",
        "Protection: Dust-resistant, flame-retardant",
        "Application: Homes, offices, shops"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Three/1.jpg?updatedAt=1759061008447",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Three/2.jpg?updatedAt=1759061008518",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Three/3.jpg?updatedAt=1759061008145",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Three/4.jpg?updatedAt=1759061008580",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Three/5.jpg?updatedAt=1759061008598"
      ]
    },
    {
      id: "dbBox-Four",
      title: "LG 1 to 8 Changeover Distribution Board – Durable Electrical Switch Box",
      shortTitle: "LG Changeover Distribution Board",
      discountPrice: "2350",
      originalPrice: "2800",
      detail: "The LG 1 to 8 Changeover Distribution Board is a high-quality and durable solution for managing power distribution.",
      features: [
        "Strong, durable & long-lasting quality",
        "1 to 8 Changeover switch options",
        "Material: Pure ABS body with metal base",
        "Ideal for home, office, and commercial use",
        "Easy installation & user-friendly",
        "Smooth switching between main supply and generator"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Four/1.jpg?updatedAt=1759061126177",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Four/2.jpg?updatedAt=1759061126296",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Four/3.jpg?updatedAt=1759061126308",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Four/4.jpg?updatedAt=1759061126202",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Four/5.jpg?updatedAt=1759061126317"
      ]
    },
    {
      id: "dbBox-Five",
      title: "FAST Changeover Distribution Box with Meter | 10-13 Way MCB Box",
      shortTitle: "FAST Changeover Distribution Box",
      discountPrice: "2250",
      originalPrice: "2700",
      detail: "The FAST Changeover Distribution Box Plus Meter is a reliable and durable electrical panel solution.",
      features: [
        "Supports 10-13 MCBs",
        "Single Phase Selector up to 32A",
        "Built-in Single Volt Meter",
        "Durable & strong body",
        "Suitable for homes, shops, industrial",
        "Easy installation"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Five/1.jpg?updatedAt=1759061226647",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Five/2.jpg?updatedAt=1759061226540",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Five/3.jpg?updatedAt=1759061226121",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Five/4.jpg?updatedAt=1759061226666",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Five/5.jpg?updatedAt=1759061227789"
      ]
    },
    {
      id: "dbBox-Six",
      title: "JM 8 Way Changeover Distribution Box | Heavy Duty Electric Panel with Voltmeter",
      shortTitle: "JM 8 Way Changeover",
      discountPrice: "2900",
      originalPrice: "3500",
      detail: "The JM 8 Way Changeover Distribution Box is built for efficient and safe power distribution.",
      features: [
        "Supports 8 MCBs",
        "Built-in Voltmeter",
        "Durable & strong body",
        "Suitable for homes, shops, commercial",
        "Easy installation",
        "Smooth changeover switching"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Six/1.jpg?updatedAt=1759061327047",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Six/2.jpg?updatedAt=1759061327300",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Six/3.jpg?updatedAt=1759061327351",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Six/4.jpg?updatedAt=1759061327547",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/DbBox-Six/5.jpg?updatedAt=1759061327049"
      ]
    }
  ]
};

export const electricalProducts: ProductCategory = {
  id: "electrical-products",
  name: "Electrical Products",
  slug: "electrical-products",
  image: "https://ik.imagekit.io/dawoodtraders/Electronic.png?updatedAt=1759056896781",
  products: [
    {
      id: "Pump",
      title: "CROWN Submersible Water Pump 25W – 1000 L/H Flow, 1.8m Lift (220V, 50Hz)",
      shortTitle: "CROWN Submersible Pump 25W",
      discountPrice: "1100",
      originalPrice: "1380",
      detail: "The CROWN Submersible Water Pump is a compact and efficient solution for water circulation, aquarium setups, fountains.",
      features: [
        "Brand: CROWN",
        "Type: Submersible Water Pump",
        "Power: 25W",
        "Voltage/Frequency: 220V / 50Hz",
        "Flow Rate: 1000 L/H",
        "Compact & Durable",
        "Energy Efficient"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Pump/1.jpg?updatedAt=1759061669165",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Pump/2.jpg?updatedAt=1759061669034",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Pump/3.jpg?updatedAt=1759061668449",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Pump/4.jpg?updatedAt=1759061669580",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Pump/5.jpg?updatedAt=1759061669117"
      ]
    },
    {
      id: "Supply",
      title: "EPSON Plus Power Supply Adapter – 12V 10A DC Output",
      shortTitle: "EPSON Plus Power Supply",
      discountPrice: "1299",
      originalPrice: "1899",
      detail: "The EPSON Plus Power Supply is a reliable and efficient adapter designed to provide stable 12V DC power.",
      features: [
        "Brand: EPSON Plus",
        "Type: Power Supply Adapter",
        "Input Voltage: AC 100–240V, 50/60Hz",
        "Output Voltage: 12V DC",
        "Output Current: 10A",
        "Safety Features: Over-voltage, over-current protection"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Supply/1.jpg?updatedAt=1759061776337",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Supply/2.jpg?updatedAt=1759061775720",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Supply/3.jpg?updatedAt=1759061775649",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Supply/4.jpg?updatedAt=1759061775871",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/Supply/5.jpg?updatedAt=1759061776483"
      ]
    },
    {
      id: "HeatGun",
      title: "Super Speed TX Slim Heat Gun / Gas Pressure Blower – High Performance Motor",
      shortTitle: "Super Speed TX Heat Gun",
      discountPrice: "1550",
      originalPrice: "2200",
      detail: "The Super Speed TX Slim Heat Gun is specially designed for gas pressure and heating applications.",
      features: [
        "Brand: Super Speed",
        "Model: TX Slim",
        "Durable Motor: Long-lasting",
        "Compact Design: Slim, space-saving",
        "Strong Air Pressure",
        "Plug & Play"
      ],
      images: [
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/HeatGun/1.jpg?updatedAt=1759061931698",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/HeatGun/2.jpg?updatedAt=1759061931841",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/HeatGun/3.jpg?updatedAt=1759061931682",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/HeatGun/4.jpg?updatedAt=1759061931381",
        "https://ik.imagekit.io/dawoodtraders/dawoodTrader/HeatGun/5.jpg?updatedAt=1759061931501"
      ]
    }
  ]
};

export const allCategories: ProductCategory[] = [
  dcBreakers,
  acBreakers,
  changeoverBreaker,
  relayProtection,
  distributionBox,
  electricalProducts
];

export const homeProducts = [
  { ...dcBreakers.products[0], category: dcBreakers },
  { ...changeoverBreaker.products[0], category: changeoverBreaker },
  { ...acBreakers.products[0], category: acBreakers },
  { ...relayProtection.products[0], category: relayProtection },
  { ...electricalProducts.products[0], category: electricalProducts },
  { ...distributionBox.products[0], category: distributionBox }
];
