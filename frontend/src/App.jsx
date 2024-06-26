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

function App() {
  return (
    <BrowserRouter>
      {/* <RouterProvider router={appRouter} /> */}
      <Header />
      <SnackbarProvider>
        <main className="">
          <Routes>
            <Route path="/" Component={LandingPage} />

            <Route path="/register" Component={SignInPage} />

            <Route path="/login" Component={LoginInPage} />
            <Route path="/mynotez" Component={Body} />
          </Routes>
        </main>
      </SnackbarProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
