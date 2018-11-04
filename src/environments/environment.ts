// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBJo_MuztbQPnqyecTXJK6xhXYmbP0DORU',
    authDomain: 'sakpha-thailand.firebaseapp.com',
    databaseURL: 'https://sakpha-thailand.firebaseio.com',
    projectId: 'sakpha-thailand',
    storageBucket: 'sakpha-thailand.appspot.com',
    messagingSenderId: '809614898074'
  },
  sendgrid_api_key: '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'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
