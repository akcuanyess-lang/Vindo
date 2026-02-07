function pindahHalaman(arah) {
    // 1. Ambil nama file saat ini dari URL (contoh: "5.html")
    let path = window.location.pathname;
    let fileName = path.split("/").pop();
    
    // 2. Ambil angkanya saja. Jika bukan angka, anggap halaman 2 (awal)
    let angkaSekarang = parseInt(fileName.replace(".html", "")) || 2;
    
    // 3. Tentukan batas bawah dan batas atas
    const batasMinimal = 2;
    const batasMaksimal = 31;

    // 4. Hitung halaman tujuan
    let angkaTujuan = arah === 'next' ? angkaSekarang + 1 : angkaSekarang - 1;

    // 5. Cek apakah halaman tujuan masih dalam batas valid
    if (angkaTujuan < batasMinimal) {
        alert("Ini adalah halaman pertama.");
    } else if (angkaTujuan > batasMaksimal) {
        alert("Ini adalah halaman terakhir.");
    } else {
        // Pindah ke file HTML tujuan
        window.location.href = angkaTujuan + ".html";
    }
}