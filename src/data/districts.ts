export interface District {
  id: string;
  name_en: string;
  name_bn: string;
  division: string;
}

export const DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Mymensingh',
  'Sylhet',
  'Barishal',
] as const;

export type Division = (typeof DIVISIONS)[number];

/**
 * All 64 districts of Bangladesh grouped by division.
 */
export const districts: District[] = [
  // ── Dhaka Division (13) ──────────────────────────────────────────────────
  { id: 'dhaka', name_en: 'Dhaka', name_bn: 'ঢাকা', division: 'Dhaka' },
  { id: 'faridpur', name_en: 'Faridpur', name_bn: 'ফরিদপুর', division: 'Dhaka' },
  { id: 'gazipur', name_en: 'Gazipur', name_bn: 'গাজীপুর', division: 'Dhaka' },
  { id: 'gopalganj', name_en: 'Gopalganj', name_bn: 'গোপালগঞ্জ', division: 'Dhaka' },
  { id: 'kishoreganj', name_en: 'Kishoreganj', name_bn: 'কিশোরগঞ্জ', division: 'Dhaka' },
  { id: 'madaripur', name_en: 'Madaripur', name_bn: 'মাদারীপুর', division: 'Dhaka' },
  { id: 'manikganj', name_en: 'Manikganj', name_bn: 'মানিকগঞ্জ', division: 'Dhaka' },
  { id: 'munshiganj', name_en: 'Munshiganj', name_bn: 'মুন্সীগঞ্জ', division: 'Dhaka' },
  { id: 'narayanganj', name_en: 'Narayanganj', name_bn: 'নারায়ণগঞ্জ', division: 'Dhaka' },
  { id: 'narsingdi', name_en: 'Narsingdi', name_bn: 'নরসিংদী', division: 'Dhaka' },
  { id: 'rajbari', name_en: 'Rajbari', name_bn: 'রাজবাড়ী', division: 'Dhaka' },
  { id: 'shariatpur', name_en: 'Shariatpur', name_bn: 'শরীয়তপুর', division: 'Dhaka' },
  { id: 'tangail', name_en: 'Tangail', name_bn: 'টাঙ্গাইল', division: 'Dhaka' },

  // ── Chattogram Division (11) ─────────────────────────────────────────────
  { id: 'bandarban', name_en: 'Bandarban', name_bn: 'বান্দরবান', division: 'Chattogram' },
  { id: 'brahmanbaria', name_en: 'Brahmanbaria', name_bn: 'ব্রাহ্মণবাড়িয়া', division: 'Chattogram' },
  { id: 'chandpur', name_en: 'Chandpur', name_bn: 'চাঁদপুর', division: 'Chattogram' },
  { id: 'chattogram', name_en: 'Chattogram', name_bn: 'চট্টগ্রাম', division: 'Chattogram' },
  { id: 'comilla', name_en: 'Comilla', name_bn: 'কুমিল্লা', division: 'Chattogram' },
  { id: 'coxs_bazar', name_en: "Cox's Bazar", name_bn: 'কক্সবাজার', division: 'Chattogram' },
  { id: 'feni', name_en: 'Feni', name_bn: 'ফেনী', division: 'Chattogram' },
  { id: 'khagrachhari', name_en: 'Khagrachhari', name_bn: 'খাগড়াছড়ি', division: 'Chattogram' },
  { id: 'lakshmipur', name_en: 'Lakshmipur', name_bn: 'লক্ষ্মীপুর', division: 'Chattogram' },
  { id: 'noakhali', name_en: 'Noakhali', name_bn: 'নোয়াখালী', division: 'Chattogram' },
  { id: 'rangamati', name_en: 'Rangamati', name_bn: 'রাঙামাটি', division: 'Chattogram' },

  // ── Khulna Division (10) ─────────────────────────────────────────────────
  { id: 'bagerhat', name_en: 'Bagerhat', name_bn: 'বাগেরহাট', division: 'Khulna' },
  { id: 'chuadanga', name_en: 'Chuadanga', name_bn: 'চুয়াডাঙ্গা', division: 'Khulna' },
  { id: 'jessore', name_en: 'Jessore', name_bn: 'যশোর', division: 'Khulna' },
  { id: 'jhenaidah', name_en: 'Jhenaidah', name_bn: 'ঝিনাইদহ', division: 'Khulna' },
  { id: 'khulna', name_en: 'Khulna', name_bn: 'খুলনা', division: 'Khulna' },
  { id: 'kushtia', name_en: 'Kushtia', name_bn: 'কুষ্টিয়া', division: 'Khulna' },
  { id: 'magura', name_en: 'Magura', name_bn: 'মাগুরা', division: 'Khulna' },
  { id: 'meherpur', name_en: 'Meherpur', name_bn: 'মেহেরপুর', division: 'Khulna' },
  { id: 'narail', name_en: 'Narail', name_bn: 'নড়াইল', division: 'Khulna' },
  { id: 'satkhira', name_en: 'Satkhira', name_bn: 'সাতক্ষীরা', division: 'Khulna' },

  // ── Rajshahi Division (8) ────────────────────────────────────────────────
  { id: 'bogura', name_en: 'Bogura', name_bn: 'বগুড়া', division: 'Rajshahi' },
  { id: 'chapainawabganj', name_en: 'Chapainawabganj', name_bn: 'চাঁপাইনবাবগঞ্জ', division: 'Rajshahi' },
  { id: 'joypurhat', name_en: 'Joypurhat', name_bn: 'জয়পুরহাট', division: 'Rajshahi' },
  { id: 'naogaon', name_en: 'Naogaon', name_bn: 'নওগাঁ', division: 'Rajshahi' },
  { id: 'natore', name_en: 'Natore', name_bn: 'নাটোর', division: 'Rajshahi' },
  { id: 'pabna', name_en: 'Pabna', name_bn: 'পাবনা', division: 'Rajshahi' },
  { id: 'rajshahi', name_en: 'Rajshahi', name_bn: 'রাজশাহী', division: 'Rajshahi' },
  { id: 'sirajganj', name_en: 'Sirajganj', name_bn: 'সিরাজগঞ্জ', division: 'Rajshahi' },

  // ── Rangpur Division (8) ─────────────────────────────────────────────────
  { id: 'dinajpur', name_en: 'Dinajpur', name_bn: 'দিনাজপুর', division: 'Rangpur' },
  { id: 'gaibandha', name_en: 'Gaibandha', name_bn: 'গাইবান্ধা', division: 'Rangpur' },
  { id: 'kurigram', name_en: 'Kurigram', name_bn: 'কুড়িগ্রাম', division: 'Rangpur' },
  { id: 'lalmonirhat', name_en: 'Lalmonirhat', name_bn: 'লালমনিরহাট', division: 'Rangpur' },
  { id: 'nilphamari', name_en: 'Nilphamari', name_bn: 'নীলফামারী', division: 'Rangpur' },
  { id: 'panchagarh', name_en: 'Panchagarh', name_bn: 'পঞ্চগড়', division: 'Rangpur' },
  { id: 'rangpur', name_en: 'Rangpur', name_bn: 'রংপুর', division: 'Rangpur' },
  { id: 'thakurgaon', name_en: 'Thakurgaon', name_bn: 'ঠাকুরগাঁও', division: 'Rangpur' },

  // ── Mymensingh Division (4) ──────────────────────────────────────────────
  { id: 'jamalpur', name_en: 'Jamalpur', name_bn: 'জামালপুর', division: 'Mymensingh' },
  { id: 'mymensingh', name_en: 'Mymensingh', name_bn: 'ময়মনসিংহ', division: 'Mymensingh' },
  { id: 'netrokona', name_en: 'Netrokona', name_bn: 'নেত্রকোণা', division: 'Mymensingh' },
  { id: 'sherpur', name_en: 'Sherpur', name_bn: 'শেরপুর', division: 'Mymensingh' },

  // ── Sylhet Division (4) ──────────────────────────────────────────────────
  { id: 'habiganj', name_en: 'Habiganj', name_bn: 'হবিগঞ্জ', division: 'Sylhet' },
  { id: 'moulvibazar', name_en: 'Moulvibazar', name_bn: 'মৌলভীবাজার', division: 'Sylhet' },
  { id: 'sunamganj', name_en: 'Sunamganj', name_bn: 'সুনামগঞ্জ', division: 'Sylhet' },
  { id: 'sylhet', name_en: 'Sylhet', name_bn: 'সিলেট', division: 'Sylhet' },

  // ── Barishal Division (6) ────────────────────────────────────────────────
  { id: 'barguna', name_en: 'Barguna', name_bn: 'বরগুনা', division: 'Barishal' },
  { id: 'barishal', name_en: 'Barishal', name_bn: 'বরিশাল', division: 'Barishal' },
  { id: 'bhola', name_en: 'Bhola', name_bn: 'ভোলা', division: 'Barishal' },
  { id: 'jhalokati', name_en: 'Jhalokati', name_bn: 'ঝালকাঠি', division: 'Barishal' },
  { id: 'patuakhali', name_en: 'Patuakhali', name_bn: 'পটুয়াখালী', division: 'Barishal' },
  { id: 'pirojpur', name_en: 'Pirojpur', name_bn: 'পিরোজপুর', division: 'Barishal' },
];

// ── Lookup helpers ──────────────────────────────────────────────────────────

/**
 * Fast map for ID-based lookups — built once at module load.
 */
const districtMap = new Map<string, District>(
  districts.map((d) => [d.id, d]),
);

/**
 * Returns a single district by its ID, or undefined if not found.
 */
export function getDistrictById(id: string): District | undefined {
  return districtMap.get(id);
}

/**
 * Returns all districts belonging to the given division name.
 */
export function getDistrictsByDivision(division: string): District[] {
  return districts.filter((d) => d.division === division);
}

/**
 * Returns a list of divisions with their district counts (handy for UI grouping).
 */
export function getDivisionSummary(): { division: string; count: number }[] {
  return DIVISIONS.map((div) => ({
    division: div,
    count: districts.filter((d) => d.division === div).length,
  }));
}
