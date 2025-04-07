import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import EditSite from './pages/EditSite'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <EditSite/>
    }
  ]);
  return (
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
       
  )
}

export default App;
