import EmojiIcon from "../../assets/icon/icons8-kite-30.png";
import MoneyIcon from "../../assets/icon/icons8-money-30.png";
import CanvasIcon from "../../assets/icon/icons8-canvas-30.png";
import ThanosIcon from "../../assets/icon/icons8-thanos-30.png";
import FilterButton from "../button/FilterButton";
import { useImageContext } from "../../context/ImageContext";

function Effects({ setActiveComponent, mobileLayout = false }) {
  const { customFilters, setCustomFilters, applyCustomFilterSettings } =
    useImageContext();
  const toggleFilter = (filterName) => {
    setCustomFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
    applyCustomFilterSettings(filterName);
  };

  return (
    <div
      className={`w-full p-4 flex ${
        mobileLayout ? "flex-row" : "flex-col"
      } gap-5`}
    >
      <div>
        <p className="text-white text-lg font-bold">Effects</p>
      </div>
      <div
        className={`flex ${
          mobileLayout ? "flex-row gap-2" : "flex-col gap-1"
        } `}
      >
        {!mobileLayout && (
          <div>
            <FilterButton
              iconSrc={EmojiIcon}
              name="Emoji"
              onClick={() => setActiveComponent("Emoji")}
            />
          </div>
        )}

        {/* Custom Filter Buttons */}
        <div>
          <FilterButton
            iconSrc={MoneyIcon}
            mobileLayout={mobileLayout}
            name={" Geld"}
            onClick={() => toggleFilter("custom_Filter_1")}
          />
        </div>
        <div>
          <FilterButton
            iconSrc={CanvasIcon}
            mobileLayout={mobileLayout}
            name={" Pixel Schild"}
            onClick={() => toggleFilter("custom_Filter_2")}
          />
        </div>
        <div>
          <FilterButton
            iconSrc={ThanosIcon}
            mobileLayout={mobileLayout}
            name={"Thanos"}
            onClick={() => toggleFilter("custom_Filter_3")}
          />
        </div>
      </div>
    </div>
  );
}

export default Effects;
