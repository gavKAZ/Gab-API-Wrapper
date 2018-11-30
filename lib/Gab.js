const axios = require('axios');

let maybeJson;

class Gab {
  /**
   * Create a new Gab client.
   * @param options
   * @param options.authToken - User's auth token.
   * @param options.stringify - (Optional) If true, will return stringified JSON.
   * @param options.timeout - (Optional) Specify a custom timeout. Default 5000 milliseconds.
   * @constructor
   */
  constructor(options) {
    this.options = options;

    axios.defaults.baseURL = 'https://api.gab.com/v1.0/';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.options.authToken;
    axios.defaults.responseType = 'json';
    axios.defaults.timeout = options.timeout ? options.timeout : 5000;

    maybeJson = obj => {
      if(this.options.stringify) {
        return JSON.stringify(obj);
      }

      return obj;
    }
  }

  /**
   * Returns the user's account information.
   * Requires 'read' scope.
   */
  me() {
    return new Promise(resolve => {
      axios.get('me')
        .then(response => {
          resolve(maybeJson(response));
        });
    });
  }

  /**
   * Returns a user's profile.
   * Requires 'read' scope.
   * @param username
   * @returns {Promise<object,string>}
   */
  user(username) {
    return new Promise(resolve => {
      const url = `users/${username}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Returns a user's followers.
   * Requires 'read' scope.
   * @param username
   * @param before
   * @returns {Promise<object,string>}
   */
  followers(username, before = 0) {
    return new Promise(resolve => {
      const url = `users/${username}/followers?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Returns a user's followed.
   * Requires 'read' scope.
   * @param username
   * @param before
   * @returns {Promise<object,string>}
   */
  following(username, before = 0) {
    return new Promise(resolve => {
      const url = `users/${username}/following?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Returns a user's notifications.
   * Requires 'notifications' scope.
   * @param before
   * @returns {Promise<object,string>}
   */
  notifications(before = 0) {
    return new Promise(resolve => {
      const url = `notifications/?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  mainFeed(before = '') {
    return new Promise(resolve => {
      const url = `feed/?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Returns a user's feed.
   * Requires the 'read' scope.
   * @param username
   * @param before
   * @returns {Promise<object,string>}
   */
  userFeed(username, before = '') {
    return new Promise(resolve => {
      const url = `users/${username}/feed/?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Returns the popular feed.
   * Requires the 'read' scope.
   * @returns {Promise<object,string>}
   */
  popularFeed() {
    return new Promise(resolve => {
      const url = `popular/feed`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns popular users.
   * Requires the 'read' scope.
   * @returns {Promise<object,string>}
   */
  popularUsers() {
    return new Promise(resolve => {
      const url = `popular/users`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Follow a user.
   * Requires the 'engage-user' scope.
   * @param userId
   * @returns {Promise<object,string>}
   */
  follow(userId) {
    return new Promise(resolve => {
      const url = `users/${userId}/follow`;

      axios.post(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Unfollow a user.
   * Requires the 'engage-user' scope.
   * @param userId
   * @returns {Promise<object,string>}
   */
  unfollow(userId) {
    return new Promise(resolve => {
      const url = `users/${userId}/follow`;

      axios.delete(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Upvote a post.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  upvote(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/upvote`;

      axios.post(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Remove an upvote for a post.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  removeUpvote(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/upvote`;

      axios.delete(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Downvote a post.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  downvote(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/downvote`;

      axios.post(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Remove a downvote for a post.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  removeDownvote(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/downvote`;

      axios.delete(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Repost a post.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  repost(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/repost`;

      axios.post(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Remove a repost.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  removeRepost(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}/repost`;

      axios.delete(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns a post's details.
   * Requires the 'engage-post' scope.
   * @param postId
   * @returns {Promise<object,string>}
   */
  postDetails(postId) {
    return new Promise(resolve => {
      const url = `posts/${postId}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns popular groups.
   * Requires the 'read' scope.
   * @returns {Promise<object,string>}
   */
  popularGroups() {
    return new Promise(resolve => {
      const url = `groups`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns a group's details.
   * Requires the 'read' scope.
   * @param groupId
   * @returns {Promise<object,string>}
   */
  groupDetails(groupId) {
    return new Promise(resolve => {
      const url = `groups/${groupId}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns a group's users.
   * Requires the 'read' scope.
   * @param groupId
   * @param before
   * @returns {Promise<object,string>}
   */
  groupUsers(groupId, before = 0) {
    return new Promise(resolve => {
      const url = `groups/${groupId}/users?before=${before}`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  };

  /**
   * Returns a group's moderation logs.
   * Requires the 'read' scope.
   * @param groupId
   * @returns {Promise<object,string>}
   */
  groupModerationLogs(groupId) {
    return new Promise(resolve => {
      const url = `groups/${groupId}/moderation-logs`;

      axios.get(url)
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Creates a media attachment.
   * Requires the 'write-posts' scope.
   * @param file
   * @returns {Promise<object,string>}
   */
  createMediaAttachment(file) {
    return new Promise(resolve => {
      const url = `media-attachments/images`;

      axios.post(url, {
        file: file
      })
        .then(response => {
          resolve(maybeJson(response.data));
        });
    });
  }

  /**
   * Create a new post.
   * @param options
   * @param options.media_attachments[] - Media attachment ID created using createMediaAttachment. Up to four attachments.
   * @param options.gif - Giphy gif ID
   * @param options.body - Post body
   * @param options.reply_to - Id of the post to reply to.
   * @param options.is_quote - 1 if you want to create this as a quote.
   * @param options.nsfw - 1 if post is NSFW.
   * @param options.premium_min_tier - Used to mark a premium post. Amount, in cents, that user's should pay monthly for this post to be visible.
   * @param options.group - ID of group to post to.
   * @param options.topic - Topic for the post.
   * @param options.poll - 1 if you want to add a poll. Requires poll_option_1 and poll_option_2. poll_option_3 and poll_option_4 are optional.
   * @param options.poll_option_1 - Poll option
   * @param options.poll_option_2 - Poll option
   * @param options.poll_option_3 - Poll option
   * @param options.poll_option_4 - Poll option
   * @returns {Promise<object,string>}
   */
  createPost(options) {
    return new Promise(resolve => {
      const url = `posts`;

      axios.post(url, options)
        .then((response,) => {
          resolve(maybeJson(response.data));
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
}

module.exports = Gab;
