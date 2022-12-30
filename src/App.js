
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import AddTodo from './components/addtodo/AddTodo'
import Todo from './components/todo/Todo'
import RemovedTodos from './components/removedtodos/RemovedTodos'
function App() {
const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
      path:"/",
      element:<AddTodo/>
    },
    {
      path:"/todos",
      element:<Todo/>
    },
    {
      path:"/removed-todos",
      element:<RemovedTodos/>
    }

    ]
  }
])

  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
