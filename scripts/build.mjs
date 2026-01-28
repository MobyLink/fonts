import { fontSplit } from 'cn-font-split';
import fs from 'fs-extra';
import path from 'path';

const fonts = [
  {
    name: 'Fredoka',
    src: 'assets/Fredoka.ttf',
    family: 'Fredoka',
  },
  {
    name: 'ZCOOLQingKeHuangYou',
    src: 'assets/ZCOOLQingKeHuangYou.ttf',
    family: 'ZCOOLQingKeHuangYou',
  },
  {
    name: 'KingHwaOldSong',
    src: 'assets/KingHwaOldSong.ttf',
    family: 'KingHwaOldSong',
  },
  {
    name: 'Xiaolai',
    src: 'assets/Xiaolai.ttf',
    family: 'Xiaolai',
  },
];

const buildDir = path.resolve('build');
const fontsDir = path.join(buildDir, 'fonts');
const cssDir = path.join(buildDir, 'css');

// Ensure directories exist
await fs.ensureDir(fontsDir);
await fs.ensureDir(cssDir);

const importRules = [];

for (const font of fonts) {
  console.log(`Processing ${font.name}...`);

  const fontDest = path.join(fontsDir, font.name);
  await fs.emptyDir(fontDest); // Clean font dir

  // Run font-split
  await fontSplit({
    input: font.src,
    outDir: fontDest,
    css: {
      fontFamily: font.family,
    },
    // css: {
    //     fontFamily: font.family,
    //     fontWeight: 400, // Default, can be adjusted if needed
    // },
    // targetType: 'woff2',
    // Compress settings can be added here if needed
    // chunkSize: 70 * 1024, // 70kb
    // testHTML: false,
    // reporter: false,
    // preview: false
  });

  // Handle CSS
  // cn-font-split generates a result.css (or similar name, usually based on font family or generic)
  // We need to find the css file in the output.
  const files = await fs.readdir(fontDest);
  const cssFile = files.find((f) => f.endsWith('.css'));

  if (cssFile) {
    let cssContent = await fs.readFile(path.join(fontDest, cssFile), 'utf-8');

    // Adjust paths
    // The generated CSS assumes fonts are adjacent.
    // We are moving CSS to build/css/, but fonts stay in build/fonts/<FontName>/
    // So ./ needs to become ../fonts/<FontName>/

    // Simple replace for url('./ -> url('../fonts/${font.name}/
    // We use regex to be safe about quotes.
    cssContent = cssContent.replace(
      /url\(['"]\.\/([^'"]+)['"]\)/g,
      `url('../fonts/${font.name}/$1')`,
    ); // Handle ./file
    cssContent = cssContent.replace(/url\(['"]([^'"]+)['"]\)/g, (match, p1) => {
      // If it doesn't start with ./ or ../, it might be just filename
      if (!p1.startsWith('.')) {
        return `url('../fonts/${font.name}/${p1}')`;
      }
      return match;
    });

    // Save individual CSS
    await fs.outputFile(path.join(cssDir, `${font.name}.css`), cssContent);

    // Add import rule
    importRules.push(`@import url('${font.name}.css');`);
  } else {
    console.error(`Warning: No CSS generated for ${font.name}`);
  }
}

// Write combined css with imports
const finalCss = importRules.join('\n');
await fs.outputFile(path.join(cssDir, 'fonts.min.css'), finalCss);

console.log('Build complete!');
