function EditorButton({ iconSrc, text, image, onClick }) {
  return (
    <div
      className={`flex items-center rounded-md p-1 gap-2 hover:bg-neutral-700 transition-all duration-300 ease-in-out ${
        image ? "cursor-pointer" : "cursor-not-allowed"
      } group`}
      onClick={image ? onClick : undefined} // Trigger onClick only if image is available
    >
      <img src={iconSrc} width={25} alt="icon" />

      {/* Show text only when hovered and image is available */}
      {image && (
        <p
          className="text-white text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out"
          style={{ whiteSpace: "nowrap" }}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default EditorButton;
