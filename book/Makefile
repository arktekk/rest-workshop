# Order is important
MARKDOWN=\
	template.tex \
	preamble.md \
	exercises-01-http-rpc.md \
	output/exercises-01-http-rpc-example-ad.md \
	exercises-02-basic-http.md \
	output/exercises-02-basic-http-example-ad.md \
	exercises-03-media-types.md \
	output/exercises-03-media-types-example-ad.md \
	exercises-04-generic-media-types.md \
	appendix.md \
	exercises-03-media-types-ads-r-us-api.md \
	exercises-04-generic-media-types-ads-r-us-api.md \
	tests.md \

all: rest-workshop-book.html
#rest-workshop-book.pdf

dexy:
	dexy

dexy-setup:
	dexy setup

clean:
	rm *.aux *.html *.log *.out *.pdf *.tex *.toc
	if [ -x `which dexy 2>/dev/null` ]; then dexy cleanup; fi

PANDOC_OPTIONS  = -f markdown
PANDOC_OPTIONS += -V documentclass=book
PANDOC_OPTIONS += -V lang=english
PANDOC_OPTIONS += -V title='REST Workshop'
PANDOC_OPTIONS += -V title-meta='REST Workshop'
PANDOC_OPTIONS += -V author='Erlend Hamnaberg &lt;<a href="mailto:erlend.hamnaberg@arktekk.no">erlend.hamnaberg@arktekk.no</a>&gt;'
PANDOC_OPTIONS += -V author='Trygve Laugstøl &lt;<a href="mailto:trygve.laugstol@arktekk.no">trygve.laugstol@arktekk.no</a>&gt;'
# Remember to update date-meta for HTML too.
# Update on every major revision.
PANDOC_OPTIONS += -V date='October 2012 edition'
PANDOC_OPTIONS += --chapters
PANDOC_OPTIONS += --number-sections
PANDOC_OPTIONS += --listings
PANDOC_OPTIONS += --standalone
PANDOC_OPTIONS += --highlight-style=pygments

PANDOC_HTML_OPTIONS += -t html5 --template=template.html
PANDOC_HTML_OPTIONS += --toc
PANDOC_HTML_OPTIONS += --section-divs
PANDOC_HTML_OPTIONS += --css=book.css
PANDOC_HTML_OPTIONS += -V author-meta='Erlend Hamnaberg <erlend.hamnaberg@arktekk.no>'
PANDOC_HTML_OPTIONS += -V author-meta='Trygve Laugstøl <trygve.laugstol@arktekk.no>'
# Follow http://www.w3.org/TR/NOTE-datetime for html
PANDOC_HTML_OPTIONS += -V date-meta='2012-10'

PANDOC_PDF_OPTIONS += -t latex --template=template.tex
PANDOC_PDF_OPTIONS += -V author-meta='Erlend Hamnaberg <erlend.hamnaberg@arktekk.no>, Trygve Laugstøl <trygve.laugstol@arktekk.no>'
PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{framed}'
PANDOC_PDF_OPTIONS += -V header-includes='\usepackage{fancyvrb}'

rest-workshop-book.md: $(MARKDOWN)
	pandoc -t markdown -o $@ $(filter-out template.tex, $^)

rest-workshop-book.html: rest-workshop-book.md
	pandoc $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $<

rest-workshop-book.tex: rest-workshop-book.md
	pandoc $(PANDOC_OPTIONS) $(PANDOC_PDF_OPTIONS) -o $@ $<

# http://web.mit.edu/~jcrost/www/latexmake.html
rest-workshop-book.pdf: rest-workshop-book.tex
	pdflatex $(patsubst book/%,%,$<)
