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
9. Get the AWS IAM credentials for the `peblio-local-development` user from Mathura and place them in your `~/.aws/credentials` file under a profile called `peblio`. You should also create a `peblio` profile in `~/.aws/config` with the line `region=us-east-1`. The easiest way to do this is to run `aws configure --profile peblio`. See the [AWS docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) for more details.
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
cd client
./devops/staging_deploy.sh
```

#### Production

```
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

When adding a new secret, always make sure to add a version for each environment: `local`, `staging`, and `production`.

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

Playbooks take of mapping host groups to roles. This allows the same role to be used multiple times for different hosts in different contexts, e.g. the `deploy_webserver` role is used in both [create_webserver.yml](server/devops/ansible/create_webserver.yml) and [deploy_webserver.yml](server/devops/ansible/deploy_webserver.yml).

### Bash Scripts

For convenience, there are several bash scripts (`staging_deploy.sh`, `prod_deploy.sh`, etc.) located in the [devops directory](server/devops) that abstract away the details of running ansible for common tasks like deployment and provisioning.
