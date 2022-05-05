import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App } from './App'
import { register } from './serviceWorkerRegistration'
import './index.css'

createRoot(document.querySelector('#root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)

register()
