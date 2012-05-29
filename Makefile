MARKDOWN=$(wildcard *.md */*.md */*/*.md)
HTML=$(patsubst %.md,%.html,$(MARKDOWN))

all: $(HTML)

clean:
	@rm -f $(HTML)

%.html : %.md
	@echo markdown $<
	@markdown $< > $@

.PHONY: all clean
