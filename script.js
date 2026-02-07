/* 
   FILE: navigasi.js 
   FUNGSI: Khusus untuk file yang sudah di-Save As ke Bahasa Indonesia
*/

(function() {
    // === 1. DETEKSI HALAMAN ===
    // Mengambil angka dari nama file, misal "1.html" -> 1
    const path = window.location.pathname;
    const pageName = path.split("/").pop();
    let currentPage = parseInt(pageName) || 1;
    const totalPages = 31;

    // === 2. DESAIN CSS NAVIGASI ===
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --primary: #6366f1; --white: #ffffff; }
        
        /* Tombol Navigasi Melayang */
        .nav-btn { 
            position: fixed; top: 50%; transform: translateY(-50%); 
            background: var(--primary); color: white; border: none; 
            width: 55px; height: 55px; border-radius: 50%; cursor: pointer; 
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4); 
            display: flex; align-items: center; justify-content: center; 
            z-index: 9999; text-decoration: none; font-size: 24px; transition: 0.3s;
        }
        .nav-btn:hover { background: #4f46e5; transform: translateY(-50%) scale(1.1); }
        #prevBtn { left: 25px; }
        #nextBtn { right: 25px; }
        .nav-hidden { display: none !important; }

        /* Indikator Halaman di Atas */
        #page-tag { 
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%); 
            background: var(--white); padding: 7px 20px; border-radius: 25px; 
            font-weight: bold; color: var(--primary); z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #eee;
            font-family: sans-serif; font-size: 14px;
        }

        /* Proteksi Arab agar tetap rapi */
        .notranslate { direction: rtl; font-family: serif; font-size: 1.3em; line-height: 1.9; display: block; margin: 15px 0; }
    `;
    document.head.appendChild(style);

    // === 3. SUNTIKKAN HTML NAVIGASI ===
    const navHTML = `
        <div id="page-tag">HALAMAN ${currentPage} / ${totalPages}</div>
        <a href="${currentPage - 1}.html" id="prevBtn" class="nav-btn ${currentPage <= 1 ? 'nav-hidden' : ''}">&#10094;</a>
        <a href="${currentPage + 1}.html" id="nextBtn" class="nav-btn ${currentPage >= totalPages ? 'nav-hidden' : ''}">&#10095;</a>
    `;
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // === 4. PROTEKSI TEKS ARAB (Agar Tidak Berantakan) ===
    const arabicRegex = /[\u0600-\u06FF]/;
    document.querySelectorAll('p, span, h1, h2, h3, div, b, i, blockquote').forEach(el => {
        if (arabicRegex.test(el.innerText)) {
            el.classList.add('notranslate');
        }
    });

    // === 5. NAVIGASI KEYBOARD ===
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && currentPage > 1) window.location.href = (currentPage - 1) + ".html";
        if (e.key === "ArrowRight" && currentPage < totalPages) window.location.href = (currentPage + 1) + ".html";
    });
})();
