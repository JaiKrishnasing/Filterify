function UndoRedoButton({ text, iconSrc, onClick }) {
  return (
    <button
      title={text}
      className="p-1 text-white rounded-lg gap-2 bg-custom-button cursor-pointer hover:bg-neutral-700 flex items-center transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <img src={iconSrc} alt={text} className="scale-75"></img>
    </button>
  );
}

export default UndoRedoButton;
