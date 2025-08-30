// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   defaultauth: 'fackbackend',
//   firebaseConfig: {
//     apiKey: '',
//     authDomain: '',
//     databaseURL: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: '',
//     measurementId: ''
//   }
// };

export const environment = {
  production: false,

  //////////Production URL //////////////
  // apiUrl: "http://prod.gigatel.me:60109/api",
  // hrmsApiUrl: 'http://prod.gigatel.me:40101/api/',
  // hrmsUi: 'http://giga.gigasol.in:20101/#/select-company',



  ////////////////////// Development URL /////////////////////////
  apiUrl: "http://mob.gigatel.me:60109/api",
  hrmsApiUrl: 'http://mob.gigatel.me:40101/api/',
  hrmsUi: 'http://10.0.0.81:20101/#/select-company',

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
