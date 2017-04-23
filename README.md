# movies-challenge

* `$ cd movies-server`
* `$ npm run test`
* `$ npm run start`

* `$ cd movies-client`
* `$ npm run test`
* `$ npm run start`

## movies-server

* Packages
    * redux - functional (stateless and immutable of data design)
    * immutable - well, you know for redux
    * lodash
    * socket.io - decided to use this for faster dev, also allows multiple people edit the list in real time

* Dev Packages
    * babel - cli
    * babel - core
    * babel - preset-es2015
    * chai - assertion library
    * chai-imutable
    * mocha - testing framework to use
    
* Design Choices
    * Local json as db - Because this is a quick challenge. Realistically I would choose Postgres for long term storage solution (especially with unique ids), or NoSQL if it's smaller project.
    
## movies-client

* Packages
    * redux
    * immutable
    * lodash
    * react
    * react-dom
    * react-redux
    * react-router - thought about creating more routes but we don't really need to
    * react-addons-pure-render-mixin - allows faster rendering because it shallow-compare instead of deep-compare of props and stores
    * react-bootstrap
    * react-fontawesome
    * react-highlighter
    * socket.io-client
    * create-react-class - createClass is deprecating
    * react-addons-test-utils - for testing
    
* Dev Packages
    * babel-preset-es2015
    * chai
    * chai-immutable
    * jsdom - thought about using it in helper, didn't do much in the end
    * mocha
    * react-scripts - didn't know this thing existed, this is awesome!
    
* Design Choices
    * While the main data store is immutable and and follows Redux design, I decided to simply use react store for most of the UI components' states. Not sure if this is accepted paradigm in React community, but I think this keeps the core movies data intact with server and pure.
    * All the jsx tests are unit tests, although I can keep going and write integration tests and end to end tests with mocha/selenium. Not sure if there's something like Protractor for react
    * Because this is a short code challenge, I decided not to pursue pagination. Realistically it's not good idea to transmit the complete store on socket.io, instead it should be in chunks and server keeps track of pagination.

* Lessons Learned
    * Javascript evolved so much in ecma6. I feel like an old man now.
    * Functional design of redux is quite a challenge, as much as I enjoy the upsides (easier testing, more rigid data change, stateless+immutable, etc) I think it's going to be very difficult to use in real software projects because of the time/resource constraints and also overall high learning curve for non functional programmers
    * TDD is awesome, another reason why I enjoyed development with Redux