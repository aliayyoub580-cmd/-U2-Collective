interface SpecialtyIconProps {
  name: string
  className?: string
}

export default function SpecialtyIcon({ name, className = 'w-14 h-14' }: SpecialtyIconProps) {
  // Exact MedCare MSO brand colors: Primary Navy/Blue #005A9C & Accent Green #7BDCB5 / #1BA098
  const blue = '#005A9C'
  const green = '#1BA098'

  const n = name.toLowerCase().trim()

  // 1. Ambulatory Surgery (Dome light with cross & rays)
  if (n.includes('ambulatory')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 44V30C20 23.3726 25.3726 18 32 18C38.6274 18 44 23.3726 44 30V44H20Z" stroke={blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 44H48" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M32 26V36M27 31H37" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <path d="M22 14L24 18M32 10V14M42 14L40 18" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }

  // 2. Neurosurgery (Brain with green syringe)
  if (n.includes('neuro')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 14C22 14 16 21 16 30C16 40 23 48 30 50" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M32 14C42 14 48 21 48 30C48 40 41 48 34 50" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M24 24C27 28 26 35 22 38M40 24C37 28 38 35 42 38" stroke={blue} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 12L34 26" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <path d="M44 10L48 14" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <circle cx="33" cy="28" r="2" fill={green} />
      </svg>
    )
  }

  // 3. Thoracic Surgery (Lungs with green scalpel & stitches)
  if (n.includes('thoracic')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 14V34M34 14V34" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <path d="M30 18C20 18 14 26 14 38C14 46 22 50 30 48" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M34 18C44 18 50 26 50 38C50 46 42 50 34 48" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M40 24L48 16" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <path d="M38 32H44M38 38H44" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }

  // 4. Pathology (Microscope with green dots)
  if (n.includes('pathology') || n.includes('lab')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 14H36M31 14V22" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <rect x="25" y="22" width="12" height="16" rx="3" stroke={blue} strokeWidth="3" fill="none" />
        <path d="M20 42H42" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M18 50H44V44C44 42.8954 43.1046 42 42 42H20C18.8954 42 18 42.8954 18 44V50Z" stroke={blue} strokeWidth="3" />
        <path d="M38 26C42 26 46 30 44 36" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="22" r="2" fill={green} />
        <circle cx="48" cy="28" r="1.5" fill={green} />
        <circle cx="20" cy="26" r="2" fill={green} />
      </svg>
    )
  }

  // 5. Dermatology (Hand with green skin rash dots)
  if (n.includes('dermatology') || n.includes('skin')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 38C20 32 30 30 42 32C48 33 52 38 48 46C44 52 32 50 22 46C15 43 12 40 14 38Z" stroke={blue} strokeWidth="3" strokeLinejoin="round" />
        <path d="M42 32L50 22M46 36L54 28M38 34L48 42" stroke={blue} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="36" r="2" fill={green} />
        <circle cx="28" cy="34" r="2.5" fill={green} />
        <circle cx="34" cy="38" r="2" fill={green} />
        <circle cx="38" cy="34" r="1.5" fill={green} />
      </svg>
    )
  }

  // 6. Oncology (Awareness ribbon with green cross badge)
  if (n.includes('oncology') || n.includes('cancer')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 14C26 14 36 26 36 38C36 44 31 48 26 48C21 48 16 44 16 38C16 30 26 14 26 14Z" stroke={blue} strokeWidth="3" strokeLinejoin="round" />
        <path d="M20 44L12 52M32 44L40 52" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="28" r="9" stroke={green} strokeWidth="3" fill="white" />
        <path d="M44 23V33M39 28H49" stroke={green} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 7. Gastroenterology (Stomach with green fluid wave)
  if (n.includes('gastro')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 14V22C26 32 16 36 16 44C16 50 24 52 32 52C40 52 48 50 48 44C48 36 38 32 38 22V14" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M20 38C26 35 38 35 44 38" stroke={green} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 8. Radiology (Green frame with blue ribcage bones)
  if (n.includes('radiology') || n.includes('x-ray') || n.includes('mri')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="36" height="36" rx="8" stroke={green} strokeWidth="3" fill="none" />
        <path d="M32 18V46" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M24 24C28 27 36 27 40 24M22 32C28 36 36 36 42 32M24 40C28 43 36 43 40 40" stroke={blue} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 9. Ob Gyn (Blue oval with green dashed circular aura)
  if (n.includes('ob') || n.includes('gyn') || n.includes('women')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="28" r="12" stroke={blue} strokeWidth="3" fill="none" />
        <path d="M32 40V52M26 46H38" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="28" r="18" stroke={green} strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
      </svg>
    )
  }

  // 10. DME (Blue wheelchair with green wheels)
  if (n.includes('dme') || n.includes('equipment') || n.includes('wheelchair')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="46" r="7" stroke={green} strokeWidth="3" fill="none" />
        <circle cx="46" cy="48" r="4" fill={green} />
        <path d="M24 39V22H38L44 42H24" stroke={blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22H24" stroke={blue} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 11. Orthopedic (Blue knee bones with green joint dot)
  if (n.includes('ortho')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14C22 10 26 8 30 10L40 15C44 17 46 21 44 25L36 41C34 45 30 47 26 45L16 40C12 38 10 34 12 30L22 14Z" stroke={blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="24" r="3" fill={green} />
        <path d="M40 30L50 48" stroke={blue} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  // 12. Urgent Care (Blue stethoscope with green heart)
  if (n.includes('urgent') || n.includes('emergency')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 16V28C20 34.6274 25.3726 40 32 40C38.6274 40 44 34.6274 44 28V16" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="16" r="3" fill={green} />
        <circle cx="44" cy="16" r="3" fill={green} />
        <path d="M32 40V46C32 49.3137 34.6863 52 38 52C41.3137 52 44 49.3137 44 46" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M32 24C30 22 26 22 25 25C24 28 32 33 32 33C32 33 40 28 39 25C38 22 34 22 32 24Z" fill={green} />
      </svg>
    )
  }

  // 13. General Surgery (Blue scalpel with green incision dashed line)
  if (n.includes('surgery') || n.includes('surgical')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 44L42 16C44 14 48 14 50 16C52 18 52 22 50 24L26 52L14 54L18 44Z" stroke={blue} strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 36L32 44" stroke={blue} strokeWidth="3" strokeLinecap="round" />
        <path d="M12 22H32" stroke={green} strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
      </svg>
    )
  }

  // 14. Cardiology (Heart with ECG pulse line)
  if (n.includes('cardio') || n.includes('heart')) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 50L16 34C10 28 12 18 22 18C28 18 31 22 32 24C33 22 36 18 42 18C52 18 54 28 48 34L32 50Z" stroke={blue} strokeWidth="3" strokeLinejoin="round" />
        <path d="M16 34H24L27 27L31 41L35 31L38 34H48" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // Default fallback (Dual-tone medical cross badge matching MedCare MSO)
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="32" height="32" rx="8" stroke={blue} strokeWidth="3" fill="none" />
      <path d="M32 22V42M22 32H42" stroke={green} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}
