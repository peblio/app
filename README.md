# Peblio

Peblio is an instructional tool and lesson sharing platform for middle and high school Computer Science teachers. The goal is to democratize quality instructional materials and provide CS teachers with a streamlined workflow for finding and adapting lessons and managing student work.

## To get started

1. Fork this repository.
1. Clone the forked repository and cd into it
1. `$ npm install`
1. Install MongoDB and make sure it is running
  * For Mac OSX with [homebrew](https://brew.sh/): `brew install mongodb` then `brew services start mongodb`
  * For Windows and Linux: [MongoDB Installation](https://docs.mongodb.com/manual/installation/)
1. Create a .env in the root of the directory that looks like
```
AWS_ACCESS_KEY=<your-aws-access-key>
AWS_SECRET_KEY=<your-aws-secret-key>
S3_BUCKET=<your-s3-bucket>
GOOGLE_CLIENT_ID=<peblio-google-client-id>
GOOGLE_CLIENT_SECRET=<peblio-client-secret>
 ```
 If you don't care about being able to upload media files to S3 , you can drop in the file exactly how it is. Or, if you don't want to do that, just ask me to send you mine.

If you're developing on OSX and you encounter an error like `npm ERR! cb() never called!` when running `npm install`, using [yarn](https://yarnpkg.com/lang/en/) to install dependencies seems to get around this issue:
```
brew install yarn
yarn install
```
1. To build all the files, run `npm run dev` in source folder and keep it running
1. To start the app, run `npm start` in root folder
1. Navigate to [http://localhost:8000](http://localhost:8000) in your browser
1. Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
