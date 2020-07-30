deps:
	@make install-common-deps
	@make install-web-deps
	@make install-api-deps

install-common-deps:
	npm install --progress=false

install-web-deps:
	cd web && npm install --progress=false

install-api-deps:
	cd api && npm install --progress=false

cleanup:
	npx rimraf node_modules web/node_modules api/node_modules

dev:
	npx concurrently -p "[{name}]" -n "api,web" -c "bgBlue.bold,bgMagenta.bold" \
		"cd api && npm run dev" "cd web && npm run dev"

check:
	npm run check:all
