import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./utilities";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("handpose model loaded");
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Pegar propriedades dop video
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Setar altura e largura do video
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Setar altura e largura do video no canvas
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Deterctar
      const hand = await net.estimateHands(video);
      console.log("hand", hand);

      //Desenhar linhas
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  runHandPose();
  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </>
  );
};
export default App;
