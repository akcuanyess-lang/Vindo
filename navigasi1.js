 <script>
        let currentPage = 1;
        const totalPages = 31;

        // Sound Effect menggunakan Web Audio API atau path MP3
        const clickSound = new Audio('https://assets.mixkit.co');

        function updateUI() {
            document.getElementById('page-indicator').innerText = `HALAMAN ${currentPage} / ${totalPages}`;
            document.getElementById('content-title').innerText = `Konten Halaman ${currentPage}`;
            document.getElementById('content-body').innerText = `Anda sedang berada di halaman ${currentPage}. Desain ini mendukung navigasi keyboard, suara klik, dan otomatis sembunyi saat di batas awal/akhir.`;

            // Kontrol visibilitas tombol
            document.getElementById('prevBtn').classList.toggle('hidden', currentPage === 1);
            document.getElementById('nextBtn').classList.toggle('hidden', currentPage === totalPages);
        }

        function changePage(step) {
            const newPage = currentPage + step;
            
            if (newPage >= 1 && newPage <= totalPages) {
                // Mainkan suara
                clickSound.currentTime = 0;
                clickSound.play();

                currentPage = newPage;

                // 1. Smooth Scroll ke Atas
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // 2. Transisi Konten
                const content = document.getElementById('content-area');
                content.style.opacity = 0;
                
                setTimeout(() => {
                    updateUI();
                    content.style.opacity = 1;
                }, 250);
            }
        }

        // Event Listener Keyboard (Shortcut)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changePage(-1);
            if (e.key === 'ArrowRight') changePage(1);
        });

        updateUI();
    </script>
