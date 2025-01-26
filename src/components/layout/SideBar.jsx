import { useState } from "react";
import EditorButton from "../button/EditorButton";
import imageIcon from "../../assets/icon/icons8-image-30.png";
import adjustIcon from "../../assets/icon/icons8-adjust-30.png";
import starIcon from "../../assets/icon/icons8-stars-30.png";
import borderIcon from "../../assets/icon/icons8-border-30.png";
import textIcon from "../../assets/icon/icons8-text-30.png";
import Edit from "../Editor/Edit";
import Hue from "../Filter/Hue";
import Temperature from "../Filter/Temperature";
import Alpha from "../Filter/Alpha";
import Saturation from "../Filter/Saturation";
import Invert from "../Filter/Invert";
import Noise from "../Filter/Noise";
import Effects from "../Editor/Effects";
import Emoji from "../Filter/Emoji";

function SideBar({ image }) {
  const [activeComponent, setActiveComponent] = useState("Effects"); // State to track active component

  return (
    <div className="flex h-full">
      <div
        className={`bg-custom-header hidden md:flex justify-center transition-all duration-300 w-16 ease-in-out h-full 
            ${image ? "group hover:w-32" : "w-16"}
            border-r-orange-400 border-2`}
      >
        <div className="py-4 px-2 flex flex-col gap-7">
          <EditorButton
            image={image}
            iconSrc={adjustIcon}
            text="Edit"
            onClick={() => setActiveComponent("Edit")} // Go to Edit
          />
          <EditorButton
            image={image}
            iconSrc={starIcon}
            text="Effects"
            onClick={() => setActiveComponent("Effects")} // Go to Effects
          />
        </div>
      </div>

      {image && (
        <div
          className={`bg-custom-header hidden md:flex h-full w-56 transition-all pl-2 duration-300 border-r-orange-400 border-2 overflow-hidden relative`}
        >
          {/* Edit Component */}
          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Edit" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Edit setActiveComponent={setActiveComponent} />
          </div>

          {/* Effects Component */}
          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Effects"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <Effects setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Emoji" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Emoji setActiveComponent={setActiveComponent} />
          </div>

          {/* Other Filter Components */}
          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Hue" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Hue setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Temperature"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <Temperature setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Alpha" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Alpha setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Saturation"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <Saturation setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Invert"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <Invert setActiveComponent={setActiveComponent} />
          </div>

          <div
            className={`w-full absolute inset-0 transition-transform duration-300 ease-in-out ${
              activeComponent === "Noise" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Noise setActiveComponent={setActiveComponent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
