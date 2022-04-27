import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import {BASE_URL} from '@env';

const launchSNSMobileSDK = (accessToken, userToken) => {
  let snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
    return fetch(`${BASE_URL}/api/v2/sumsubAccesToken`, {
      method: 'POST',
      body: {
        userToken,
      },
    }).then(resp => {
      return resp.data.token;
    });
  })
    .withHandlers({
      onStatusChanged: event => {
        console.log(
          'onStatusChanged: [' +
            event.prevStatus +
            '] => [' +
            event.newStatus +
            ']',
        );
      },
      onLog: event => {
        console.log('onLog: [Idensic] ' + event.message);
      },
    })
    .withDebug(true)
    .withLocale('en') // Optional, for cases when you need to override the system locale
    .build();

  snsMobileSDK
    .launch()
    .then(result => {
      console.log('SumSub SDK State: ' + JSON.stringify(result));
    })
    .catch(err => {
      console.log('SumSub SDK Error: ' + JSON.stringify(err));
    });
};

export default launchSNSMobileSDK;
