import { Accelerometer } from "react-native-sensors";

const MOTION_SHREHOLD = 1.4;
const MOTION_DETECT_INTERVAL = 200;
const STILL_FOR = 6;

const isBelowShrehold = (a, b) => Math.abs(a - b) < MOTION_SHREHOLD;

class MovementDetector {
  constructor() {
    this.previous = {
      x: 100000,
      y: 100000,
      z: 100000,
    };
    this.counter = 0;
  }

  isStill(current) {
    const copy = this.previous;
    this.previous = current;
    const { x, y, z } = current;
    const { x:xPre, y:yPre, z:zPre } = copy;
    if (isBelowShrehold(x, xPre) &&
        isBelowShrehold(y, yPre) &&
        isBelowShrehold(z, zPre)) {
      this.counter++;
    } else {
      this.counter = 0;
    }
    return this.counter > STILL_FOR;
  }
}

const detector = new MovementDetector();
let accelerationObservable = null;

export const registerAccelerometerEvent = cb =>
  new Accelerometer({
    updateInterval: MOTION_DETECT_INTERVAL // defaults to 100ms
  })
  .then(observable => {
    accelerationObservable = observable;
    // Normal RxJS functions
    accelerationObservable
      .filter(speed => detector.isStill(speed))
      .subscribe(data => {
        cb && cb();
      });
  })
  .catch(error => {
    console.log('The sensor is not available');
  });


export default accelerationObservable;
