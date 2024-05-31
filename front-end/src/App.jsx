import { routes } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        {
          routes.map((r, idx) => <Route key={idx} path={r.path} element={<r.element />} />)
        }
        <Route path='/' element={<Navigate to={'/sign-in'} />} />
      </Routes>
    </>
  )
}

export default App
