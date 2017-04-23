import fs from 'fs';
import makeStore from './src/store';
import {startServer} from './src/server';

export const store = makeStore();
startServer(store);

let jsonToLoadFrom;
if(fs.existsSync(`${__dirname}/data/saved.json`)){
  console.log("Found saved data, loading now.");
  jsonToLoadFrom = require('./data/saved.json');
}else{
  console.log("Dit not find saved data, loading default data.");
  jsonToLoadFrom = require('./default.json');
  fs.writeFileSync(`${__dirname}/data/saved.json`, JSON.stringify(jsonToLoadFrom));
}

store.dispatch({
  type: 'SET_MOVIES',
  movies: jsonToLoadFrom
});
store.dispatch({
  type: 'POPULATE_IDS'
});