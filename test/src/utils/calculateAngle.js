//어깨, 팔꿈치, 손목의 위치를 받아셔 팔꿈치에서의 각도를 계산

// tensorflow JS로 테스트
// 텐서플로 js는 머신러닝에 특화된 애라서 미디어파이프보다 성능이 떨어진다고 함
// import * as tf from '@tensorflow/tfjs'

// const calculateAngle = (a, b, c) => {
//   const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
//   let angle = Math.abs((radians * 180.0) / Math.PI);
//   if (angle > 180.0) {
//     angle = 360 - angle;
//   }
//   return angle;
// };

// export default calculateAngle

//  mediapipe 사용
const calculateAngle = (a, b, c) => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
};

export default calculateAngle
