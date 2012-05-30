MARKDOWN=$(wildcard *.md */*.md */*/*.md)
HTML=$(patsubst %.md,%.html,$(MARKDOWN))

STARTS=$(wildcard exercises/*/start)
SOLUTIONS=$(wildcard exercises/*/solution)
PACKAGE_JSONS=$(patsubst %, %/package.json, $(STARTS))
CMD_PRUNE=$(subst /,@,$(patsubst %,prune-%, $(STARTS) $(SOLUTIONS)))
CMD_INSTALL=$(subst /,@,$(patsubst %,install-%, $(STARTS) $(SOLUTIONS)))

all: docs $(PACKAGE_JSONS) $(CMD_INSTALL)

docs: $(HTML)

exercises/%/start/package.json: exercises/%/solution/package.json
	cp $< $@

clean: $(CMD_PRUNE)
	@rm -f $(HTML)

prune-%:
	cd $(subst @,/,$(patsubst prune-%,%,$@)); npm prune

install-%:
	cd $(subst @,/,$(patsubst install-%,%,$@)); npm install

%.html : %.md
	@echo markdown $<
	@markdown $< > $@

.PHONY: all docs clean npm 
