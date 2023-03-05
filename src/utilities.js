export const drawHand = (predictions, ctx) => {
  console.log('rteste')
  if(predictions.length > 0) {
    predictions.forEach((prediction) => {

      const landmarks = prediction.landmarks
      for (let i = 0; i < landmarks.length; i++) {
         // Pegar eixo x 
         const x = landmarks[i][0]
         //Pegar eixo y
         const y = landmarks[i][1]

         // Desenhar linhas
         ctx.beginPath()
         ctx.arc(x,y , 5, 0 ,3*Math.PI)

         //Definir  a  color da linha
         ctx.fillStyle = "indigo"
         ctx.fill()
      }
    })
  }
}