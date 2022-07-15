import NxWelcome from './nx-welcome';
import BasicTable from './Table';
import { Routes, Route } from 'react-router-dom';
import User from './User';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NxWelcome title="Frontend" />} />
        <Route path="/table" element={<BasicTable />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
