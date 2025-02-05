import { underscore } from "@ember/string";
import RestAdapter, { Result } from "discourse/adapters/rest";
import { ajax } from "discourse/lib/ajax";

export default class PostAdapter extends RestAdapter {
  find(store, type, findArgs) {
    return super.find(store, type, findArgs).then(function (result) {
      return { post: result };
    });
  }

  findAll(store, type, findArgs) {
    const path = this.pathFor(store, type, findArgs);
    return ajax(path).then((response) => {
      // Normalize a resposta para garantir que temos posts
      if (response.latest_posts && !response.posts) {
        response.posts = response.latest_posts;
        delete response.latest_posts;
      }
      return response;
    });
  }

  createRecord(store, type, args) {
    const typeField = underscore(type);
    args.nested_post = true;
    return ajax(this.pathFor(store, type), { type: "POST", data: args }).then(
      function (json) {
        // Ensure we have all the necessary data in the response
        if (json[typeField]) {
          const post = json[typeField];

          // Ensure user data is present
          if (!post.user) {
            post.user = store.currentUser;
          }

          // Return the complete post data
          return new Result(post, json);
        }
        return new Result({}, json);
      }
    );
  }

  pathFor(store, type, findArgs) {
    if (findArgs?.quick_posts || findArgs?.all_quick_posts) {
      return `/t/${findArgs.topic_id}/quick_posts`;
    }
    return super.pathFor(store, type, findArgs);
  }
}
