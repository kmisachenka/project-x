deps:
	@make install-common-deps
	@make install-web-deps
	@make install-api-deps

install-common-deps:
	yarn install

install-web-deps:
	cd web && yarn install

install-api-deps:
	cd api && yarn install

cleanup:
	npx rimraf node_modules web/node_modules api/node_modules

dev:
	npx concurrently -p "[{name}]" -n "api,web" -c "bgBlue.bold,bgMagenta.bold" \
		"cd api && yarn dev" "cd web && yarn dev"
