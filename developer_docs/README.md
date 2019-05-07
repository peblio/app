<img width="100" alt="peblio screenshot" src="https://user-images.githubusercontent.com/5505598/46600370-93d1a600-cb07-11e8-8543-89d00fc86732.png">

Thank you for wanting to contribute to Peblio. In this document, you will find instructions for the below -

* [Setup of the project on your system](#setup)
* [Running it in your local environment](#local-development)
* [Running tests!](#tests)
* [The git workflow that we follow](#git-workflow)
* [Deploying](#deploying)
* [Credstash and Environment Variables](#credtash-and-environment-variables)

## Setup

1. Remix this repository.
2. Clone the forked repository and cd into it.
3. (Optional) Create a [Python 2 virtualenv](https://docs.python-guide.org/dev/virtualenvs/#lower-level-virtualenv) and activate it.
4. ```pip install -r requirements.txt```
5. Make sure that you have [Node.js v8.7.0 or higher installed](https://github.com/creationix/nvm#installation).
6. ```npm install```
7. ```cd client && npm install```
8. ```cd ../server && npm install```
9. Install MongoDB and make sure it is running.
    * For Mac OSX with [homebrew](https://brew.sh/): `brew install mongodb` then `brew services start mongodb`
    * For Windows and Linux: [MongoDB Installation](https://docs.mongodb.com/manual/installation/)
10. Get the AWS IAM credentials for the `peblio-local-development` user from Mathura and place them in your `~/.aws/credentials` file under a profile called `peblio`. You should also create a `peblio` profile in `~/.aws/config` with the line `region=us-east-1`. The easiest way to do this is to run `aws configure --profile peblio`. See the [AWS docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) for more details.
11. Get the `Peblios.pem` SSH key from Mathura and place it in your `~/.ssh` directory. Then, if you haven't already, [generate an SSH key for your GitHub account](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/). Finally, add the following lines to your `~/.bashrc` or `~/.bash_profile` startup script:
    ```
    ssh-add ~/.ssh/Peblios.pem
    ssh-add ~/.ssh/id_rsa
    ```
    Alternatively, if you're using OS X, instead of modifying your `~/.bashrc`, you can [configure SSH to use the OS X Keychain to automatically make your private keys available to SSH](https://apple.stackexchange.com/a/250572).
12. (Optional) Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Developer Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) Chrome extensions.

## Local Development

1. `cd client && npm start`
2. In another terminal session, `cd server && npm start`
3. Navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Local Server Debug

Please note, the debug only works in Visual Studio Code. Also the debug does not work with python being used in virtualenv.

1. Install Visual Studio Code and open project 
2. The launch.json and tasks.json shall create a Debug Launch Confirguration "Server Debug"
3. Install a breakpoint and start the Debug

The presence of jsconfig.json file in a directory indicates that the directory is the root of a JavaScript Project.
It also helps us point that server is ES6 syntax javascript project

## Babel in Server

To be able to use ES6 syntax, we use babel on the server side.
As mentioned in [babel-node docs](https://babeljs.io/docs/en/babel-node), You should not be using babel-node in production. It is unnecessarily heavy, with high memory usage due to the cache being stored in memory. You will also always experience a startup performance penalty as the entire app needs to be compiled on the fly.
As an option, while launching the server on higher environments we use `npm run startserver`. With this, we first transpile code to backwards compatible version of JavaScript
and then start server. This is done in the prestartserver script of node. 

While launching locally, we use `npm start` which calls `prestart` script from package.json.

The reason we have different server startup scripts for local and for higher environments is because `npm start` generates source-maps which helps in local debugging.
This isn't required while starting the server on higher environment.

## Tests

This project uses [TestCafe](https://devexpress.github.io/testcafe/documentation/test-api/) to run end-to-end tests against the frontend and backend.

You can run the tests once by running
```
npm test
```

You can run the tests in `watch` mode (using [TestCafe Live](https://github.com/DevExpress/testcafe-live)) by running
```
npm run test:watch
```

By default, these commands run the tests using a headless Firefox browser. However, there are several other test commands defined in [package.json](package.json) that will run the tests against other browsers. For example, to run the tests against Chrome, Firefox, and Safari simultaneously, you could run
```
npm run test:all
```

### Unit Tests For Server

You can run the from root folder by running
```
cd server 
npm test
```

### Unit Tests For Client

We have used enzyme to test react components along with chai, mocha, sinon
You can run the from root folder by running
```
cd client 
npm test
```



## Git Workflow

The expected git workflow for feature development is:

1. Either create a local branch for your feature, **OR**, create a branch for your feature in your fork of the repo.

2. When your work is ready, create a pull request against the `master` branch of this repo.

3. Once your pull request to `master` has been merged, create a pull request from `master` to `staging`, merge it, and deploy to the staging environment to manually test your feature.

4. Once you've verified that everything works in the staging environment, you can create a pull request from `staging` to `production`, merge it, and deploy to the production environment.

## Deploying

### Backend

The backend uses [ansible](https://docs.ansible.com/ansible/latest/index.html) to deploy code to EC2 servers. For more info on how this works, see the [Ansible section](#ansible) of this README.

#### Staging

```
cd server
./devops/staging_deploy.sh
```

#### Production

```
cd server
./devops/prod_deploy.sh
```

### Frontend

The frontend uses the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/) to push the latest build to S3 and invalidate the corresponding CloudFront cache.

#### Staging

```
git checkout staging
cd client
./devops/staging_deploy.sh
```

#### Production

```
git checkout production
cd client
./devops/prod_deploy.sh
```

## Credstash and Environment Variables

### Backend

On the backend, Peblio uses [credstash](https://github.com/fugue/credstash), a utility that uses AWS KMS to securely store data in AWS DynamoDB, to manage secrets that should not be checked into version control.

[server/run_with_credstash.sh](server/run_with_credstash.sh) takes care of mapping credstash secrets to environment variables used by the Express server. This bash script expects you to have an [AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) called `peblio` configured with the credentials for the `peblio-local-development` IAM user.

#### Listing Secrets

To see a list of the secrets currently stored in credstash:
```
cd server
./list_credstash_secrets.sh
```

#### Adding a Secret

To add a secret to credstash:
```
cd server
./add_credstash_secret.sh my.secret donttellanyone local
```

When adding a new secret, always make sure to add a version for each of the following environments: `local`, `test`, `staging`, and `production`.

Once you've added a secret, make sure that you also update [server/run_with_credstash.sh](server/run_with_credstash.sh) to map that secret to an environment variable.

#### Deleting a Secret

If you need to a delete a secret, you can run:
```
cd server
./delete_credstash_secret.sh my.secret local
```

However, **DO NOT DO THIS** unless you're sure that it won't affect the production servers or anyone else's work.

### Frontend

Environment variables for the frontend are defined in three `.env` files in the `client` directory: [.env](client/.env), [.env.staging](client/.env.staging), and [.env.production](client/.env.production).

These files are checked into version control, because any environment variable used in the frontend will be visible in the compiled JavaScript code. With that in mind, **DO NOT PUT SENSITIVE DATA OR CREDENTIALS IN THESE FILES!** Anything that needs to be kept secret should be stored in credstash and used exclusively on the backend.

## Ansible

[ansible](https://docs.ansible.com/ansible/latest/index.html) is an IT automation tool that is used in this project to automate the creation, provisioning, and deployment of backend EC2 instances.

The structure of the [server/devops/ansible directory](server/devops/ansible) roughly follows the recommended strategy for multistage environments described in [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-manage-multistage-environments-with-ansible#ansible-recommended-strategy-using-groups-and-multiple-inventories).

### Inventories

Inventories specify which EC2 servers belong to which environments.

There are two separate inventories located in [server/devops/ansible/inventories](server/devops/ansible/inventories), one for `staging` and one for `production`. Both inventories use an [EC2 Dynamic Inventory](https://docs.ansible.com/ansible/2.5/user_guide/intro_dynamic_inventory.html#example-aws-ec2-external-inventory-script) to find any currently running EC2 instances that belong to the corresponding environment.

The code that defines these two inventories is almost identical, with the key difference being a filter in the respective [ec2.ini](server/devops/ansible/inventories/staging/ec2.ini#L173) files that only includes EC2 instances with an `env` tag corresponding to the environment.

Each inventory also defines group variables that are unique to that environment in various YAML files. These variables are used in roles when creating, provisioning, and deploying EC2 instances. Any variables that are invariant across environments are defined in [server/devops/ansible/inventories/cross_env_vars.yml](server/devops/ansible/inventories/cross_env_vars.yml), which is symlinked into both the `staging` and `production` inventories.

### Roles

Roles define sets of tasks that are run either locally or remotely on EC2 instances via SSH. Some roles may also define their own variables or include template files that will be copied over to an EC2 instance.

Most roles are intended to be [idempotent](https://docs.ansible.com/ansible/latest/reference_appendices/glossary.html#term-idempotency). That means that there should be no difference between running a role like [deploy_webserver](server/devops/ansible/roles/deploy_webserver/tasks/main.yml) once vs. running in many times in a row. However, not all roles are idempotent - [create_webserver](server/devops/ansible/roles/create_webserver/tasks/main.yml) spins up a new EC2 instance each time that it runs.

Roles don't specify which hosts they should run on - that's taken care of by playbooks.

### Playbooks

Playbooks map host groups to roles. This allows the same role to be used multiple times for different hosts in different contexts, e.g. the `deploy_webserver` role is used in both [create_webserver.yml](server/devops/ansible/create_webserver.yml) and [deploy_webserver.yml](server/devops/ansible/deploy_webserver.yml).

### Bash Scripts

For convenience, there are several bash scripts (`staging_deploy.sh`, `prod_deploy.sh`, etc.) located in the [devops directory](server/devops) that abstract away the details of running ansible for common tasks like deployment and provisioning.


### AWS Profile

We use `peblio` profile for AWS and this is defined in AWS_PROFILE environment variable

### Creating a new instance (front and back) - WIP

Let's talk about front end first

1. Create an S3 bucket - this needs to be done manually 
1. When creating bucket, you can copy the settings from an existing bucket
1. Setup static website hosting for the bucket once its created
1. Create cloudfront - choose web distribution
1. Make note of the distribution ID
1. Update distribution ID and S3 bucket name in [deploy.sh](https://github.com/peblio/app/blob/master/client/devops/deploy.sh) 
1. Post this, you can use the deploy scripts, and it should be up on the S3 link
1. To map this URL to a domain name, go to DNS provider (godaddy) and update the details

regd Back end

1. Create a new IAM user (this is not necessary, but will make for a clean, new system)
1. Change the [cross_env_var](https://github.com/peblio/app/blob/master/server/devops/ansible/inventories/cross_env_vars.yml) to include the new github repo and new IAM user
1. Change the variables inside [group_vars](https://github.com/peblio/app/tree/master/server/devops/ansible/inventories/staging/group_vars) - you will choose machine size here 
1. Now you can run the create_webserver script and the deploy_webserver script!
YAAAY!


1. Post this, run the script to spin up the server 
