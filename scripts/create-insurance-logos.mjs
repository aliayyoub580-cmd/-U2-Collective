import fs from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'public', 'logos', 'insurance')
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const LOGOS = {
  'medicare.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <path d="M20 38 C 20 20, 35 15, 50 25 C 65 35, 80 20, 80 12" fill="none" stroke="#003366" stroke-width="5" stroke-linecap="round"/>
    <path d="M20 44 C 35 30, 50 35, 65 42" fill="none" stroke="#CC0000" stroke-width="4" stroke-linecap="round"/>
    <text x="88" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#003366">Medicare</text>
  </svg>`,

  'medicaid.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <rect x="15" y="15" width="30" height="30" rx="6" fill="#005596"/>
    <path d="M30 21v18M21 30h18" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    <text x="54" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#005596">Medicaid</text>
  </svg>`,

  'tricare.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <polygon points="25,12 32,32 52,32 36,44 42,64 25,50 8,64 14,44 -2,32 18,32" transform="scale(0.5) translate(20, 5)" fill="#002B49"/>
    <text x="50" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="21" fill="#002B49" letter-spacing="1">TRICARE</text>
  </svg>`,

  'bcbs.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <path d="M15 15h12v12H15zM27 27h12v12H27z" fill="#005A9C"/>
    <path d="M27 15h12v12H27zM15 27h12v12H15z" fill="#005A9C"/>
    <path d="M50 12 L62 17 L62 35 C62 42 50 48 50 48 C50 48 38 42 38 35 L38 17 Z" fill="#005A9C"/>
    <text x="70" y="37" font-family="Arial, sans-serif" font-weight="800" font-size="18" fill="#005A9C">BlueCross BlueShield</text>
  </svg>`,

  'uhc.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <path d="M15 15v22c0 6 5 10 11 10s11-4 11-10V15h-7v21c0 2-2 4-4 4s-4-2-4-4V15h-7z" fill="#1E398D"/>
    <path d="M42 15h7v13l9-13h9l-11 15 12 17h-9l-8-12-2 3v9h-7V15z" fill="#E86C00"/>
    <text x="75" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="#1E398D">UnitedHealthcare</text>
  </svg>`,

  'aetna.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
    <text x="20" y="42" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="34" fill="#D2092B" letter-spacing="-1">aetna</text>
  </svg>`,

  'cigna.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
    <circle cx="30" cy="30" r="14" fill="#E45B25"/>
    <path d="M30 16 C35 24, 25 36, 30 44" stroke="#FFFFFF" stroke-width="3" fill="none"/>
    <text x="54" y="40" font-family="Arial, sans-serif" font-weight="800" font-size="26" fill="#002D62">Cigna</text>
  </svg>`,

  'humana.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
    <text x="15" y="41" font-family="Arial, sans-serif" font-weight="800" font-size="28" fill="#4B772E" letter-spacing="-0.5">Humana.</text>
  </svg>`,

  'kaiser.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
    <circle cx="28" cy="24" r="7" fill="#006699"/>
    <circle cx="16" cy="36" r="5" fill="#006699"/>
    <circle cx="40" cy="36" r="5" fill="#006699"/>
    <text x="54" y="32" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#006699">KAISER PERMANENTE</text>
  </svg>`,

  'centene.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <circle cx="28" cy="30" r="14" fill="#008080"/>
    <path d="M22 30 A 6 6 0 0 1 34 30" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    <text x="50" y="39" font-family="Arial, sans-serif" font-weight="800" font-size="22" fill="#004D4D">CENTENE</text>
  </svg>`,

  'molina.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <path d="M20 20 C20 12, 32 12, 32 22 C32 12, 44 12, 44 22 C44 32, 32 40, 32 40 C32 40, 20 32, 20 22 Z" fill="#005B94"/>
    <text x="52" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="18" fill="#005B94">MOLINA</text>
  </svg>`,

  'wellcare.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <polygon points="25,14 29,24 39,24 31,30 34,40 25,34 16,40 19,30 11,24 21,24" fill="#007749"/>
    <text x="46" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#007749">Wellcare</text>
  </svg>`,

  'anthem.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <text x="15" y="41" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#005596">Anthem.</text>
  </svg>`,

  'florida-blue.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <path d="M18 15 L32 20 L32 38 C32 44 18 50 18 50 C18 50 4 44 4 38 L4 20 Z" fill="#005A9C"/>
    <text x="40" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#005A9C">Florida Blue</text>
  </svg>`,

  'horizon-bcbs.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
    <path d="M15 15 L30 20 L30 38 C30 44 15 50 15 50 C15 50 0 44 0 38 L0 20 Z" fill="#0066B2"/>
    <text x="36" y="37" font-family="Arial, sans-serif" font-weight="800" font-size="17" fill="#0066B2">Horizon BCBS</text>
  </svg>`,

  'caresource.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <path d="M25 15 C15 15, 10 25, 25 42 C40 25, 35 15, 25 15 Z" fill="#2E7D32"/>
    <text x="44" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="19" fill="#2E7D32">CareSource</text>
  </svg>`,

  'oscar.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
    <text x="15" y="42" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#FF5A5F">oscar</text>
  </svg>`,

  'multiplan.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <path d="M15 20 Q 30 10, 45 20 T 75 20" stroke="#004B87" stroke-width="5" fill="none"/>
    <text x="20" y="44" font-family="Arial, sans-serif" font-weight="800" font-size="18" fill="#004B87">MultiPlan</text>
  </svg>`,

  'optum.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
    <text x="15" y="41" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#E35205">OPTUM</text>
  </svg>`,

  'evicore.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <text x="15" y="39" font-family="Arial, sans-serif" font-weight="800" font-size="22" fill="#00A3E0">eviCore</text>
    <text x="100" y="39" font-family="Arial, sans-serif" font-weight="400" font-size="12" fill="#555">healthcare</text>
  </svg>`,

  'travelers.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
    <path d="M15 35 A15 15 0 0 1 45 35 Z" fill="#D32F2F"/>
    <rect x="29" y="35" width="2" height="12" fill="#D32F2F"/>
    <text x="52" y="40" font-family="Arial, sans-serif" font-weight="900" font-size="18" fill="#D32F2F">TRAVELERS</text>
  </svg>`,

  'liberty-mutual.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
    <rect x="15" y="15" width="24" height="30" fill="#FFC72C"/>
    <text x="46" y="37" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#002D62">Liberty Mutual.</text>
  </svg>`,

  'state-farm.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
    <ellipse cx="22" cy="30" rx="10" ry="14" fill="#D32F2F"/>
    <ellipse cx="36" cy="22" rx="8" ry="10" fill="#D32F2F"/>
    <ellipse cx="36" cy="38" rx="8" ry="10" fill="#D32F2F"/>
    <text x="50" y="37" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#D32F2F">State Farm</text>
  </svg>`,

  'progressive.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60">
    <text x="15" y="40" font-family="Arial, sans-serif" font-weight="900" font-style="italic" font-size="22" fill="#005A9C">PROGRESSIVE</text>
  </svg>`,
}

for (const [filename, svg] of Object.entries(LOGOS)) {
  fs.writeFileSync(path.join(dir, filename), svg)
}
console.log('Created 24 insurance logos successfully.')
