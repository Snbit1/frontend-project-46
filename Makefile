lint:
	npx eslint .

install:
	npm install

test-coverage:
	npm run test -- --coverage

test:
	jest