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

#
# Book stuff
#

# Order is important
MARKDOWN=\
	book/template.tex \
	book/preamble.md \
	exercises/01-http-rpc/README.md \
	book/output/01-http-rpc-example-ad.md \
	exercises/02-basic-http/README.md \
	book/output/02-basic-http-example-ad.md \
	exercises/03-media-types/README.md \
	book/output/03-media-types-example-ad.md \
	exercises/04-generic-media-types/README.md \
	book/appendix.md \
	exercises/03-media-types/ads-r-us-api.md \
	exercises/04-generic-media-types/ads-r-us-api.md \
	book/tests.md \

dexy:
	cd book; dexy

dexy-setup:
	cd book; dexy setup

book-clean:
	if [ -x `which dexy 2>/dev/null` ]; then (cd book; dexy cleanup); fi

PANDOC_OPTIONS  = -f markdown
PANDOC_OPTIONS += -V documentclass=book
PANDOC_OPTIONS += -V lang=english
PANDOC_OPTIONS += -V title='REST Workshop'
PANDOC_OPTIONS += -V title-meta='REST Workshop'
PANDOC_OPTIONS += -V date='Juli 2012'
PANDOC_OPTIONS += -V author='Erlend Hamnaberg <erlend.hamnaberg@arktekk.no>'
PANDOC_OPTIONS += -V author='Trygve Laugstøl <trygve.laugstol@arktekk.no>'
PANDOC_OPTIONS += -V author-meta='Trygve Laugstøl <trygve.laugstol@arktekk.no>, Erlend Hamnaberg <erlend.hamnaberg@arktekk.no>'
#PANDOC_OPTIONS += --toc
PANDOC_OPTIONS += --chapters
PANDOC_OPTIONS += --number-sections
PANDOC_OPTIONS += --listings
PANDOC_OPTIONS += --standalone
PANDOC_OPTIONS += --highlight-style=pygments

PANDOC_HTML_OPTIONS += -t html5
#PANDOC_HTML_OPTIONS  = -t html
#PANDOC_HTML_OPTIONS += --html5

PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{framed}'
PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{fancyvrb}'
PANDOC_PDF_OPTIONS += -t latex --template=book/template.tex

book: book/rest-workshop-book.pdf book/rest-workshop-book.html
book/rest-workshop-book.md: $(MARKDOWN)
	pandoc $(PANDOC_OPTIONS) -t markdown -o $@ $(filter-out book/template.tex, $^)

book/rest-workshop-book.html: book/rest-workshop-book.md
	pandoc $(PANDOC_HTML_OPTIONS) -o $@ $<

book/rest-workshop-book.tex: book/rest-workshop-book.md
	pandoc $(PANDOC_PDF_OPTIONS) -o $@ $<

# http://web.mit.edu/~jcrost/www/latexmake.html
book/rest-workshop-book.pdf: book/rest-workshop-book.tex
	cd book; pdflatex $(patsubst book/%,%,$<)
