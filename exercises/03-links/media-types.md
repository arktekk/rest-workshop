Ads'r'us Media Types
====================

Expected usage
--------------

It is assumed that clients are pre-programmed with a link to an ad
list when starting to interact with us.

Media Type: Single Ad / `application/vnd.ad+json`
------------------------------------------

~~~json
{
  "title": "Fin bolig til salgs!",
  "body": "Fire rom, nytt bad.",
  "self": "http://...",
  "pictures": "http://...",
  "add-picture": "http://...",
  "publish": "http://..."
}
~~~

Fields:

* `title`: the title and body of the ad. Available: summary
* `body`: the title and body of the ad.
* `self`: an URI that points to the ad itself. POST changes to the
  here.
  
### Updating Ads

When updating the ad, only these fields needs to be sent:

* `title`
* `body`

There is no described way to update only a subset of the fields in an
ad.

Media Type: Ad List / `application/vnd.ad-list+json`
------------------------------------------

~~~json
{
  "count": 10,
  "add-ad": URI
  "ads": [
    {
      // See specification for application/vnd.ad+json
    }
  ],
  "next-page": URI
  "prev-page": URI
}
~~~

To insert a new ad into the list
