import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Temperature({ setActiveComponent, mobileLayout = false }) {
  const { filters, updateFilter } = useImageContext();

  const handleTemperatureChange = (e) => {
    const temperatureValue = parseFloat(e.target.value);
    updateFilter("temperature", temperatureValue); // Update alpha filter
  };

  return (
    <div
      className={`w-full p-2 flex ${
        mobileLayout ? "flex-row items-center" : "flex-col p-4"
      } gap-5`}
    >
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Temperature</p>
        {!mobileLayout && (
          <UndoRedoButton
            iconSrc={BackIcon}
            onClick={() => setActiveComponent("Edit")}
          ></UndoRedoButton>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={`flex ${
            mobileLayout ? "flex-row inline-block items-center" : "flex-col"
          } gap-5`}
        >
          <label className="text-white">Change Temperature</label>
          <input
            type="range"
            className="w-full h-3 bg-transparent appearance-none cursor-pointer"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
            value={filters.temperature}
            onChange={handleTemperatureChange}
            min="-100"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}

export default Temperature;
