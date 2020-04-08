NOTES:
    npm run deploy: PRODUCTION BUILD -- deploys with /app/ as base path used in dockerfile file when copied to /app/ directory.

    create docker image: docker build -t base .

    start docker container with base image: docker run -p 8080:80 -d --name base base

    start corsproxy (prevent cors errors and issues): corsproxy (runs on localhost:1337)
        -> if need installation: npm install -g corsproxy
        -> command: corsproxy

STARTING AND GETTING DOCS INTO DOCKER
    start: docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.5.2

    upload documents: (in /assets) curl -H "Content-Type: application/json" -XPOST "localhost:9200/documents/_bulk?pretty&refresh" --data-binary "@accounts.json"# code
