import LogoImage from "../../assets/flaticon.png";

function Logo() {
  const siteName = "Filterify";
  const colorClasses = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-yellow-500",
    "text-pink-500",
    "text-purple-500",
    "text-teal-500",
    "text-orange-500",
    "text-lime-500",
  ];

  return (
    <div className="flex items-center select-none">
      {siteName
        .toUpperCase()
        .split("")
        .map((char, index) => (
          <p
            key={index}
            className={`${colorClasses[index]} text-2xl font-extrabold font-sans`}
          >
            {char}
          </p>
        ))}
    </div>
  );
}

export default Logo;
