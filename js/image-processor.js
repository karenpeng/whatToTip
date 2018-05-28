import {
  ImageEditor,
  ImageStore,
  PixelRatio
} from 'react-native';

const SCALE_FACTOR = 2;

const deleteImage = (uri) => {
  ImageStore.removeImageForTag(uri);
};

const getBase64 = (uri, cb) => {
  ImageStore.getBase64ForTag(
    uri,
    base64 => {
      cb && cb(base64);
      deleteImage(uri);
    },
    error => console.log(error.message)
  )
};

const cropImageAndGetBase64 = (data, boxData, cb) => {
  const { width, height, uri } = data;
  if (!Number.isInteger(width) || !Number.isInteger(height) || typeof uri !== 'string' || !uri.length) {
    return;
  }
  const { BOX_WIDTH, BOX_HEIGHT, BOX_LEFT, BOX_TOP } = boxData;
  const w = Math.round(PixelRatio.getPixelSizeForLayoutSize(BOX_WIDTH) * SCALE_FACTOR);
  const h = Math.round(PixelRatio.getPixelSizeForLayoutSize(BOX_HEIGHT) * SCALE_FACTOR);
  ImageEditor.cropImage(
    uri,
    {
      offset: {
        x: width * BOX_LEFT,
        y: height * BOX_TOP,
      },
      size: {
        width: w,
        height: h,
      }
    },
    successUri => {
      getBase64(successUri, cb);
      deleteImage(uri);
    },
    error => console.log(error.message)
  )
};

export default cropImageAndGetBase64;
