function navigate(direction) {
    const navLinks = Array.from(document.querySelectorAll('#main-nav a'));
    const currentUrl = window.location.href;

    // Logika pencocokan URL yang lebih kuat
    let currentIndex = navLinks.findIndex(link => {
        const absoluteLink = new URL(link.href).href;
        // Cek apakah URL sekarang mengandung alamat link tersebut
        return currentUrl === absoluteLink || currentUrl.split('?')[0] === absoluteLink;
    });

    if (direction === 'next' && currentIndex < navLinks.length - 1) {
        window.location.href = navLinks[currentIndex + 1].href;
    } 
    else if (direction === 'prev' && currentIndex > 0) {
        window.location.href = navLinks[currentIndex - 1].href;
    }
}

// Tambahkan pencegahan eror jika tombol ditekan terlalu cepat
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") navigate('next');
    if (e.key === "ArrowLeft") navigate('prev');
});
// Menandai link yang aktif di navigasi atas
window.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (currentUrl === link.href) {
            link.style.backgroundColor = "#007bff"; // Warna biru
            link.style.color = "white";            // Tulisan putih
            link.style.fontWeight = "bold";
            link.style.borderColor = "#007bff";
        }
    });
});
