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

function App() {
  const appRouter = createBrowserRouter([
    {
      element: <Body />,
      path: "/home",
    },
    {
      element: <LandingPage />,
      path: "/",
    },
  ]);
  return (
    <BrowserRouter>
      {/* <RouterProvider router={appRouter} /> */}
      <main>
        <Header />
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/mynotez" Component={Body} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
