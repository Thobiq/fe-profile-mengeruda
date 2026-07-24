<script>
    import { navigating } from '$app/stores';
    import { onMount } from 'svelte';

    let progress = $state(0);
    let visible = $state(false);
    let timer;

    // Menangani loading saat navigasi halaman
    $effect(() => {
        if ($navigating) {
            // Mulai navigasi
            visible = true;
            progress = 0.1;
            clearInterval(timer);
            timer = setInterval(() => {
                progress += (1 - progress) * 0.15; // Bergerak perlahan ke 95%
                if (progress > 0.95) clearInterval(timer);
            }, 200);
        } else if (visible) {
            // Navigasi selesai
            progress = 1;
            clearInterval(timer);
            setTimeout(() => {
                visible = false;
                setTimeout(() => {
                    if (!visible) progress = 0; // Reset hanya jika tidak ada navigasi baru
                }, 300);
            }, 300);
        }
    });

    // Simulasi loading saat halaman pertama kali dimuat (Initial Load)
    onMount(() => {
        if (!visible && progress === 0) {
            visible = true;
            progress = 0.2;
            timer = setInterval(() => {
                progress += (1 - progress) * 0.25;
                if (progress > 0.9) {
                    clearInterval(timer);
                    progress = 1;
                    setTimeout(() => {
                        visible = false;
                        setTimeout(() => {
                            if (!visible) progress = 0;
                        }, 300);
                    }, 400);
                }
            }, 100);
        }
    });
</script>

<div 
    class="fixed top-0 left-0 h-[3px] bg-emerald-500 z-[99999] transition-all duration-300 ease-out"
    style="
        width: {progress * 100}%; 
        opacity: {visible ? 1 : 0}; 
        pointer-events: none;
        box-shadow: 0 0 10px #10b981, 0 0 5px #10b981;
    "
></div>
