import {
  ImageEditor,
  ImageStore,
  PixelRatio
} from 'react-native';

export const BOX_WIDTH = 140;
export const BOX_HEIGHT = 60;
const SCALE_FACTOR = 2;

const deleteImage = (uri) => {
  ImageStore.removeImageForTag(uri);
};

const getBase64 = (uri, cb) => {
  ImageStore.getBase64ForTag(
    uri,
    base64 => {
      cb(base64);
      deleteImage(uri);
    },
    error => console.log(error.message)
  )
};

const cropImage = (data, cb) => {
  const { width, height, uri } = data;
  if (!Number.isInteger(width) || !Number.isInteger(height) || typeof uri !== 'string' || !uri.length) {
    return;
  }
  const w = Math.round(PixelRatio.getPixelSizeForLayoutSize(BOX_WIDTH) * SCALE_FACTOR);
  const h = Math.round(PixelRatio.getPixelSizeForLayoutSize(BOX_HEIGHT) * SCALE_FACTOR);
  ImageEditor.cropImage(
    uri,
    {
      offset: {
        x: (width - w) * 0.5,
        y: (height - h) * 0.5,
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

export default cropImage;
