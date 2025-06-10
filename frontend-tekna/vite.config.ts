// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,         // garante que o front é o contexto
  server: {
    host: '0.0.0.0',        // escuta externamente
    port: 4200,
    strictPort: true,
    hmr: {
      protocol: 'ws',       // força ws (evita tentativas com wss)
      host: 'localhost',    // onde o browser conecta
      port: 4200,           // mesma porta exposta pelo container
      clientPort: 4200      // opcional: informa o client também
    },
    watch: {                // opcional: melhora detecção de alterações
      usePolling: true
    }
  }
})
