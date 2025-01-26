import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Invert({ setActiveComponent, mobileLayout = false }) {
  const { filters, updateFilter } = useImageContext();

  const handleInvertToggle = () => {
    updateFilter("invert", !filters.invert); // Toggle the invert value
  };

  return (
    <div
      className={`w-full p-2 flex ${
        mobileLayout ? "flex-row items-center" : "flex-col p-4"
      } gap-5`}
    >
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Invert</p>
        {!mobileLayout && (
          <UndoRedoButton
            iconSrc={BackIcon}
            onClick={() => setActiveComponent("Edit")}
          ></UndoRedoButton>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {/* Toggle Button for Invert */}
        <div
          className={`flex ${
            mobileLayout ? "flex-row items-center" : "flex-col"
          } gap-5`}
        >
          <label className="text-white">Toggle Invert</label>
          <button
            onClick={handleInvertToggle}
            className={`w-full p-2 rounded-md text-white transition-colors cursor-pointer ${
              filters.invert ? "bg-orange-500" : "bg-custom-button"
            }`}
          >
            {filters.invert ? "Invert On" : "Invert Off"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invert;
