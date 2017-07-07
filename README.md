# README
## Ruby version
2.4.1

## Infrastructure
mysql 5.7.18
redis 3.2.9
node v8.1.3
yarn 0.27.5

```bash
$ brew install mysql
$ brew install redis
$ brew install yarn
```

### install node

```bash
$ brew install nodebrew
$ mkdir -p ~/.nodebrew/src
$ nodebrew install-binary stable
$ nodebrew use stable
$ echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bash_profile
$ source ~/.bash_profile
```

## copy yml files

```bash
$ cp config/database.yml.sample config/database.yml
$ cp config/secrets.yml.sample config/secrets.yml
$ cp config/cable.yml.sample config/cable.yml
```

<<<<<<< HEAD
## bundle install

```
$ bundle install --path vendor/bundle --jobs=4
```

## Database creation & initialization

```bash
$ bundle exec rails db:create db:migrate
```

## How to run the test suite

```$
$ bundle exec rspec
```
=======
## install gems

```bash
$ bundle install --path vendor/bundle --jobs=4
```

## install js libs

```bash
$ yarn
```

## Database creation & initialization

```bash
$ bundle exec rails db:create db:migrate
```

## How to run the test suite

```bash
$ bundle exec rspec
```

## How to run servers

```bash
bundle exec foreman start
```
>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542
