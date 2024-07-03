import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignInPage from "./components/SignInPage";
import LoginInPage from "./components/LoginInPage";
import { SnackbarProvider } from "notistack";
import CreateNote from "./components/CreateNote";
import UpdateNote from "./components/UpdateNote";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [search,setSearch] = useState("")
  return (
    <BrowserRouter>
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
            <Route path="/profile" Component={ProfilePage} />

          </Routes>
        </main>
      </SnackbarProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
