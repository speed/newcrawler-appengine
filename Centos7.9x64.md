# CentOS7.9 64bit

### install 
```
$ yum install git -y
$ yum install java-11 -y

$ java -version
```
### Install [OpenSSL 1.1.x](https://computingforgeeks.com/how-to-install-openssl-1-1-on-centos-rhel-7/?expand_article=1)
```
$ yum install gcc openssl-devel bzip2-devel libffi-devel sqlite-devel -y
$ openssl version
OpenSSL 1.0.2k-fips  26 Jan 2017
$ yum -y remove openssl openssl-devel
$ yum -y groupinstall "Development Tools"
$ wget https://www.openssl.org/source/openssl-1.1.1w.tar.gz
$ tar xvf openssl-1.1.1w.tar.gz
$ cd openssl-1.1*/
$ ./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl
$ make -j $(nproc)
$ sudo make install
$ sudo ldconfig

$ sudo tee /etc/profile.d/openssl.sh<<EOF
export PATH=/usr/local/openssl/bin:\$PATH
export LD_LIBRARY_PATH=/usr/local/openssl/lib:\$LD_LIBRARY_PATH
EOF

$ source /etc/profile.d/openssl.sh

$ logout
$ openssl version
OpenSSL 1.1.1w  11 Sep 2023
```

### install [python3.12.0](https://computingforgeeks.com/install-python-3-on-centos-rhel-7/)
```
$ yum install sqlite-devel -y
$ wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz
$ tar xvf Python-3.12.0.tgz
$ cd Python-3.12.0
$ LDFLAGS="${LDFLAGS} -Wl,-rpath=/usr/local/openssl/lib" ./configure --with-openssl=/usr/local/openssl --prefix=/usr/local/python312
$ make && make altinstall 
$ rm -rf /usr/bin/python
#$ ln -s /usr/bin/python2 /usr/bin/python
#$ ln -s /usr/bin/python3.6 /usr/bin/python
$ ln -s /usr/local/python312/bin/python3.12 /usr/bin/python
$ python --version
Python 3.12.0

$ sudo tee /etc/profile.d/appengine.sh<<EOF
export MAVEN_OPTS="-Xms256m -Xmx512m"
export CLOUDSDK_PYTHON=/usr/local/python312/bin/python3.12
EOF
$ source /etc/profile.d/appengine.sh
$ logout
```

### install maven3.9.5
```
$ wget https://dlcdn.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz
$ tar xzvf apache-maven-3.9.5-bin.tar.gz
$ ln -s /root/apache-maven-3.9.5/bin/mvn /usr/bin/mvn
$ mvn -v
Apache Maven 3.9.5 (57804ffe001d7215b5e7bcb531cf83df38f93546)
Maven home: /root/apache-maven-3.9.5
Java version: 1.8.0_392, vendor: Red Hat, Inc., runtime: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.392.b08-2.el7_9.x86_64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.10.0-1127.19.1.el7.x86_64", arch: "amd64", family: "unix"
```

 [swap mem](https://blog.csdn.net/yprufeng/article/details/130761508)

```
$ dd  if=/dev/zero  of=/var/swapdata  bs=1024  count=4194304 
$ mkswap  /var/swapdata
$ chmod -R 0600 /var/swapdata
$ swapon   /var/swapdata
$ vi /etc/fstab
```
append this text to /etc/fstab
```
/var/swapdata   swap  swap  defaults  0  0
```

```
cat /proc/sys/vm/swappiness
sysctl vm.swappiness=40
echo "vm.swappiness = 40"  >>  /etc/sysctl.conf
```
