const Header = ({ count = 0, onAdd }) => {
  return (
    <div style={{ border: '2px dashed #61dafb', borderRadius: 8, padding: 16 }}>
      <small>React remote</small>
      <h2>Hello from React!</h2>
      <p>Count from Vue: {count}</p>
      {onAdd && <button onClick={onAdd}>Add 1 from React</button>}
    </div>
  );
};

export default Header;
