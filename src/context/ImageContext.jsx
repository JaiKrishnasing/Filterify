import React, { createContext, useState, useContext } from "react";

// De Context aanmaken
const ImageContext = createContext();

// ImageProvider component die de context beschikbaar maakt voor alle kinderen
// Beheert de staat voor breedte, hoogte, tekst, opslaan, gekozen afbeelding index, filters en custom filters
export const ImageProvider = ({ children }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [text, setText] = useState("");
  const [saveImage, setSaveImage] = useState(false);
  const [chosenImageIndex, setChosenImageIndex] = useState(null);

  // Unified state voor alle filters
  const [filters, setFilters] = useState({
    alpha: 255, // Alpha kanaal (0-255)
    saturation: 100, // Saturation (0-200)
    hue: 0, // Hue (0-360),
    invert: false,
    noiseIntensity: 0, // Noise intensity (0-10)
    temperature: -70, // Temperature (-100 to 100)
    emoji: false, // Emoji overlay aan/uit (met boolean)
  });

  // State voor de custom filters (aan/uit)
  const [customFilters, setCustomFilters] = useState({
    custom_Filter_1: false,
    custom_Filter_2: false,
    custom_Filter_3: false,
  });

  // Vooraf gedefinieerde filter instellingen voor elke custom filter
  const customFilterSettings = {
    custom_Filter_1: {
      saturation: 80,
      hue: 120, 
      temperature: 70, 
      emoji: true, 
    },
    custom_Filter_2: {
      saturation: 100, 
      hue: 60, 
      temperature: -50, 
      invert: true,
      noiseIntensity: 2, 
    },
    custom_Filter_3: {
      saturation: 200, 
      hue: 270, 
      temperature: 0, 
    },
  };

  // unctie om een specifieke filter te updaten
  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Past de instellingen van een custom filter toe
  const applyCustomFilterSettings = (filterName) => {
    if (customFilters[filterName]) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...customFilterSettings[filterName],
      }));
    } else {
      // eset naar de standaard filter instellingen indien het custom filter is uitgeschakeld
      setFilters((prevFilters) => ({
        ...prevFilters,
        saturation: 100,
        hue: 0,
        temperature: -70,
        invert: false,
        noiseIntensity: 0,
        emoji: false,
      }));
    }
  };

  // Reset alle filters en custom filters naar de standaard waarden.
  const resetFilters = () => {
    setFilters({
      alpha: 255,
      saturation: 100,
      hue: 0,
      invert: false,
      noiseIntensity: 0,
      temperature: -70,
      emoji: false,
    });
    setCustomFilters({
      custom_Filter_1: false,
      custom_Filter_2: false,
      custom_Filter_3: false,
    });
  };

  return (
    <ImageContext.Provider
      value={{
        width,
        height,
        updateWidth: (newWidth) => setWidth(newWidth),
        updateHeight: (newHeight) => setHeight(newHeight),
        text,
        setText,
        filters,
        updateFilter,
        customFilters,
        setCustomFilters,
        applyCustomFilterSettings,
        resetFilters,
        saveImage,
        setSaveImage,
        chosenImageIndex,
        setChosenImageIndex,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the context
export const useImageContext = () => useContext(ImageContext);
