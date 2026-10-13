import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';

const App = () => {
  const [count, setCount] = useState(0);
  return <Header count={count} onAdd={() => setCount(count + 1)} />;
};

createRoot(document.getElementById('root')).render(<App />);
