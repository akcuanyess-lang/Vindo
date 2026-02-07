(function() {
    // 1. Deteksi posisi halaman
    const path = window.location.pathname;
    const parts = path.split('/');
    const pageName = parts.pop() || "index.html";
    let currentPage = parseInt(pageName) || 1;
    const totalPages = 31;

    // 2. Tentukan "Root" Folder (PENTING!)
    // Jika file berada di subfolder (misal /2/index.html), kita butuh '../' untuk kembali ke utama
    const isInsideFolder = parts.length > 2 || (parts.length === 2 && parts[1] !== "");
    const base = isInsideFolder ? "../" : "";

    // 3. Suntikkan CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-btn { position: fixed; top: 50%; transform: translateY(-50%); background: #6366f1; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 9999; text-decoration: none; }
        #prevBtn { left: 20px; } #nextBtn { right: 20px; }
        #page-tag { position: fixed; top: 15px; left: 50%; transform: translateX(-50%); background: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; color: #6366f1; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 10000; }
        .hide-nav { display: none !important; }
    `;
    document.head.appendChild(style);

    // 4. Suntikkan Navigasi dengan Jalur yang Benar
    // Menggunakan variabel 'base' agar link selalu akurat (contoh: ../2.html)
    document.body.insertAdjacentHTML('beforeend', `
        <div id="page-tag">HALAMAN ${currentPage} / ${totalPages}</div>
        <a href="${base}${currentPage - 1}.html" id="prevBtn" class="nav-btn ${currentPage <= 1 ? 'hide-nav' : ''}">&#10094;</a>
        <a href="${base}${currentPage + 1}.html" id="nextBtn" class="nav-btn ${currentPage >= totalPages ? 'hide-nav' : ''}">&#10095;</a>
    `);

    // 5. Navigasi Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && currentPage > 1) window.location.href = base + (currentPage - 1) + ".html";
        if (e.key === "ArrowRight" && currentPage < totalPages) window.location.href = base + (currentPage + 1) + ".html";
    });
})();
