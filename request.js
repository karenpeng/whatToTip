import idx from 'idx';
import credential from './api-key';

const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${credential.key}`;

async function getVision(base64) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 10
              }
            ]
          }
        ]
      })
    };
     const response = await fetch(apiUrl, options);
     const responseJson = await response.json();
     return idx(responseJson, _ => _.responses[0]);
   } catch (error) {
     console.error(error);
   }
};

export default getVision;
