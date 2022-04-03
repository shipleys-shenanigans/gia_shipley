FROM shipleyshenanigans/shipleysruby:4.0.0

RUN apt-get update
RUN apt-get install -y curl build-essential libpq-dev nodejs npm
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install yarn -y
RUN mkdir -p /app/backend
WORKDIR /app/backend
COPY Gemfile /app/backend/Gemfile
COPY Gemfile.lock /app/backend/Gemfile.lock
RUN bundle install
COPY . /app/backend
RUN npm install
RUN yarn build

EXPOSE $PORT
