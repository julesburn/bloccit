const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {

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
            this.user = user; //store the user
   

            Topic.create({
              title: "Tired of talking about space? Let's talk about jellyfish",
              description: "Let's talk baout jellyfish!",
   

              posts: [{
                title: "My favorite jellyfish",
                body: "My faovirite jellyfish is the immortal jellyfish!",
                userId: this.user.id
              }]
            }, {
   

              include: {
                model: Post,
                as: "posts"
              }
            })
            .then((topic) => {
              this.topic = topic; //store the topic
              this.post = topic.posts[0]; //store the post
              done();
            })
          })
        });
      });

    describe("#create()", () => {

        it("should create a topic object with a title and a description", (done) => {

            Topic.create({
                title: "Why the immortal jellyfish is the best jellyfish",
                description: "A single specimen of the immortal jellyfish can be billions of years old!",
            })
            .then((topic) => {

                expect(topic.title).toBe("Why the immortal jellyfish is the best jellyfish");
                expect(topic.description).toBe("A single specimen of the immortal jellyfish can be billions of years old!");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a topic with a missing title or description", (done) => {

            Topic.create({
              title: "Why the immortal jellyfish is the best jellyfish",
              description: "A single specimen of the immortal jellyfish can be billions of years old!"
            })
            .then((topic) => {
       
              done();
       
            })
            .catch((err) => {
       
              expect(err.message).toContain("Topic.title cannot be null");
              expect(err.message).toContain("Topic.description cannot be null");
              done();
       
            })
          });
        });


        describe("#getPosts()", () => {

            it("should return the associated posts", (done) => {

                Topic.create({
                    title: "Tired of Talking About Space? Let's Talk About Jellyfish",
                    description: "A discussion about jellyfish"
                })

                Post.create({
                    title: "My favorite jellyfish",
                    body: "My favorite jellyfish is the immortal jellyfish, Turritopsis dohrnii!",
                    topicId: this.topic.id,
                    userId: this.user.id
                })
                .then((post) => {
                    this.topic.getPosts()
                      .then((associatedPosts) => {
                          expect(associatedPosts[0].title).toBe("My favorite jellyfish")
                          done();
                        })
                   });
              });
          });
    });
    