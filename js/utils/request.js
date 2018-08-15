import idx from 'idx';
import constants from '../../constants';

const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${constants.apiKey}`;

const getVisionResult = async(base64) => {
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
            content: base64,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 10,
            }
          ]
        }
      ]
    })
  };
  try {
    const response = await fetch(apiUrl, options);
    const responseJson = await response.json();
    const result = idx(responseJson, _ => _.responses[0].fullTextAnnotation.text);
    return result;
  } catch(error){
   console.error(error);
  };
};

export default getVisionResult;
