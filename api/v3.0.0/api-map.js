// Constants
const API_URL = "https://www.googleapis.com/youtube/v3/";

// Methods
const METHODS = {
    get: {
        options: {
            method: "GET"
        }
    }
  , post: {
        options: {
            method: "POST"
        }
    }
  , put: {
        options: {
            method: "PUT"
        }
    }
  , delete: {
        options: {
            method: "DELETE"
        }
    }
};

// The YouTube API map
var ApiMap = module.exports = {
    "activities": {
        "methods": {
            "list": METHODS.get
          , "insert": METHODS.post
        }
    }
  , "channelBanners": {
        "methods": {
            "insert": METHODS.post
        }
    }
  , "channels": {
        "methods": {
            "list": METHODS.get
          , "update": METHODS.put
        }

    }
  , "guideCategories": {
        "methods": {
            "list": METHODS.get
        }

    }
  , "playlistItems": {
        "methods": {
            "list": METHODS.get
          , "insert": METHODS.post
          , "update": METHODS.put
          , "delete": METHODS.delete
        }

    }
  ,"playlists": {
        "methods": {
            "list": METHODS.get
          , "insert": METHODS.post
          , "update": METHODS.put
          , "delete": METHODS.delete
        }
    }
  ,"search": {
        "methods": {
            "list": METHODS.get
        }
    }
  ,"subscriptions": {
        "methods": {
            "list": METHODS.get
          , "insert": METHODS.post
          , "delete": METHODS.delete
        }
    }
  ,"thumbnails": {
        "methods": {
            "set": METHODS.put
        }
    }
  ,"videoCategories": {
        "methods": {
            "list": METHODS.get
        }
    }
  ,"videos": {
        "methods": {
            "getRating": METHODS.get
          , "rate": METHODS.post
          , "list": METHODS.get
          , "insert": METHODS.post
          , "update": METHODS.put
          , "delete": METHODS.delete
        }
    }
};
