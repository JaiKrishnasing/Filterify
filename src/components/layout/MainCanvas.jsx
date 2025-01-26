import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import p5 from "p5";
import IllustrationBox from "../misc/IllustrationBox";
import { useImageContext } from "../../context/ImageContext";
import { Filters } from "../../helpers/Filters";
import { fetchEmojis } from "../../services/emojiService";
import { randomNumberBetween } from "../../helpers/utils";
import carImage from "../../assets/images/car.jpg";
import PikachuImage from "../../assets/images/PIKA.jpg";
import TreeImage from "../../assets/images/TREE.jpg";

function MainCanvas({ setImage, image }) {
  const canvasRef = useRef(null);
  const p5Instance = useRef(null);
  const {
    filters,
    text,
    customFilters,
    saveImage,
    setSaveImage,
    chosenImageIndex,
  } = useImageContext();
  const [emojiSrc, setEmojiSrc] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [originalImage, setOriginalImage] = useState(null);

  const defaultImageArray = [carImage, PikachuImage, TreeImage];

  useEffect(() => {
    if (chosenImageIndex !== null) {
      setImage(defaultImageArray[chosenImageIndex]);
    }
  }, [chosenImageIndex, setImage]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setImage(imageUrl);
    },
  });

  // Fetch emojis from the API
  useEffect(() => {
    fetchEmojis().then((emojis) => setEmojiSrc(emojis));
  }, []);

  // Update the current emoji and generate positions when the `emoji` filter is toggled on
  useEffect(() => {
    if (filters.emoji && emojiSrc.length > 0 && image) {
      const randomIndex = Math.floor(Math.random() * emojiSrc.length);
      setCurrentEmoji(emojiSrc[randomIndex]);

      const img = new Image();
      img.src = image;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const newEmojis = generateEmojiPositions(imgWidth, imgHeight);
        setEmojis(newEmojis);
      };
    }
  }, [filters.emoji, emojiSrc, image]);

  // Function to generate emoji positions
  const generateEmojiPositions = (imgWidth, imgHeight) => {
    const MIN_AMOUNT_EMOJIS = 10;
    const MAX_AMOUNT_EMOJIS = 50;
    const randomNumber = randomNumberBetween(
      MIN_AMOUNT_EMOJIS,
      MAX_AMOUNT_EMOJIS
    );
    const circleCenterX = imgWidth / 2;
    const circleCenterY = imgHeight / 2;
    const circleRadius = Math.min(imgWidth, imgHeight) / 2;

    const emojis = [];
    for (let i = 0; i < randomNumber; i++) {
      const angle = (i / randomNumber) * Math.PI * 2;
      const randomX = circleCenterX + circleRadius * Math.cos(angle);
      const randomY = circleCenterY + circleRadius * Math.sin(angle);
      emojis.push({ x: randomX, y: randomY });
    }

    return emojis;
  };

  useEffect(() => {
    if (saveImage && p5Instance.current) {
      p5Instance.current.saveCanvas("myCanvas", "png");
      setSaveImage(false);
    }
  }, [saveImage, setSaveImage]);

  useEffect(() => {
    const sketch = (p) => {
      let img;
      let filterInstance;

      p.setup = () => {
        p.createCanvas(400, 400);
        p.textFont("Noto Color Emoji");
        p.textSize(25);

        if (image) {
          img = p.loadImage(image, () => {
            const aspectRatio = img.width / img.height;
            let newWidth = img.width;
            let newHeight = img.height;

            if (newWidth > p.windowWidth * 0.75) {
              newWidth = p.windowWidth * 0.75;
              newHeight = newWidth / aspectRatio;
            }

            if (newHeight > p.windowHeight * 0.75) {
              newHeight = p.windowHeight * 0.75;
              newWidth = newHeight * aspectRatio;
            }

            filterInstance = new Filters();
            filterInstance.storeOriginalPixels(img);
            setOriginalImage(img);

            p.resizeCanvas(newWidth, newHeight);
          });
        }
      };

      p.draw = () => {
        p.background(255);

        if (img) {
          filterInstance.resetToOriginal(img);

          if (filtersChangedExcludingEmoji()) {
            filterInstance.applyFilters(img, filters);
          }

          p.image(img, 0, 0, p.width, p.height);
        }

        if (filters.emoji && currentEmoji) {
          drawEmojis(p);
        }

        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(text, p.width / 2, p.height / 2);
      };

      const drawEmojis = (p) => {
        for (const emoji of emojis) {
          p.text(currentEmoji, emoji.x, emoji.y);
        }
      };

      const filtersChangedExcludingEmoji = () => {
        const defaultFilters = {
          alpha: 255,
          saturation: 100,
          hue: 0,
          invert: false,
          noiseIntensity: 0,
          temperature: -70,
        };

        const currentFiltersExcludingEmoji = { ...filters };
        delete currentFiltersExcludingEmoji.emoji;

        return (
          JSON.stringify(currentFiltersExcludingEmoji) !==
          JSON.stringify(defaultFilters)
        );
      };
    };

    if (!p5Instance.current && image) {
      p5Instance.current = new p5(sketch, canvasRef.current);
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [image, filters, text, currentEmoji, emojis]);

  return (
    <div
      className="bg-custom-canvas h-full flex-1 flex items-center justify-center"
      {...getRootProps()}
    >
      {!image && <input {...getInputProps()} />}
      <div ref={canvasRef}></div>
      {!image && <IllustrationBox />}
    </div>
  );
}

export default MainCanvas;
