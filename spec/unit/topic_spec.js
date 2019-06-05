const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Tired of Talking About Space? Let's Talk About Jellyfish",
                description: "A discussion about jellyfish"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "My favorite jellyfish",
                    body: "My favorite jellyfish is the immortal jellyfish, Turritopsis dohrnii!",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
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
    