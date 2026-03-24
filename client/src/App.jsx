import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

function App() {
  return (
    <>
      <div className="bg-slate-800 h-screen">
        <div className="flex justify-center items-center h-screen">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;
