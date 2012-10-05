# Order is important
INDEX_MD_MARKDOWN=\
	title.md \
	exercises-introduction.md \
	exercises-01-http-rpc.md \
	output/exercises-01-http-rpc-example-ad.md \
	exercises-02-basic-http.md \
	output/exercises-02-basic-http-example-ad.md \
	exercises-03-media-types.md \
	output/exercises-03-media-types-example-ad.md \
	exercises-04-generic-media-types.md \
	exercises-05-hypermedia-design.md \
	appendix.md \
	curl-cheat-sheet.md \
	node-cheat-sheet.md \
	template.tex \
	template.html

all: html/index.html \
	html/book.css \
	html/ads-r-us-api-with-domain-specific-media-types.html \
	html/ads-r-us-api-with-existing-media-types.html \
	$(addprefix html/, $(wildcard pictures/*.jpg)) \
#	html/rest-workshop.pdf

dexy:
	dexy

dexy-setup:
	dexy setup

clean:
	rm -f $(wildcard *.aux *.log *.out *.pdf *.toc)
	rm -rf html
	if [ -x `which dexy 2>/dev/null` ]; then dexy cleanup; fi

PANDOC_OPTIONS  = -f markdown
PANDOC_OPTIONS += -V documentclass=book
PANDOC_OPTIONS += -V lang=english
# Update on every major revision.
PANDOC_OPTIONS += -V date='October 2012 edition'
# Follow http://www.w3.org/TR/NOTE-datetime for html. Only used by the html output
PANDOC_OPTIONS += -V date-meta='2012-10'
PANDOC_OPTIONS += --chapters
PANDOC_OPTIONS += --listings
PANDOC_OPTIONS += --standalone
PANDOC_OPTIONS += --highlight-style=pygments

PANDOC_HTML_OPTIONS += -t html5 --template=template.html
PANDOC_HTML_OPTIONS += --toc
PANDOC_HTML_OPTIONS += --section-divs
PANDOC_HTML_OPTIONS += --css=book.css

PANDOC_PDF_OPTIONS += -t latex --template=template.tex
PANDOC_PDF_OPTIONS += --number-sections
PANDOC_PDF_OPTIONS += -V author-meta='Erlend Hamnaberg <erlend.hamnaberg@arktekk.no>, Trygve Laugstøl <trygve.laugstol@arktekk.no>'
PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{framed}'
PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{fancyvrb}'

tmp/index.md: $(INDEX_MD_MARKDOWN)
	@mkdir -p tmp
	@echo '*.md => $@'
	@pandoc --standalone -t markdown -o $@ $(filter-out template.%, $^)

tmp/rest-workshop.tex: tmp/index.md
	@echo '*.md => $@'
	@pandoc $(PANDOC_OPTIONS) $(PANDOC_PDF_OPTIONS) -o $@ $<

html/%.css: %.css
	cp $< $@

html/%.jpg: html/pictures %.jpg
	cp $(filter %.jpg,$^) $@

html/pictures:
	mkdir $@

html/index.html: tmp/index.md template.html
	@mkdir -p html
	@echo '$< => $@'
	@pandoc $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $<

html/%.html: %.md template.html
	@mkdir -p html
	@echo '$< => $@'
	@pandoc $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $<

# http://web.mit.edu/~jcrost/www/latexmake.html
html/%.pdf: tmp/%.tex
	@mkdir -p html
	@echo '$< => $@'
	@pdflatex $<
