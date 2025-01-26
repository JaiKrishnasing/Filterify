import EditorButton from "../button/EditorButton";
import adjustIcon from "../../assets/icon/icons8-adjust-30.png";
import starIcon from "../../assets/icon/icons8-stars-30.png";
import { useState } from "react";
import Effects from "../Editor/Effects";
import Edit from "../Editor/Edit";
import Hue from "../Filter/Hue";
import Alpha from "../Filter/Alpha";
import Noise from "../Filter/Noise";
import Temperature from "../Filter/Temperature";
import Saturation from "../Filter/Saturation";
import Invert from "../Filter/Invert";

function Footer({ image }) {
  const [activeComponent, setActiveComponent] = useState("Effects"); // State to track active component

  return (
    <div
      className={`md:hidden flex flex-col-reverse bg-custom-header ease-in-out  w-full ${
        image ? "h-32" : "h-16"
      } relative border-t-orange-400 border-2`}
    >
      <div className="flex items-center justify-center w-full h-16">
        <div className="flex items-center justify-center gap-5">
          <EditorButton
            image={image}
            iconSrc={adjustIcon}
            text="Edit"
            onClick={() => setActiveComponent("Edit")}
          ></EditorButton>
          <EditorButton
            image={image}
            iconSrc={starIcon}
            text="Effects"
            onClick={() => setActiveComponent("Effects")}
          ></EditorButton>
        </div>
      </div>

      {image && (
        <div className="bg-custom-header overflow-x-auto overflow-y-hidden   h-16 w-full border-b-orange-400 border-2">
          <div
            className={`${activeComponent === "Effects" ? "flex" : "hidden"}`}
          >
            <Effects
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            />
          </div>
          <div className={`${activeComponent === "Edit" ? "flex" : "hidden"}`}>
            <Edit
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Edit>
          </div>

          <div className={`${activeComponent === "Hue" ? "flex" : "hidden"}`}>
            <Hue
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Hue>
          </div>

          <div className={`${activeComponent === "Alpha" ? "flex" : "hidden"}`}>
            <Alpha
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Alpha>
          </div>

          <div className={`${activeComponent === "Noise" ? "flex" : "hidden"}`}>
            <Noise
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Noise>
          </div>

          <div
            className={`${
              activeComponent === "Saturation" ? "flex" : "hidden"
            }`}
          >
            <Saturation
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Saturation>
          </div>

          <div
            className={`${
              activeComponent === "Temperature" ? "flex" : "hidden"
            }`}
          >
            <Temperature
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Temperature>
          </div>

          <div
            className={`${activeComponent === "Invert" ? "flex" : "hidden"}`}
          >
            <Invert
              setActiveComponent={setActiveComponent}
              mobileLayout={true}
            ></Invert>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
