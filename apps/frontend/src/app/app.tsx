import NxWelcome from './nx-welcome';
import BasicTable from './Table';
import { Routes, Route } from 'react-router-dom';
import User from './User';
import AddInvoice from './Invoice/AddInvoice';
import Login from './Auth/Login';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NxWelcome title="Frontend" />} />
        <Route path="/table" element={<BasicTable />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/addInvoice" element={<AddInvoice />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
