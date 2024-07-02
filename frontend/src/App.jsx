import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignInPage from "./components/SignInPage";
import LoginInPage from "./components/LoginInPage";
import { SnackbarProvider } from "notistack";
import CreateNote from "./components/CreateNote";
import UpdateNote from "./components/UpdateNote";

function App() {
  const [search,setSearch] = useState("")
  return (
    <BrowserRouter>
      {/* <RouterProvider router={appRouter} /> */}
      <Header setSearch={setSearch}/>
      <SnackbarProvider autoHideDuration={3000}>
        <main className="">
          <Routes>
            <Route path="/" Component={LandingPage} />

            <Route path="/register" Component={SignInPage} />

            <Route path="/login" Component={LoginInPage} />
            <Route path="/mynotez" Component={()=><Body search={search}/>} />
            <Route path="/note/:id" Component={UpdateNote} />
            <Route path="/createnote" Component={CreateNote} />

          </Routes>
        </main>
      </SnackbarProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
