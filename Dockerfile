FROM ruby:3.1.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm yarn
RUN mkdir -p /app/backend
WORKDIR /app/backend
COPY Gemfile /app/backend/Gemfile
COPY Gemfile.lock /app/backend/Gemfile.lock
RUN bundle install
COPY . /app/backend
RUN npm install
RUN yarn build

EXPOSE $PORT
