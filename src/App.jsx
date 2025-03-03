import { Outlet } from "react-router-dom";

const App = ()=> {
  return (
    <>
      <div className={'bg-gray-500'}>
        <nav className={'h-8 bg-slate-800 w-full border-4 mb-3'}> navbar </nav>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
