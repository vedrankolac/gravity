import { hslToHex } from "../../../utils/colorUtils";

const colorComposer = () => {
  colorCompositionID = fxrand();
  const envMapIntensity = 1;

  // primitives

  const black = {
    color: hslToHex(0, 0, 0.04),
    envMapIntensity: envMapIntensity - 0.1
  };
  const white = {
    color: hslToHex(0, 0, 0.85),
    envMapIntensity: envMapIntensity - 0.1
  };

  const paleteGenerators = [];

  // palette tools

  const brightSaturation = () => fxrand() * 0.1 + 0.9;
  const strongSaturation = () => fxrand() * 0.2 + 0.8;
  const darkSaturation   = () => fxrand() * 0.4 + 0.2;

  const brightLightness = () => fxrand() * 0.35 + 0.5;
  const strongLightness = () => fxrand() * 0.3  + 0.2;
  const darkLightness   = () => fxrand() * 0.2  + 0.04;

  const brightTheme = [brightSaturation(), brightLightness()];
  const strongTheme = [strongSaturation(), strongLightness()];
  const darkTheme   = [darkSaturation(), darkLightness()];

  const themes = [
    brightTheme,
    strongTheme,
    darkTheme
  ]

  const getHueVariants = hue => {
    // 0.166 is equivalent to 60 degrees in the hue spectrum
    return [
      hue + 0.166 / 2,
      hue + 0.166,
      hue + 0.166 * 1.2,
      // hue + 0.166*2, // almost complement -- maybe to much for this env
      // initHue + 0.166*3 // complement -- maybe to much for this env
    ]
  }

  // const grayscaleBright = () => fxrand() * 0.1 + 0.92;
  // const grayscaleStrong = () => fxrand() * 0.3 + 0.1;
  // const grayscaleDark   = () => fxrand() * 0.02;

  const grayscaleBright = () => fxrand() * 0.35 + 0.5;
  const grayscaleStrong = () => fxrand() * 0.3  + 0.2;
  const grayscaleDark   = () => fxrand() * 0.2  + 0.0;

  const grayscaleThemes = [
    grayscaleBright(),
    grayscaleStrong(),
    grayscaleDark()
  ]

  // palettes

  const whiteBlackColor = () => {
    const themeSeed = fxrand();
    const themeIndex = Math.round((themes.length - 1) * themeSeed);
    const theme = themes[themeIndex];

    const a = black;
    const b = white;
    const c = {
      color: hslToHex(fxrand(), ...theme),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => fxrand() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
      bg: randomized[0],
    };
  }
  paleteGenerators.push(whiteBlackColor);

  const duoAndLightness = () => {
    const themeSeed = fxrand();
    const themeIndex = Math.round((themes.length - 1) * themeSeed);
    const theme = themes[themeIndex];

    const themeASeed = fxrand();
    const themeAIndex = Math.round((themes.length - 1) * themeASeed);
    const themeA = themes[themeAIndex];

    const themeBSeed = fxrand();
    const themeBIndex = Math.round((themes.length - 1) * themeBSeed);
    const themeB = themes[themeBIndex];

    const initHue = fxrand();
    const secondHueVariants = getHueVariants(initHue);
    const secondHueSeed = fxrand();
    const secondHueIndex = Math.round((secondHueVariants.length - 1) * secondHueSeed);
    const secondHue = secondHueVariants[secondHueIndex];

    const a = Math.round(fxrand()) ? white : black;
    const b = {
      color: hslToHex(initHue, ...themeA),
      envMapIntensity
    };
    const c = {
      color: hslToHex(secondHue, ...themeB),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => fxrand() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
      bg: randomized[0],
    };
  }
  paleteGenerators.push(duoAndLightness);

  const tripple = () => {
    const themeASeed = fxrand();
    const themeAIndex = Math.round((themes.length - 1) * themeASeed);
    const themeA = themes[themeAIndex];

    const themeBSeed = fxrand();
    const themeBIndex = Math.round((themes.length - 1) * themeBSeed);
    const themeB = themes[themeBIndex];

    const themeCSeed = fxrand();
    const themeCIndex = Math.round((themes.length - 2) * themeCSeed);
    const themeC = themes[themeCIndex];

    const initHue = fxrand();

    const secondHueVariants = getHueVariants(initHue);
    const secondHueSeed = fxrand();
    const secondHueIndex = Math.round((secondHueVariants.length - 1) * secondHueSeed);
    const secondHue = secondHueVariants[secondHueIndex];

    const thirdHueVariants = getHueVariants(secondHue);
    const thirdHueSeed = fxrand();
    const thirdHueIndex = Math.round((thirdHueVariants.length - 1) * thirdHueSeed);
    const thirdHue = thirdHueVariants[thirdHueIndex];

    const a = {
      color: hslToHex(initHue, ...themeA),
      envMapIntensity
    };
    const b = {
      color: hslToHex(secondHue, ...themeB),
      envMapIntensity
    };
    const c = {
      color: hslToHex(thirdHue, ...themeC),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => fxrand() - 0.5);

    const bg1 = black;
    const bg2 = white;
    const randomizedBg = [a,b,c,bg1,bg2].sort(() => fxrand() - 0.5);

    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
      bg: randomizedBg[0],
    };
  }
  paleteGenerators.push(tripple);

  const grayscale = () => {
    const themeASeed = fxrand();
    const themeAIndex = Math.round((grayscaleThemes.length - 1) * themeASeed);
    const themeA = grayscaleThemes[themeAIndex];

    const themeBSeed = fxrand();
    const themeBIndex = Math.round((grayscaleThemes.length - 1) * themeBSeed);
    const themeB = grayscaleThemes[themeBIndex];

    const themeCSeed = fxrand();
    const themeCIndex = Math.round((grayscaleThemes.length - 1) * themeCSeed);
    const themeC = grayscaleThemes[themeCIndex];

    const a = {
      color: hslToHex(0, 0, themeA),
      envMapIntensity
    };
    const b = {
      color: hslToHex(0, 0, themeB),
      envMapIntensity
    };
    const c = {
      color: hslToHex(0, 0, themeC),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => fxrand() - 0.5);

    const bg1 = black;
    const bg2 = white;
    const randomizedBg = [a,b,c,bg1,bg2].sort(() => fxrand() - 0.5);

    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
      bg: randomizedBg[0],
    };
  }
  paleteGenerators.push(grayscale);

  let colorConfig = null;
  let paleteName = null;

  if (colorCompositionID < 0.1) {
    // no color - 10%
    colorConfig = grayscale();
    paleteName = grayscale.name;
  } else if ((colorCompositionID => 0.1) && (colorCompositionID < 0.35)) {
    // one color - 25%
    colorConfig = whiteBlackColor();
    paleteName = whiteBlackColor.name;
  } else if ((colorCompositionID => 0.35) && (colorCompositionID < 0.75)) {
    // two colors - 40%
    colorConfig = duoAndLightness();
    paleteName = duoAndLightness.name;
  } else if ((colorCompositionID => 0.75) && (colorCompositionID < 1)) {
    // three colors - 25%
    colorConfig = tripple();
    paleteName = tripple.name;
  }
  // let colorConfig = grayscale();

  console.log('palette:  ', paleteName, colorCompositionID);
  return colorConfig;
}

export { colorComposer };
