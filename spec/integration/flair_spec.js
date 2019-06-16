const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;
const User = require("../../src/db/models").User;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Topic.create({
          title: "Winter Games",
          description: "Post your Winter Games stories.",
          posts: [{
            title: "Snowball Fighting",
            body: "So much snow!",
            userId: this.user.id
          }]
        }, {
          include: {
           model: Post,
           as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic;
          this.post = topic.posts[0];

          Flair.create({
            name: "snowman",
             color: "blue",
            postId: this.post.id
          })
         .then((flair) => {
           this.flair = flair;
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });
      });
    });
  });
});


  describe("GET /posts/:postId/flairs/new", () => {
    it("should render a new flair form", (done) => {
        request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Flair");
            done();
        });
    });
  });

  describe("POST /posts/:postId/flairs/create", () => {

    it("should create a new flair and redirect", (done) => {
       const options = {
         url: `${base}/${this.post.id}/flairs/create`,
         form: {
           name: "snowman",
           color: "blue"
         }
       };
       request.post(options,
         (err, res, body) => {
 
           Flair.findOne({where: {name: "snowman"}})
           .then((flair) => {
             expect(flair).not.toBeNull();
             expect(flair.name).toBe("snowman");
             expect(flair.color).toBe("blue");
             expect(flair.postId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });
  });

  describe("GET /posts/:postId/flairs/:id/edit", () => {

    it("should render a view with an edit flair form", (done) => {
      request.get(`${base}/${this.post.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Flair");
        expect(body).toContain("snowman");
        done();
      });
    });
  });

  
  describe("POST /posts/:postId/flairs/:id/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}/${this.post.id}/flairs/${this.flair.id}/update`,
        form: {
          name: "snowman",
          color: "blue"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it("should update the flair with the given values", (done) => {
        const options = {
          url: `${base}/${this.post.id}/flairs/${this.flair.id}/update`,
          form: {
            name: "new snowman"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Flair.findOne({
            where: {id: this.flair.id}
          })
          .then((flair) => {
            expect(flair.name).toBe("new snowman");
            done();
          });
        });
    });
  });
  
});