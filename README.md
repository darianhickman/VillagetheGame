Automatic Setup of Development Environment
-----------

You have two options: Use default spreadsheets or copy default spreadsheets into your drive. Setup changes according to your choice.
For quick setup enter Y when asked. Be aware that login won't work in this instance.

1. Create a project in Google Cloud Console: https://console.cloud.google.com/home/dashboard
2. Install following packages if missing:
  - git
  - python
  - pip
  - virtualenv
  - curl
  - node
  - npm
3. run `setup.sh` and provide the following info:
  - Google Cloud Console project created in step 1
  - Whether to use default spreadsheets:
    - Y -> use default spreadsheets (login won't work on your deployed app)
    - N -> setup will copy spreadsheets into your google drive (my-drive) in step 4.1
  3.1 If you choose N visit https://console.cloud.google.com/apis/credentials?project=your-project-name and create a new Oauth Client ID
4. run `dev_appserver.py app-pipelines.yaml` to start local development server at https://localhost:8080
  4.1 If you chose N in step 3 visit https://localhost:8080/sheets/setup enter clientID and clientSecret (created in step 3.1) to copy sheets.
    4.1.1 Put config docid you got in step 4.1 into config.yaml to finish setup.
5. run `deploy.sh` to deploy to your project
6. visit https://your-project-name.appspot.com to test deployment

Manual Setup
-----------

Spreadsheets and App Script
-----------
  - Duplicate all of the spreadsheets and app script
  - Put docids into the settings spreadsheet

config.yaml
----------------

For service account credentials: https://console.developers.google.com/apis/credentials?project=[your-project-name]
  - Create new service account
  - Download JSON and copy/paste values into config.yaml
  - Share all of the spreadsheets with service account Email address

Create `config.yaml`:

```

spreadsheet:
  config_docid: "config-spreadsheet-docid"
  private_key_id: "values-from-google-developer-service-account"
  private_key: "values-from-google-developer-service-account"
  client_email: "values-from-google-developer-service-account"
  client_id: "values-from-google-developer-service-account"
  type: "service_account"
```

Deployment
-----------

Install pip and virtualenv. For example, on MacOSX:

```
sudo easy_install pip
sudo pip install virtualenv
```

Clone full version of IGE to `ige` directory.

Install Node.js and then IGE deps via NPM:

```
cd ige/server
npm install
```

Deploy:

```
./upload.sh
```

Google APIs
-----------
Enable the following APIs:

  - https://console.developers.google.com/apis/api/drive/overview?project=[your-project-name]
  - https://console.developers.google.com/apis/api/script/overview?project=[your-project-name]
  - https://console.developers.google.com/apis/api/plus/overview?project=[your-project-name]
  - https://console.cloud.google.com/apis/api/appengine/overview?project=[your-project-name]
  - https://console.cloud.google.com/apis/api/storage-api.googleapis.com/overview?project=[your-project-name]

To see the list of the enabled Google APIs: https://console.developers.google.com/apis/enabled?project=[your-project-name]

OAuth 2.0
-----------

For OAuth2 2.0 credentials: https://console.developers.google.com/apis/credentials?project=[your-project-name]
  - Create new OAuth client ID
  - Application type: Web application
  - Authorized JavaScript origins: Deployment or development URL
  - Authorized redirect URIs: Deployment or development URL
Download JSON and copy/paste values into config spreadsheet

App Script
-----------
  - Go to Resources -> Developers Console Project... and enter your project number
  - Go to Publish -> Deploy as API Executable select a version select Anyone and hit Update.
  - Go to Publish -> Deploy as API Executable and copy Current API ID and paste it into appsScriptID property of the settings sheet

Important Settings
-----------
Consider updating:

  - editorGroupEmail
  - loginGroupEmail
  - driveFolderID
  - all of the spreadsheet and app script docids

Deploy via Bitbucket Pipelines
-----------
Create an api key

  - Go to https://console.cloud.google.com/apis/credentials?project=[your-project-name]
  - Select 'Create credentials > API key'

Create a service account

  - Go to https://console.cloud.google.com/iam-admin/serviceaccounts/project?project=[your-project-name]
  - Select 'Create service account'
  - Type a name and select 'Furnish a new private key'
  - Click 'Create' and a json file will be downloaded (This file can be downloaded only one time, so keep it or create a new account in the future)

Set 'Environment variables' in https://bitbucket.org/darian_hickman/village-makeover/admin/addon/admin/pipelines/repository-variables#!/variables

  - CLOUDSDK_CORE_PROJECT = [your-project-name]
  - CONFIG_DOCID = [your-main-config-sheet]
  - GOOGLE_API_KEY = [your-api-key]
  - GOOGLE_CLIENT_SECRET = [your-downloaded-json-file-contents]
  
From now on new pushed commits to the bitbucket repository will trigger an automatic deployment.

If you want a manual deployment:

  - Go to https://bitbucket.org/darian_hickman/village-makeover/addon/pipelines/home#!/
  - Select latest Successful build
  - And click 'Rerun'

Running e2e Test
-----------
You will need to have the Java Development Kit (JDK) (http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed to run the standalone Selenium Server. Check this by running `java -version` from the command line.

Use npm to install Protractor globally with:
```
npm install -g protractor
```
This will install two command line tools, `protractor` and `webdriver-manager`. Try running `protractor --version` to make sure it's working.

The `webdriver-manager` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:
```
webdriver-manager update
```
Now start up a server with:
```
webdriver-manager start
```
This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the test. You can see information about the status of the server at `http://localhost:4444/wd/hub`.

Open a new command line or terminal window and run the following code in the root folder of the project (replace <url> with url to test):
```
protractor protractor-conf.js --baseUrl <url>
```

Helper Routes
-----------
  - /config/scan -> Lists files containing config keys if found.
  - /config/scan/<config_key> -> Lists file containing this key if found.
  - /cache/flush -> Removes caches for all items.
  - /cache/flush/<cache_id> -> Removes cache for the given id. List of ids: config assets earnings goalsdata goalstasks goalssettings catalog
