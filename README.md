# Homepage

This simple web app is designed to display a list of links for easy access to things.

## Configuration

It will read a `site.json` file in the root directory. Below is an example of such file.

```
[
  {
    "name": "Media",
    "items": [
      {
        "name": "Plex",
        "description": "Plex media server",
        "icon": "http://192.168.1.243:32400/web/static/icon-ipad.png",
        "url": "http://192.168.1.243:32400/web"
      },
    ]
  }
]
```

The `icon` and `description` keys are optional. If you do not provide an icon URL, it will attempt to read the `apple-icon` from the meta data of the URL used to access the service.
