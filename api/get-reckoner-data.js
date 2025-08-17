// File: /api/get-reckoner-data.js

// Konstanta dan logika pembuatan tabel sekarang ada di server
const rrTimesMin = [5, 15, 30, 60, 120, 180, 240, 300, 360, 480, 600];
const rrMags = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 25, 30, 40];
const formatTimeLabel = (m) => m < 60 ? `${m}m` : (m % 60 === 0 ? `${m / 60}h` : `${(m / 60).toFixed(1)}h`);
const rrPoints = (a, m) => 2 * a * a * (m / 60);
const classifyPts = (p) => p >= 400 ? 'pv-bad' : (p >= 100 ? 'pv-warn' : 'pv-ok');

export default function handler(request, response) {
  // Hanya izinkan metode GET
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Siapkan data header tabel
  const headers = rrTimesMin.map(m => ({
    label: formatTimeLabel(m),
    min: m
  }));

  // Siapkan data baris-baris tabel
  const rows = rrMags.map(a => {
    const cells = rrTimesMin.map(m => {
      const pts = Math.round(rrPoints(a, m));
      return {
        points: pts,
        class: classifyPts(pts),
        min: m,
        a: a
      };
    });
    return {
      magnitude: a,
      cells: cells
    };
  });

  // Kirim data yang sudah jadi sebagai JSON
  response.status(200).json({ headers, rows });
}