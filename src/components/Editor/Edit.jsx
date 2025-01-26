import FilterButton from "../button/FilterButton";
import ColorIcon from "../../assets/icon/icons8-color-30.png";
import ThermoIcon from "../../assets/icon/icons8-thermometer-30.png";
import AlphaIcon from "../../assets/icon/icons8-opacity-30.png";
import SaturationIcon from "../../assets/icon/icons8-last-quarter-30.png";
import InvertIcon from "../../assets/icon/icons8-compare-30.png";
import NoiseIcon from "../../assets/icon/icons8-grain-30.png";

function Edit({ setActiveComponent, mobileLayout = false }) {
  return (
    <div
      className={`w-full p-4 flex ${
        mobileLayout ? "flex-row" : "flex-col"
      }  gap-5`}
    >
      <div>
        <p className="text-white text-lg font-bold">Edit</p>
      </div>
      <div
        className={`flex ${mobileLayout ? "flex-row gap-3" : "flex-col"} gap-1`}
      >
        <FilterButton
          iconSrc={AlphaIcon}
          name="Alpha"
          mobileLayout={true}
          onClick={() => setActiveComponent("Alpha")}
        ></FilterButton>
        <FilterButton
          iconSrc={NoiseIcon}
          mobileLayout={true}
          name="Noise"
          onClick={() => setActiveComponent("Noise")}
        ></FilterButton>
        <FilterButton
          iconSrc={InvertIcon}
          mobileLayout={true}
          name="Invert"
          onClick={() => setActiveComponent("Invert")}
        ></FilterButton>
        <FilterButton
          iconSrc={ColorIcon}
          mobileLayout={true}
          name="Hue"
          onClick={() => setActiveComponent("Hue")}
        ></FilterButton>
        <FilterButton
          iconSrc={SaturationIcon}
          mobileLayout={true}
          name="Saturation"
          onClick={() => setActiveComponent("Saturation")}
        ></FilterButton>
        <FilterButton
          iconSrc={ThermoIcon}
          mobileLayout={true}
          name="Temperature"
          onClick={() => setActiveComponent("Temperature")}
        ></FilterButton>
      </div>
    </div>
  );
}

export default Edit;
