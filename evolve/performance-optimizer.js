// Performance Optimizer para Evolve
// Melhora a execução e performance do jogo

class PerformanceOptimizer {
    constructor() {
        this.isInitialized = false;
        this.performanceMetrics = {
            fps: 0,
            memoryUsage: 0,
            loadTime: 0
        };
        this.optimizations = {
            enableCompression: true,
            enableCaching: true,
            enableLazyLoading: true,
            enableBackgroundProcessing: true
        };
    }

    // Inicializar otimizações
    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Inicializando Performance Optimizer...');
        
        this.setupPerformanceMonitoring();
        this.optimizeRendering();
        this.optimizeMemory();
        this.optimizeNetwork();
        this.setupBackgroundProcessing();
        
        this.isInitialized = true;
        console.log('✅ Performance Optimizer inicializado!');
    }

    // Monitoramento de performance
    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Log de performance a cada 5 segundos
                if (this.performanceMetrics.fps < 30) {
                    console.warn('⚠️ Performance baixa detectada:', this.performanceMetrics.fps, 'FPS');
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    // Otimização de renderização
    optimizeRendering() {
        // Otimizar animações CSS
        const style = document.createElement('style');
        style.textContent = `
            * {
                will-change: auto;
            }
            
            .animate, .button, .resource {
                will-change: transform, opacity;
            }
            
            .particle {
                will-change: transform;
            }
            
            /* Otimizar GPU */
            .content, .card, .modal {
                transform: translateZ(0);
                backface-visibility: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // Otimização de memória
    optimizeMemory() {
        // Limpeza periódica de memória
        setInterval(() => {
            if (window.gc) {
                window.gc();
            }
            
            // Limpar event listeners não utilizados
            this.cleanupEventListeners();
            
        }, 30000); // A cada 30 segundos
    }

    // Otimização de rede
    optimizeNetwork() {
        // Preload de recursos críticos
        const criticalResources = [
            'evolve/main.js',
            'evolve/evolve.css',
            'lib/buefy.min.0.9.22.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.js') ? 'script' : 'style';
            document.head.appendChild(link);
        });
    }

    // Processamento em background
    setupBackgroundProcessing() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('❌ Falha no Service Worker:', error);
                });
        }
        
        // Usar Web Workers para tarefas pesadas
        if (window.Worker) {
            this.setupWebWorkers();
        }
    }

    // Configurar Web Workers
    setupWebWorkers() {
        const workerCode = `
            self.onmessage = function(e) {
                // Processar cálculos pesados aqui
                const result = heavyCalculation(e.data);
                self.postMessage(result);
            };
            
            function heavyCalculation(data) {
                // Simular cálculo pesado
                let result = 0;
                for (let i = 0; i < 1000000; i++) {
                    result += Math.random();
                }
                return result;
            }
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        
        this.worker = new Worker(workerUrl);
        this.worker.onmessage = (e) => {
            // Processar resultado do worker
            console.log('Worker result:', e.data);
        };
    }

    // Limpeza de event listeners
    cleanupEventListeners() {
        // Implementar limpeza de listeners não utilizados
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            // Verificar se o elemento ainda está no DOM
            if (!document.contains(element)) {
                // Limpar listeners se necessário
            }
        });
    }

    // Otimizar carregamento de imagens
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Lazy loading para imagens
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Otimizar tamanho baseado na viewport
            if (window.innerWidth < 768) {
                img.src = img.src.replace('.png', '-mobile.png');
            }
        });
    }

    // Otimizar animações
    optimizeAnimations() {
        // Reduzir animações em dispositivos com performance baixa
        if (this.performanceMetrics.fps < 30) {
            document.body.classList.add('reduce-motion');
        }
        
        // Pausar animações quando a aba não está visível
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('pause-animations');
            } else {
                document.body.classList.remove('pause-animations');
            }
        });
    }

    // Métricas de performance
    getMetrics() {
        return {
            ...this.performanceMetrics,
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            } : null,
            timestamp: Date.now()
        };
    }

    // Log de métricas
    logMetrics() {
        const metrics = this.getMetrics();
        console.log('📊 Métricas de Performance:', metrics);
        return metrics;
    }
}

// Inicializar otimizador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
    window.performanceOptimizer.init();
    
    // Log de métricas a cada 10 segundos
    setInterval(() => {
        window.performanceOptimizer.logMetrics();
    }, 10000);
});

// Exportar para uso global
window.PerformanceOptimizer = PerformanceOptimizer;
