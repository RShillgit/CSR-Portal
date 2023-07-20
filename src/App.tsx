import Home from './pages/Home';
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/userContext.tsx'
import NotFound from './pages/NotFound.tsx';
import User from './pages/IndividualUser.tsx';

function App() {

  return (
    <UserContextProvider>
      <HashRouter basename='/'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/users/:userId' element={<User />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </HashRouter>
    </UserContextProvider>
  )
}

export default App;
