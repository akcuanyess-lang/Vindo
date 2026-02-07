/* 
   FILE: navigasi.js 
   FITUR: Navigasi 1-31, Proteksi Arab, Indikator Halaman, Keyboard Shortcut, & UI Modern
*/

(function() {
    // === 1. LOGIKA DETEKSI HALAMAN ===
    // Mengambil angka dari nama file, misal "5.html" -> 5
    const path = window.location.pathname;
    const pageName = path.split("/").pop();
    let currentPage = parseInt(pageName) || 1;
    const totalPages = 31;

    // === 2. DESAIN UI (CSS INJECTOR) ===
    // Menyatukan semua desain agar tidak perlu file .css terpisah
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --primary: #6366f1; --white: #ffffff; --shadow: rgba(0,0,0,0.15); }
        
        /* Navigasi Tombol Melayang */
        .nav-btn { 
            position: fixed; top: 50%; transform: translateY(-50%); 
            background: var(--primary); color: white; border: none; 
            width: 55px; height: 55px; border-radius: 50%; cursor: pointer; 
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4); 
            display: flex; align-items: center; justify-content: center; 
            z-index: 9999; text-decoration: none; font-size: 24px; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-btn:hover { background: #4f46e5; transform: translateY(-50%) scale(1.15); }
        .nav-btn:active { transform: translateY(-50%) scale(0.9); }
        #prevBtn { left: 25px; }
        #nextBtn { right: 25px; }
        .nav-hidden { opacity: 0; visibility: hidden; pointer-events: none; }

        /* Indikator Halaman (Atas) */
        #page-tag { 
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%); 
            background: var(--white); padding: 8px 22px; border-radius: 30px; 
            font-weight: bold; color: var(--primary); z-index: 10000;
            box-shadow: 0 4px 15px var(--shadow); border: 1px solid #eee;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px;
            letter-spacing: 1px;
        }

        /* Optimasi Teks Arab (RTL & Font) */
        .arabic-text { 
            direction: rtl !important; 
            font-family: 'Amiri', serif; 
            font-size: 1.4em !important; 
            line-height: 2 !important; 
            display: block; 
            margin: 20px 0; 
            text-align: right;
        }
        
        /* Transisi Halaman (Fade In) */
        body { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 600px) {
            .nav-btn { width: 45px; height: 45px; font-size: 18px; }
            #prevBtn { left: 10px; } #nextBtn { right: 10px; }
        }
    `;
    document.head.appendChild(style);

    // === 3. SUNTIKKAN ELEMEN HTML ===
    const navHTML = `
        <div id="page-tag">HALAMAN ${currentPage} / ${totalPages}</div>
        <a href="${currentPage - 1}.html" id="prevBtn" class="nav-btn ${currentPage <= 1 ? 'nav-hidden' : ''}">&#10094;</a>
        <a href="${currentPage + 1}.html" id="nextBtn" class="nav-btn ${currentPage >= totalPages ? 'nav-hidden' : ''}">&#10095;</a>
    `;
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // === 4. PROTEKSI & FORMAT OTOMATIS TEKS ARAB ===
    // Mencari karakter Arab (\u0600-\u06FF) dan memberikan gaya khusus
    const arabicRegex = /[\u0600-\u06FF]/;
    document.querySelectorAll('p, span, h1, h2, h3, div, b, i, blockquote').forEach(el => {
        if (arabicRegex.test(el.innerText)) {
            el.classList.add('arabic-text');
            el.setAttribute('translate', 'no'); // Mencegah Google merusak teks Arab
        }
    });

    // === 5. NAVIGASI KEYBOARD (SHORTCUT) ===
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && currentPage > 1) {
            window.location.href = (currentPage - 1) + ".html";
        }
        if (e.key === "ArrowRight" && currentPage < totalPages) {
            window.location.href = (currentPage + 1) + ".html";
        }
    });

    // === 6. SMOOTH SCROLL TO TOP SAAT LOAD ===
    window.scrollTo({ top: 0, behavior: 'smooth' });

})();
