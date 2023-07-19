import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/userContext.tsx'
import NotFound from './pages/NotFound.tsx';
import User from './pages/IndividualUser.tsx';

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/users/:userId' element={<User />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App;
