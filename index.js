const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const { getQuestions } = require('./questions');
const { getResponses } = require('./responses');
const { convertTextToSpeech } = require('./tts');
const mlaw = require('alawmulaw');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

let questions = [];

(async () => {
  const unparsedQuestions = await getQuestions();
  questions = unparsedQuestions.data.data;
})();

let currentQuestionIndex = 0;
const responses = [];

app.post('/ivr', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    const gather = twiml.gather({
      input: currentQuestion.type === 'TextInput' ? 'speech' : 'dtmf',
      numDigits: 1,
      action: '/survey',
      method: 'POST',
    });
    // await convertTextToSpeech(currentQuestion.rtxt);
    gather.play('https://auburn-llama-2840.twil.io/assets/ElevenLabs_2024-06-04T06_53_13_Paul_pre_s50_sb75_se0_b_m2.wav'); 
    twiml.redirect('/ivr');
    res.type('text/xml');
    res.send(twiml.toString());
  } else {
    twiml.say('Thank you for completing the survey.');
    twiml.hangup();
    console.log(responses);
    result = await getResponses(responses);
    console.log(result);
    res.type('text/xml');
    res.send(twiml.toString());
  }
});

app.post('/survey',  (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const userInput = req?.body?.SpeechResult|| req?.body?.Digits;

  const currentQuestion = questions[currentQuestionIndex];
  responses.push({ question_id: currentQuestion.id ,answer : userInput})

  currentQuestionIndex++;

  twiml.say('Thank you for your response.');
  twiml.redirect('/ivr');
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
