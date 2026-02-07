 <script>
       // 1. Deteksi halaman saat ini dari URL (misal: "5.html" -> 5)
let path = window.location.pathname;
let pageName = path.split("/").pop();
let currentPage = parseInt(pageName) || 1; 
const totalPages = 31;

// 2. Suntikkan CSS ke dalam <head> secara otomatis
const style = document.createElement('style');
style.textContent = `
    :root { --primary: #6366f1; }
    #page-nav-container { font-family: 'Segoe UI', sans-serif; }
    .nav-btn { 
        position: fixed; top: 50%; transform: translateY(-50%);
        background: var(--primary); color: white; border: none;
        width: 50px; height: 50px; border-radius: 50%; cursor: pointer;
        box-shadow: 0 8px 15px rgba(0,0,0,0.2); font-size: 20px; z-index: 9999;
        display: flex; align-items: center; justify-content: center; transition: 0.3s;
    }
    .nav-btn:hover { background: #4f46e5; transform: translateY(-50%) scale(1.1); }
    #prevBtn { left: 20px; }
    #nextBtn { right: 20px; }
    .hidden { display: none; }
    #page-indicator {
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: white; padding: 5px 15px; border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-weight: bold; color: var(--primary);
    }
`;
document.head.appendChild(style);

// 3. Suntikkan Elemen HTML Navigasi ke dalam <body>
document.body.insertAdjacentHTML('beforeend', `
    <div id="page-nav-container">
        <div id="page-indicator">Halaman ${currentPage} / ${totalPages}</div>
        <button id="prevBtn" class="nav-btn ${currentPage === 1 ? 'hidden' : ''}">&#10094;</button>
        <button id="nextBtn" class="nav-btn ${currentPage === totalPages ? 'hidden' : ''}">&#10095;</button>
    </div>
`);

// 4. Logika Klik Tombol
document.getElementById('prevBtn').onclick = () => { window.location.href = `${currentPage - 1}.html`; };
document.getElementById('nextBtn').onclick = () => { window.location.href = `${currentPage + 1}.html`; };

// 5. Logika Keyboard (Panah Kiri/Kanan)
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && currentPage > 1) window.location.href = `${currentPage - 1}.html`;
    if (e.key === "ArrowRight" && currentPage < totalPages) window.location.href = `${currentPage + 1}.html`;
});

    </script>

