import credential from './api-key';

const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${credential.key}`;

async function getVision(base64) {
  try {
    const options = {
      method: 'POST',
      payload: {
        requests: [
          {
            image: {
              content: base64
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                languageHints: 'en',
                maxResults: 10
              }
            ]
          }
        ]
      }
    };
     const response = await fetch(apiUrl, options);
     const responseJson = await response.json();
     console.log(responseJson)
     return response;
   } catch (error) {
     console.error(error);
   }
};

export default getVision;
