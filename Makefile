MARKDOWN=$(filter-out book/%,$(wildcard *.md */*.md */*/*.md))
HTML=$(patsubst %.md,%.html,$(MARKDOWN))

NODE_EXERCISES=01-http-rpc 02-basic-http 03-media-types
# 04-generic-media-types
STARTS=$(patsubst %,exercises/%/start, $(NODE_EXERCISES))
SOLUTIONS=$(patsubst %,exercises/%/solution, $(NODE_EXERCISES))
PACKAGE_JSONS=$(patsubst %, %/package.json, $(STARTS))
CMD_PRUNE=$(subst /,@,$(patsubst %,prune-%, $(STARTS) $(SOLUTIONS) exercises/lib))
CMD_INSTALL=$(subst /,@,$(patsubst %,install-%, $(STARTS) $(SOLUTIONS) exercises/lib))

all: docs files npm

docs: $(HTML)

files: $(PACKAGE_JSONS) \
	 exercises/02-basic-http/start/server.js \
	 exercises/03-media-types/start/server.js
#	 exercises/04-generic-media-types/start/server.js \

npm: $(CMD_INSTALL)

exercises/02-basic-http/start/server.js: exercises/01-http-rpc/solution/server.js
	cp $< $@

exercises/03-media-types/start/server.js: exercises/02-basic-http/solution/server.js
	cp $< $@

exercises/04-generic-media-types/start/server.js: exercises/03-media-types/solution/server.js
	cp $< $@

# All package.json files in start/ are copied from solution/
exercises/%/start/package.json: exercises/%/solution/package.json
	cp $< $@

clean: $(CMD_PRUNE) book-clean
	@rm -f $(HTML)

prune-%:
	cd $(subst @,/,$(patsubst prune-%,%,$@)); npm prune .

install-%:
	cd $(subst @,/,$(patsubst install-%,%,$@)); npm install .

%.html : %.md
	@echo markdown $<
	@markdown $< > $@

.PHONY: all files docs clean npm book book-clean dexy
