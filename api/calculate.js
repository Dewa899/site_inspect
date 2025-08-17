// File: /api/calculate.js

// Fungsi ini akan dieksekusi di server Vercel, bukan di browser pengguna.
export default function handler(request, response) {
  // Hanya izinkan metode POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Ambil data input yang dikirim dari frontend
    const { ahv, targetA, shiftH, toolHours } = request.body;

    // --- SEMUA LOGIKA RAHASIA ANDA DARI FUNGSI recalc() PINDAHKAN KE SINI ---
    const a8full = ahv * Math.sqrt(shiftH / 8);
    const Tmax8 = 8 * Math.pow(targetA / ahv, 2);
    const TmaxLimited = Math.min(Tmax8, shiftH);
    const dutyTarget = (shiftH > 0) ? (TmaxLimited / shiftH) : 0;
    const workMin = Math.round(60 * dutyTarget);
    const breakMin = 60 - workMin;
    const opsNeeded = (isFinite(toolHours) && toolHours > 0 && TmaxLimited > 0) 
                        ? Math.ceil(toolHours / TmaxLimited) 
                        : "—";
    
    // Perhitungan HSE points
    const Tcur = dutyTarget * shiftH;
    const points = 2 * ahv * ahv * Tcur;

    // --- AKHIR DARI LOGIKA RAHASIA ---

    // 2. Kirim kembali HANYA HASILNYA dalam format JSON
    response.status(200).json({
      a8full: a8full.toFixed(2),
      Tmax8: Tmax8.toFixed(2),
      TmaxLimited: TmaxLimited.toFixed(2),
      perHourText: `${workMin}′ + ${breakMin}′`,
      opsNeeded: opsNeeded,
      pointsNow: Math.round(points)
      // Tambahkan hasil lain yang Anda butuhkan di frontend
    });

  } catch (error) {
    // Tangani jika ada kesalahan perhitungan
    response.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}