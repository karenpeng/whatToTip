import {
  ImageEditor,
  ImageStore,
  PixelRatio
} from 'react-native';
import promisify from './promisify';

const SCALE_FACTOR = 2;

const cropImage = promisify(ImageEditor.cropImage);
const getBase64ForTag = promisify(ImageStore.getBase64ForTag);

const cropImageAndGetBase64 = async(data, boxData) => {
  const { width, height, uri } = data;
  if (!Number.isInteger(width) || !Number.isInteger(height) || typeof uri !== 'string' || !uri.length) {
    return;
  }
  const { SCANNER_WIDTH, SCANNER_HEIGHT, SCANNER_LEFT, SCANNER_TOP } = boxData;
  const w = Math.round(PixelRatio.getPixelSizeForLayoutSize(SCANNER_WIDTH) * SCALE_FACTOR);
  const h = Math.round(PixelRatio.getPixelSizeForLayoutSize(SCANNER_HEIGHT) * SCALE_FACTOR);

  try {
    const cropImageUri = await cropImage(uri, {
      offset: {
        x: width * SCANNER_LEFT,
        y: height * SCANNER_TOP,
      },
      size: {
        width: w,
        height: h,
      }
    });
    ImageStore.removeImageForTag(uri);
    const base64 = await getBase64ForTag(cropImageUri);
    ImageStore.removeImageForTag(cropImageUri);
    return base64;
  } catch(error) {
    console.log(error);
  }
};

export default cropImageAndGetBase64;
