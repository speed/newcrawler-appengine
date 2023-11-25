# NewCrawler


Goes through the process of creating an Google App Engine using Java and Maven in phases.


## Project setup, installation, and configuration

How do I, as a developer, start working on the project?

### Install Google Cloud CLI
1. Install [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk#rpm)
2. Install [Using Apache Maven and the App Engine Plugin](https://cloud.google.com/appengine/docs/standard/java-gen2/using-maven)

### Create Google App Engine

1. Create a project in [Google Cloud](https://console.cloud.google.com/projectcreate?authuser=1)
2. Edit project id to 'newcrawler-test'
3. Select prject 'newcrawler-test'
4. Set the billing account for project “newcrawler-test”
5. Enable [Cloud Tasks API](https://console.cloud.google.com/marketplace/details/google/cloudtasks.googleapis.com?authuser=1&project=newcrawler-test)

### Git clone & maven deploy 

```
git clone https://github.com/speed/newcrawler-appengine.git \
 && cd newcrawler-appengine \
 && mvn clean package appengine:deployAll -X -DskipTests -Dapp.deploy.projectId=newcrawler-test -Dapp.deploy.version=app -f pom.xml

[INFO] GCLOUD: Success.
[INFO] GCLOUD: Temporary staging for module default directory left in /root/newcrawler-appengine/target/appengine-staging
Nov 26, 2023 2:48:01 AM com.google.cloud.tools.appengine.operations.GcloudRunner run
INFO: submitting command: /root/.cache/google-cloud-tools-java/managed-cloud-sdk/LATEST/google-cloud-sdk/bin/gcloud app deploy --version app --project newcrawler-test
[INFO] GCLOUD: ERROR: (gcloud.app.deploy) You do not currently have an active account selected.
[INFO] GCLOUD: Please run:
[INFO] GCLOUD: 
[INFO] GCLOUD:   $ gcloud auth login
[INFO] GCLOUD: 
[INFO] GCLOUD: to obtain new credentials.
[INFO] GCLOUD: 
[INFO] GCLOUD: If you have already logged in with a different account, run:
[INFO] GCLOUD: 
[INFO] GCLOUD:   $ gcloud config set account ACCOUNT
[INFO] GCLOUD: 
[INFO] GCLOUD: to select an already authenticated account to use.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE

```

```
$ rm -ivfR /root/.cache/google-cloud-tools-java

$ /root/.cache/google-cloud-tools-java/managed-cloud-sdk/LATEST/google-cloud-sdk/bin/gcloud auth login
Go to the following link in your browser:

    https://accounts.google.com/o/oauth2/auth?
    
Enter authorization code: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

$ /root/.cache/google-cloud-tools-java/managed-cloud-sdk/LATEST/google-cloud-sdk/bin/gcloud config set project newcrawler-test
$ /root/.cache/google-cloud-tools-java/managed-cloud-sdk/LATEST/google-cloud-sdk/bin/gcloud app deploy --version app --project newcrawler-test
```

### Browser access 

```
http://newcrawler-test.appspot.com
```