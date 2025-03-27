// heic-convert.js
// Converts HEIC images to JPEG using heic-convert library

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Install required dependencies if not present
try {
  require.resolve('heic-convert');
} catch (e) {
  console.log('Installing heic-convert library...');
  execSync('npm install heic-convert');
}

// For non-HEIC images, we'll still use Sharp
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing Sharp library...');
  execSync('npm install sharp');
}

const heicConvert = require('heic-convert');
const sharp = require('sharp');

// Configuration
const SOURCE_DIR = './public/images/alchemyrg/largeabstracts';
const OUTPUT_DIR = './public/images/alchemyrg/optimized';
const QUALITY = 80; // JPEG quality
const FORMAT = 'jpg';

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directory created or already exists: ${dirPath}`);
  } catch (err) {
    console.error(`Error creating directory ${dirPath}:`, err);
    throw err;
  }
}

async function getFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.heic', '.heif'].includes(ext);
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    throw err;
  }
}

async function convertHeicToJpeg(inputPath, outputPath) {
  try {
    // Read the HEIC file
    const inputBuffer = await fs.readFile(inputPath);
    
    // Convert to JPEG
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: QUALITY
    });
    
    // Write the JPEG file
    await fs.writeFile(outputPath, outputBuffer);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    return { size: stats.size / 1024 };
  } catch (err) {
    console.error(`Error converting HEIC image ${inputPath}:`, err);
    throw err;
  }
}

async function convertNormalImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    return { size: stats.size / 1024 };
  } catch (err) {
    console.error(`Error converting image ${inputPath}:`, err);
    throw err;
  }
}

async function main() {
  try {
    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);
    
    // Get all image files
    const files = await getFiles(SOURCE_DIR);
    console.log(`Found ${files.length} images to convert.`);
    
    // Track successful conversions
    const successfulConversions = [];
    
    // Process each file
    for (const file of files) {
      const inputPath = path.join(SOURCE_DIR, file);
      const outputFileName = `${path.parse(file).name}.${FORMAT}`;
      const outputPath = path.join(OUTPUT_DIR, outputFileName);
      
      console.log(`Converting ${file} to ${outputFileName}...`);
      
      try {
        // Choose conversion method based on file extension
        const ext = path.extname(file).toLowerCase();
        let result;
        
        if (ext === '.heic' || ext === '.heif') {
          result = await convertHeicToJpeg(inputPath, outputPath);
        } else {
          result = await convertNormalImage(inputPath, outputPath);
        }
        
        console.log(`Saved to ${outputPath} (${result.size.toFixed(2)}KB)`);
        successfulConversions.push(outputFileName);
      } catch (err) {
        console.log(`Failed to convert ${file}: ${err.message}`);
        // Try alternative method if first method fails
        try {
          if (ext === '.heic' || ext === '.heif') {
            console.log(`Trying alternative method for ${file}...`);
            // Try using sips command on macOS
            if (process.platform === 'darwin') {
              execSync(`sips -s format jpeg "${inputPath}" --out "${outputPath}" --setProperty formatOptions ${QUALITY}`);
              const stats = await fs.stat(outputPath);
              console.log(`Saved to ${outputPath} using sips (${(stats.size / 1024).toFixed(2)}KB)`);
              successfulConversions.push(outputFileName);
            } else {
              console.log(`No alternative method available for ${file} on this platform.`);
            }
          }
        } catch (altErr) {
          console.log(`Alternative method also failed for ${file}`);
        }
      }
    }
    
    console.log(`\nConverted ${successfulConversions.length} out of ${files.length} images.`);
    
    if (successfulConversions.length > 0) {
      console.log('\nHere is the array of optimized image paths for your slideshow:');
      const imagePaths = successfulConversions.map(file => `"./public/images/alchemyrg/optimized/${file}"`);
      console.log(`const artworks = [\n  ${imagePaths.join(',\n  ')}\n];`);
    } else {
      console.log('No images were successfully converted.');
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

main();