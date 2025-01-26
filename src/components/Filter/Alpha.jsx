import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Alpha({ setActiveComponent, mobileLayout = false }) {
  const { filters, updateFilter } = useImageContext();

  const handleAlphaChange = (e) => {
    const AlphaValue = parseFloat(e.target.value);
    updateFilter("alpha", AlphaValue); // Update alpha filter
  };

  return (
    <div
      className={`w-full p-2 flex ${
        mobileLayout ? "flex-row items-center" : "flex-col p-4"
      } gap-5`}
    >
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Alpha</p>
        {!mobileLayout && (
          <UndoRedoButton
            iconSrc={BackIcon}
            onClick={() => setActiveComponent("Edit")}
          ></UndoRedoButton>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {/* Alpha Input Field */}
        <div
          className={`flex ${
            mobileLayout ? "flex-row inline-block items-center" : "flex-col"
          } gap-5`}
        >
          <label className="text-white">Change Alpha</label>
          <input
            type="range"
            className="w-full h-3 bg-transparent appearance-none cursor-pointer" // Increased height to h-3
            style={{
              WebkitAppearance: "none", // Remove default styling in WebKit browsers
              MozAppearance: "none", // Remove default styling in Firefox
            }}
            value={filters.alpha}
            onChange={handleAlphaChange}
            min="0"
            max="255"
          />
        </div>
      </div>
    </div>
  );
}

export default Alpha;
