# Development Environment Setup

## Running the Development Server

You should be able to run all development services simply with docker. Just run:

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
