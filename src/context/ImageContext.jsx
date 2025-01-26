import React, { createContext, useState, useContext } from "react";

// Create the Context
const ImageContext = createContext();

// Create the provider component
export const ImageProvider = ({ children }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [text, setText] = useState("");
  const [saveImage, setSaveImage] = useState(false);
  const [chosenImageIndex, setChosenImageIndex] = useState(null);

  // Unified state for filters
  const [filters, setFilters] = useState({
    alpha: 255, // Alpha channel (0-255)
    saturation: 100, // Saturation (0-200)
    hue: 0, // Hue (0-360),
    invert: false,
    noiseIntensity: 0, // Noise intensity (0-10)
    temperature: -70, // Temperature (-100 to 100)
    emoji: false,
  });

  const [customFilters, setCustomFilters] = useState({
    custom_Filter_1: false,
    custom_Filter_2: false,
    custom_Filter_3: false,
  });

  // Predefined filter settings for each custom filter
  const customFilterSettings = {
    custom_Filter_1: {
      saturation: 80, // Desaturate the image
      hue: 120, // Green hue (120 is green in the HSL color space)
      temperature: 70, // Neutral temperature
      emoji: true, // Enable emoji overlay
    },
    custom_Filter_2: {
      saturation: 100, // Keep some saturation
      hue: 60, // Yellow hue (60 is yellow in the HSL color space)
      temperature: -50, // Cooler temperature
      invert: true, // Invert colors
      noiseIntensity: 2, // Add some noise
    },
    custom_Filter_3: {
      saturation: 200, // Highly saturated
      hue: 270, // Purple hue (270 is purple in the HSL color space)
      temperature: 0, // Neutral temperature
    },
  };

  // Function to update a specific filter
  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Function to apply custom filter settings
  const applyCustomFilterSettings = (filterName) => {
    if (customFilters[filterName]) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...customFilterSettings[filterName],
      }));
    } else {
      // Reset to default filter settings if the custom filter is disabled
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

  // Function to reset all filters and custom filters
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
