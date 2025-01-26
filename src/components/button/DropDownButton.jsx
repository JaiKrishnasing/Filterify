function DropDownButton({ text, iconSrc, onClick }) {
  return (
    <button
      className="py-2 px-3 text-white rounded-lg gap-2 bg-custom-button cursor-pointer hover:bg-neutral-700 flex items-center transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      {text}
      <img src={iconSrc} alt="Arrow" />
    </button>
  );
}

export default DropDownButton;
