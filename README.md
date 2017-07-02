# README
* Ruby version
2.4.1

* Infrastructure
mysql 5.7.18
redis 3.2.9

```bash
$ brew install mysql
$ brew install redis
```

* copy yml files

```bash
$ cp config/database.yml.sample config/database.yml
$ cp config/secrets.yml.sample config/secrets.yml
$ cp config/cable.yml.sample config/cable.yml
```

* bundle install

```
$ bundle install --path vendor/bundle --jobs=4
```

* Database creation & initialization

```bash
$ bundle exec rails db:create db:migrate
```

* How to run the test suite

```$
$ bundle exec rspec
```
