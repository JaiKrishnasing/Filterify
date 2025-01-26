import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Noise({ setActiveComponent, mobileLayout = false }) {
  const { filters, updateFilter } = useImageContext();

  const handleNoiseChange = (e) => {
    const noiseIntensityValue = parseFloat(e.target.value);
    updateFilter("noiseIntensity", noiseIntensityValue); // Update alpha filter
  };

  return (
    <div
      className={`w-full p-2 flex ${
        mobileLayout ? "flex-row items-center" : "flex-col p-4"
      } gap-5`}
    >
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Noise</p>
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
          <label className="text-white">Change Noise</label>
          <input
            type="range"
            className="w-full h-3 bg-transparent appearance-none cursor-pointer" // Increased height to h-3
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
            value={filters.noiseIntensity}
            onChange={handleNoiseChange}
            min="0"
            max="10"
          />
        </div>
      </div>
    </div>
  );
}

export default Noise;
