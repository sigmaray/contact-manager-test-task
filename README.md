I implemented API with Rails because I know it better than Node, so it was faster to implement API in Ruby

For simplicity I hardcoded Devise JWT key and used `<center>` tag. I don't do this in real projects.

# How to run project with Docker

## Setup
```
docker-compose build
docker-compose run web rake db:create db:migrate db:seed
```

## Start
```
docker-compose up
```

## Testing
```
docker-compose run -e "RAILS_ENV=test" web rake db:create db:migrate
docker-compose run -e "RAILS_ENV=test" web rspec
```

# How to run project without Docker
Install RVM (https://rvm.io/)
```
rvm install ruby-2.7.1
vim config/database.yml # Edit DB credentials
bundle install
rake db:migrate
./bin/webpack-dev-server 
rails server
```

# What was not done (I know how to implement it, but didn't have enough time)
* Prop validation
* react-router
* Bulk deletion
* Contact detailed page
* Advanced theming
