import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/Sidebar";
import MainCanvas from "./components/layout/MainCanvas";
import { ImageProvider } from "./context/ImageContext";
import Footer from "./components/layout/Footer";

// Hoofd App component
function App() {
  // State voor de huidige afbeelding 
  const [image, setImage] = useState(null);

  return (
    <ImageProvider>
      <div className="w-screen h-screen flex flex-col">
        <Header />
          {/* Container voor het hoofdinhoudsgebied */}
        <div className="flex flex-1 overflow-hidden">
          <SideBar image={image} />
          <MainCanvas image={image} setImage={setImage} />
        </div>
        {/* Footer component aan de onderkant */}
        <Footer image={image} />
      </div>
    </ImageProvider>
  );
}

export default App;
