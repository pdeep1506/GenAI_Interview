import {RouterProvider} from 'react-router'
import {router} from './app.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.js'

function App() {
  return(
      <AuthProvider>

      <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    )    
  
}

export default App
