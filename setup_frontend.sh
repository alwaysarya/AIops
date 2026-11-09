cd frontend

mkdir -p public src/components/Dashboard src/components/Logs src/components/Alerts src/components/Common src/components/Auth
mkdir -p src/pages src/services src/hooks src/contexts src/store src/utils src/styles

printf '{\n  "name": "aiops-frontend",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-router-dom": "^6.20.0",\n    "axios": "^1.6.2",\n    "@reduxjs/toolkit": "^1.9.7",\n    "react-redux": "^8.1.3",\n    "recharts": "^2.9.0",\n    "lucide-react": "^0.294.0"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-react": "^4.2.0",\n    "vite": "^5.0.0",\n    "tailwindcss": "^3.3.5",\n    "postcss": "^8.4.31",\n    "autoprefixer": "^10.4.16"\n  }\n}\n' > package.json

cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
EOF

cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AIOps Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
}
EOF

cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
EOF

cat > src/App.jsx << 'EOF'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
EOF

cat > src/store/index.js << 'EOF'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add reducers here
  },
})
EOF

echo "✅ Frontend Base Ready!"
