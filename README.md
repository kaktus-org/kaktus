# Development Environment Setup

## Running the Development Server

Once configuring the .env file, you should be able to run all development services simply with docker. Just run:

```
docker compose up
```

If you need to forcible rebuild all images (this is the case sometimes when switching between branches or pulling in major changes), you can do so with:

```
docker compose build --force-rm && docker compose up
```

## Setting Up Hosts

In order to use the nginx configurations on your local machine you will need to set up your local `hosts` file to correctly point to your localhost. You can do this easily by running the following command on Linux:

```
sudo ./scripts/run-update.hosts.sh
```

If you would like to remove these entries easily, you can similarly run:

```
sudo ./scripts/run-update-hosts.sh --remove
```

**If you are on Windows, you can run the same scripts in an administrator git bash shell without `sudo`.**

## Deployment

**EC2**
sudo yum install git
sudo yum install docker
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
git clone https://github.com/kaktus-org/kaktus.git
sudo service start docker
Add port 8000 to inbound rules of the security rules
Add IP to the cors list

**locally**
scp -i "kaktus-key-pair.pem" .env ec2-user@[IP-ADDR]:/home/ec2-user/kaktus/.env
change baseurl in frontend\src\api\axiosConfig.tsx to ec2 instance
yarn build
scp -i "kaktus-key-pair.pem" -r ./frontend/build ec2-user@[IP-ADDR]:/home/ec2-user/kaktus/frontend/

**EC2**
Change DB_ENV to live
comment out RUN yarn build in frontend/Dockerfile.prod
sudo docker-compose -f docker-compose.prod.yml up