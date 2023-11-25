# NewCrawler


Goes through the process of creating an Google App Engine using Java and Maven in phases.


## Project setup, installation, and configuration

How do I, as a developer, start working on the project?


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
   	&& mvn package appengine:deployAll -Dapp.deploy.projectId=newcrawler-appengine -Dapp.deploy.version=app -f pom.xml
```

### Browser access 

```
http://newcrawler-test.appspot.com
```