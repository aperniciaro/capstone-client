dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t perniciaro-capstone-image ./bin/release/netcoreapp2.2/publish

docker tag perniciaro-capstone-image registry.heroku.com/perniciaro-capstone/web

docker push registry.heroku.com/perniciaro-capstone/web

heroku container:release web -a perniciaro-capstone

# sudo chmod 755 deploy.sh
# ./deploy.sh