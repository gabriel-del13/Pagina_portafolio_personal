module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Colores principales
        primary: '#3b82f6',     
        secondary: '#1e293b',    
        accent: '#06b6d4',      
        
        // Backgrounds
        'bg-dark': '#0f172a',    
        'bg-darker': '#020617',  
        'bg-light': '#1e293b',   
        
        // Textos
        'text-primary': '#f1f5f9',   
        'text-secondary': '#cbd5e1',  
        'text-muted': '#94a3b8',     
        
        // Estados
        success: '#10b981',      
        warning: '#f59e0b',      
        danger: '#ef4444',       
      },
    },
  },
  plugins: [],
}