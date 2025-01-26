import UndoRedoButton from "../button/UndoRedoButton";
import BackIcon from "../../assets/icon/icons8-back-30.png";
import { useImageContext } from "../../context/ImageContext";

function Emoji({ setActiveComponent }) {
  const { filters, updateFilter } = useImageContext();

  const handleInvertToggle = () => {
    updateFilter("emoji", !filters.emoji); // Toggle the invert value
  };

  return (
    <div className="w-full p-4 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-white text-lg font-bold">Emoji</p>
        <UndoRedoButton
          iconSrc={BackIcon}
          onClick={() => setActiveComponent("Edit")}
        ></UndoRedoButton>
      </div>
      <div className="flex flex-col gap-3">
        {/* Toggle Button for Invert */}
        <div className="flex flex-col gap-5">
          <label className="text-white">Toggle Emoji</label>
          <button
            onClick={handleInvertToggle}
            className={`w-full p-2 rounded-md text-white transition-colors cursor-pointer ${
              filters.emoji ? "bg-orange-500" : "bg-custom-button"
            }`}
          >
            {filters.emoji ? "Emoji On" : "Emoji Off"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Emoji;
