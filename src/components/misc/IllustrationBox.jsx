import Illustration from "../../assets/Illustrations/open-doodles-clumsy-man-dropping-documents-and-files.svg";
import carImage from "../../assets/images/car.jpg";
import PikachuImage from "../../assets/images/PIKA.jpg";
import TreeImage from "../../assets/images/TREE.jpg";
import { useImageContext } from "../../context/ImageContext";

function IllustrationBox() {
  const { setChosenImageIndex } = useImageContext(); // Access setChosenImageIndex
  const imageArray = [carImage, PikachuImage, TreeImage];

  return (
    <div className="flex flex-col gap-4 items-center p-2">
      <div>
        <img src={Illustration} height={300} width={300} alt="Illustration" />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <p className="font-2xl text-white font-bold">Drop your image here!</p>
        </div>
        <div className="flex items-center m-0 p-0 justify-between w-full my-4">
          <div className="bg-orange-400 h-1 flex-grow min-w-[50px]"></div>
          <p className="px-4 text-sm font-medium text-white whitespace-nowrap">
            OR USE ONE OF THESE
          </p>
          <div className="bg-orange-400 h-1 flex-grow min-w-[50px]"></div>
        </div>
        <div className="flex flex-row gap-2">
          {imageArray.map((image, index) => (
            <button
              key={index}
              className="cursor-pointer"
              onClick={() => setChosenImageIndex(index)}
            >
              <img
                src={image}
                className="w-[100px] h-[100px] object-cover"
                alt={`Image ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IllustrationBox;
