import React, { useEffect, useRef, useState } from 'react';
import * as mpPose from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import calculateAngle from '../utils/calculateAngle';

const CameraFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counterLeft, setCounterLeft] = useState(0);
  const [counterRight, setCounterRight] = useState(0);
  const [counter, setCounter] = useState(0);
  const [stageLeft, setStageLeft] = useState(null);
  const [stageRight, setStageRight] = useState(null);
  const [stage, setStage] = useState(null);

  useEffect(() => {
    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    function onResults(results) {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(
        results.image, 0, 0, canvasRef.current.width, canvasRef.current.height
      );

      if (results.poseLandmarks) {
        // Draw pose landmarks and connections
        drawLandmarks(canvasCtx, results.poseLandmarks, mpPose.POSE_CONNECTIONS);

        const leftShoulder = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const leftElbow = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_ELBOW];
        const leftWrist = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const rightShoulder = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const rightElbow = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_ELBOW];
        const rightWrist = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];

        const angleLeft = calculateAngle(leftShoulder, leftElbow, leftWrist);
        const angleRight = calculateAngle(rightShoulder, rightElbow, rightWrist);

        if (angleLeft > 160) setStageLeft('Down');
        if (angleLeft < 30 && stageLeft === 'Down') {
          setStageLeft('Up');
          setCounterLeft(counterLeft + 1);
        }

        if (angleRight > 160) setStageRight('Down');
        if (angleRight < 30 && stageRight === 'Down') {
          setStageRight('Up');
          setCounterRight(counterRight + 1);
        }

        if (angleLeft < 30 && angleRight < 30 && stage === 'Down') {
          setStage('Up');
          setCounter(counter + 1);
        } else if (angleLeft > 160 && angleRight > 160) {
          setStage('Down');
        }

        canvasCtx.font = '20px Arial';
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillText(`Left Pushups: ${counterLeft}`, 10, 30);
        canvasCtx.fillText(`Right Pushups: ${counterRight}`, 10, 60);
        canvasCtx.fillText(`Total Pushups: ${counter}`, 10, 90);
      }

      canvasCtx.restore();
    }

    function drawLandmarks(ctx, landmarks, connections) {
      for (let i = 0; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        ctx.beginPath();
        ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }

      if (connections) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        for (let connection of connections) {
          const [startIdx, endIdx] = connection;
          const startLandmark = landmarks[startIdx];
          const endLandmark = landmarks[endIdx];
          ctx.beginPath();
          ctx.moveTo(startLandmark.x * canvasRef.current.width, startLandmark.y * canvasRef.current.height);
          ctx.lineTo(endLandmark.x * canvasRef.current.width, endLandmark.y * canvasRef.current.height);
          ctx.stroke();
        }
      }
    }
  }, [counter, counterLeft, counterRight, stage, stageLeft, stageRight]);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '640px',
          height: '480px',
          display: 'block',
        }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '640px',
          height: '480px',
        }}
      />
    </div>
  );
};

export default CameraFeed;
