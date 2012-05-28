MARKDOWN=$(wildcard *.md */*.md)
HTML=$(patsubst %.md,%.html,$(MARKDOWN))

all: $(HTML)

%.html : %.md
	@echo markdown $<
	@markdown $< > $@

.PHONY: all
