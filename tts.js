const axios = require('axios');
const fs = require('fs');
const path = require('path');
const  { ElevenLabsClient } = require("elevenlabs");
// const OpenAI = require('openai');

// const openai = new OpenAI();



// src/app.ts


async function tts() {
  const speechFile = path.resolve("./speech.mp3");
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}


async function convertTextToSpeech(text) {
   

const elevenlabs = new ElevenLabsClient({
  apiKey: "3f22151d78593ad0a387e18fd70e5ff0" 
})

const audio = await elevenlabs.generate({
  voice: "Rachel",
  text: text,
});

const fileName = `output.mp3`;
const fileStream = fs.createWriteStream(fileName);

audio.pipe(fileStream);

    // const data = {
    //     text: text,
    //     voice_settings: {
    //       stability: 1,
    //       similarity_boost: 1,
    //     }
    //   };
      
    //   const config = {
    //     method: 'post',
    //     url: 'https://api.elevenlabs.io/v1/text-to-speech/3gsg3cxXyFLcGIfNbM6C',
    //     headers: { 
    //       'xi-api-key': '3f22151d78593ad0a387e18fd70e5ff0',
    //       'Content-Type': 'application/json'
    //     },
    //     data: data
    //   };
      
    //   await axios(config)
    //     .then(response => {
    //         console.log(response);
    //         const outputFilePath = 'output.mp3';
    //         fs.readFile(response.data, (err, data) => {
    //             if (err) {
    //                 console.error('Error reading file', err);
    //                 return;
    //             }

    //             fs.writeFile(outputFilePath, data, (err) => {
    //                 if (err) {
    //                     console.error('Error writing file', err);
    //                     return;
    //                 }
    //                 console.log('File successfully written to', outputFilePath);
    //             });
    //         });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
}

    
exports.convertTextToSpeech = convertTextToSpeech;
