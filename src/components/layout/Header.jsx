import Logo from "../site_logo/Logo";
import downArrowIcon from "../../assets/icon/icons8-down-arrow-30.png";
import DropDownButton from "../button/DropDownButton";
import UndoRedoButton from "../button/UndoRedoButton";
import ResetIcon from "../../assets/icon/icons8-reset-30.png";
import SaveIcon from "../../assets/icon/icons8-save-30.png";
import UploadIcon from "../../assets/icon/icons8-upload-30.png";
import HamburgerIcon from "../../assets/icon/icons8-hamburger-30.png";
import { useImageContext } from "../../context/ImageContext";
import { useEffect } from "react";

function Header() {
  const { resetFilters, setSaveImage } = useImageContext();

  const handleSave = () => {
    setSaveImage(true);
  };

  return (
    <header className="w-full h-16 relative bg-custom-header border-b-orange-400 border-2">
      <nav className="flex items-center px-5 justify-between w-full h-full">
        <div className="md:flex hidden">
          <Logo></Logo>
        </div>
        <div className="md:hidden flex">
          <UndoRedoButton iconSrc={HamburgerIcon}></UndoRedoButton>
        </div>
        <div className="hidden gap-4 md:flex">
          <DropDownButton
            iconSrc={downArrowIcon}
            text="Save"
            onClick={handleSave}
          ></DropDownButton>
        </div>
        <div className="flex md:hidden gap-4">
          <UndoRedoButton
            iconSrc={SaveIcon}
            onClick={handleSave}
          ></UndoRedoButton>
        </div>
        <div className="flex gap-4">
          <UndoRedoButton
            iconSrc={ResetIcon}
            text="Reset"
            onClick={resetFilters} // Add onClick handler for reset
          ></UndoRedoButton>
        </div>
      </nav>
    </header>
  );
}

export default Header;
