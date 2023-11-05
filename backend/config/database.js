const { createPool } = require('mysql');

// Membuat koneksi pool
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sulthandb',
    connectionLimit: 10
});

// Contoh query: Ambil semua data dari tabel 'nama_tabel'
pool.query('SELECT * FROM nama_tabel', (error, results, fields) => {
    if (error) {
        console.error('Error querying the database:', error);
        return;
    }

    // Hasil query tersedia dalam 'results'
    console.log('Hasil Query:', results);
});

// Ingatlah untuk menjaga koneksi agar tetap terbuka jika Anda memiliki query lebih lanjut
// pool.end();
