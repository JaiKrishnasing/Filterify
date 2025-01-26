function FilterButton({ iconSrc, name, onClick, mobileLayout = false }) {
  return (
    <div
      className={`bg-custom-button ${
        mobileLayout ? "w-[200px] shrink-0" : "w-full"
      } flex rounded-md cursor-pointer hover:bg-neutral-700 transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <img
        src={iconSrc}
        className={`${mobileLayout ? "scale-50" : "scale-75"}`}
      ></img>
      <button
        className={`text-white ${
          mobileLayout ? "text-xs" : "text-sm"
        } font-bold p-2 cursor-pointer`}
      >
        {name}
      </button>
    </div>
  );
}

export default FilterButton;
