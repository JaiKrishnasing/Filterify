import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Hue({ setActiveComponent, mobileLayout = false }) {
  const { filters, updateFilter } = useImageContext();

  const handleHueChange = (e) => {
    const hueValue = parseFloat(e.target.value);
    updateFilter("hue", hueValue); // Update hue filter
  };

  return (
    <div
      className={`w-full p-2 flex ${
        mobileLayout ? "flex-row items-center" : "flex-col p-4"
      } gap-5`}
    >
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Hue</p>
        {!mobileLayout && (
          <UndoRedoButton
            iconSrc={BackIcon}
            onClick={() => setActiveComponent("Edit")} // Go back to Edit
          ></UndoRedoButton>
        )}
      </div>
      <div className={`flex ${mobileLayout ? "flex-row" : "flex-col"} gap-3`}>
        {/* Hue Input Field */}
        <div
          className={`flex ${
            mobileLayout ? "flex-row inline-block items-center" : "flex-col"
          } gap-5`}
        >
          <label className="text-white">Change Hue</label>
          <input
            type="range"
            className="w-full h-3 bg-transparent appearance-none cursor-pointer" // Increased height to h-3
            style={{
              WebkitAppearance: "none", // Remove default styling in WebKit browsers
              MozAppearance: "none", // Remove default styling in Firefox
            }}
            value={filters.hue}
            onChange={handleHueChange}
            min="0"
            max="360"
          />
        </div>
      </div>
    </div>
  );
}

export default Hue;
