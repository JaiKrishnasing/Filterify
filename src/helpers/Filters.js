// Alle Filters van de website
// staan in dit bestand

export class Filters {
  constructor() {
    // Slaat de originele pixeldata op
    this.originalPixels = null;
    this.noisePixels = null;
  }

  // Slaat de originele pixeldata op van de afbeelding
  storeOriginalPixels(img) {
    img.loadPixels();
    this.originalPixels = new Uint8Array(img.pixels);
  }

  // Zet de afbeelding terug naar de originele pixels 
  resetToOriginal(img) {
    if (!this.originalPixels) return;

    img.loadPixels();
    img.pixels.set(this.originalPixels);
    img.updatePixels();
  }

  // Past de opgegeven filters toe aan de afbeelding
  applyFilters(img, filters) {
    if (!this.originalPixels) return;
    img.loadPixels();
    const pixels = img.pixels;

    if (filters.noiseIntensity !== undefined && !this.noisePixels) {
      this.noisePixels = new Uint8Array(pixels.length);
      for (let i = 0; i < this.noisePixels.length; i += 4) {
        this.noisePixels[i] = this.random(
          -filters.noiseIntensity,
          filters.noiseIntensity
        );
        this.noisePixels[i + 1] = this.random(
          -filters.noiseIntensity,
          filters.noiseIntensity
        );
        this.noisePixels[i + 2] = this.random(
          -filters.noiseIntensity,
          filters.noiseIntensity
        );
        this.noisePixels[i + 3] = 0;
      }
    }

    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      // Pas alpha filter toe
      if (filters.alpha !== undefined) {
        a = filters.alpha;
      }

      // Pas saturation filter toe
      if (filters.saturation !== undefined) {
        const [h, s, l] = this.rgbToHsl(r, g, b);
        [r, g, b] = this.hslToRgb(h, filters.saturation / 100, l / 100);
      }

      // Pas hue filter toe
      if (filters.hue !== undefined) {
        const [h, s, l] = this.rgbToHsl(r, g, b);
        [r, g, b] = this.hslToRgb(filters.hue, s / 100, l / 100);
      }

      // Pas temperature filter toe
      if (filters.temperature !== undefined) {
        r = this.constrain(r + filters.temperature, 0, 255);
        b = this.constrain(b - filters.temperature, 0, 255);
      }

      // Pas invert filter toe
      if (filters.invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      // Pas random noise filter toe
      if (filters.noiseIntensity !== undefined && this.noisePixels) {
        r = this.constrain(r + this.noisePixels[i], 0, 255);
        g = this.constrain(g + this.noisePixels[i + 1], 0, 255);
        b = this.constrain(b + this.noisePixels[i + 2], 0, 255);
      }

      // Update de pixelwaarde
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
      pixels[i + 3] = a;
    }

    img.updatePixels();
  }

  // Hulp functies
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);

    const d = cMax - cMin;

    let h, s, l;

    l = (cMax + cMin) / 2;

    if (d === 0) {
      h = s = 0;
    } else {
      s = d / (1 - Math.abs(2 * l - 1));
    }

    switch (cMax) {
      case r:
        h = 60 * (((g - b) / d) % 6);
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      case b:
        h = 60 * ((r - g) / d + 4);
        break;
    }

    h = (h + 360) % 360;

    return [h, s * 100, l * 100];
  }

  hslToRgb(h, s, l) {
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;

    let r, g, b;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }

  // Willekeurig getal functie
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Beperkt een waarde tot een bereik
  constrain(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
