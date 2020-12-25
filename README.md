# agoral-demo

## Project setup

```bash
# install
yarn install

# dev
yarn serve

# prod
yarn build

# test
yarn test:unit

# lint
yarn lint
```

## Debug

Modify line 34 of file `./node_modules/@vue/cli-service/bin/vue-cli-service.js` to bellow, then start debuging by `f5`.

```javascript
// debug
const command = 'build'

// debug test
const command = 'test:unit'
``` 
