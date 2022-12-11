# Devcontainers NodeJS

## Getting started:

[Download a zip of this repo](https://github.com/george-barbu-cc/docker-nodejs/archive/master.zip) 
(clone only for contributions). 

Rename the directory with something suitable for your project
(will be used by docker as a namespace!)

Add it as a folder in your project

Change name in `.devcontainer/devcontainer.json` for your project.
(This will keep your projects storage isolated between them)

Uncomment/add needed services in `docker-compose.yml`.


## Important for Windows 10 users:

https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig

Make sure you will set a memory limit, as the 80% default limit will allow WSL2 to do aggresive caching in ram
and will simply make your system slow, sometimes even freezing minutes. This is not a bug of Docker, neither of
Linux. It's purely a missed optimization of Microsoft in WSL2, forgetting that Linux, like Windows as well, is
very aggressive on caching anything possible.

Example: I use 8GB memory limit and 0 swap to make docker behave identical like on a virtual server with 8gb of ram
and 2 cpus. Works fine on a 16GB laptop, no slowness while running devcontainers with lots of services, including
Elastic Search. On a 8GB Windows Host, I would set 4GB memory limit, and tweak in `docker-compose.yaml` to enforce
lower memory limits per services, but do really investigate if those services can run with extrem low memory constrains.
