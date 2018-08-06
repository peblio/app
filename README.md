# Peblio

Peblio is an instructional tool and lesson sharing platform for middle and high school Computer Science teachers. The goal is to democratize quality instructional materials and provide CS teachers with a streamlined workflow for finding and adapting lessons and managing student work.

## Setup

1. Fork this repository.
2. Clone the forked repository and cd into it.
3. (Optional) Create a [Python 2 virtualenv](https://docs.python-guide.org/dev/virtualenvs/#lower-level-virtualenv) and activate it.
4. ```pip install -r requirements.txt```
5. Make sure that you have [Node.js v8.7.0 or higher installed](https://github.com/creationix/nvm#installation).
6. ```cd client && npm install```
7. ```cd ../server && npm install```
8. Install MongoDB and make sure it is running.
    * For Mac OSX with [homebrew](https://brew.sh/): `brew install mongodb` then `brew services start mongodb`
    * For Windows and Linux: [MongoDB Installation](https://docs.mongodb.com/manual/installation/)
9. Get the AWS IAM credentials for the `peblio-local-development` user from Mathura and place them in your `~/.aws/credentials` file under a profile called `peblio`. You should also create a `peblio` profile in `~/.aws/config` with the line `region=us-east-1`. See the [AWS docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) for more details.
10. Get the `Peblios.pem` SSH key from Mathura and place it in your `~/.ssh` directory. Then, run the following commands:
    ```
    ssh-agent bash
    ssh-add -K ~/.ssh/Peblios.pem
    ```

## Local Development

1. `cd client && npm start`
2. In another terminal session, `cd server && npm start`
3. Navigate to [http://localhost:8080](http://localhost:8080) in your browser.
4. Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
5. Install the [Redux Developer Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).
