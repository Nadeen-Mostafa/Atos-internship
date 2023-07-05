import logo from './logo.svg';
import './App.css';
import UserAuth from './hooks/UserAuth';
import Protected from './components/Protected';
import Public from './components/Public';

function App() {

  const Auth = UserAuth();
  return (
    Auth ? <Protected /> : <Public />
  );
}

export default App;
