"use strict";

/**
 * Sample transaction
 * @param {org.acme.immutable.SetUpDemo} setUpDemo
 * @transaction
 */
async function setUpDemo(setUpDemo) {
  var factory = getFactory();
  var NS = "org.acme.immutable";

  var user = factory.newResource(NS, "User", "1111");
  user.firstName = "Rupert";

  var user1 = factory.newResource(NS, "User", "1112");
  user1.firstName = "Francesco";

  var user2 = factory.newResource(NS, "User", "1113");
  user2.firstName = "Bob";

  var user3 = factory.newResource(NS, "User", "1114");
  user3.firstName = "Cindy";

  return getParticipantRegistry(NS + ".User").then(function(userRegistry) {
    return userRegistry.addAll([user, user1, user2, user3]);
  });
}

/**
 * Make Post
 * @param {org.acme.immutable.MakePost} makePost
 * @transaction
 */
async function makePost(makePost) {
  return getAssetRegistry("org.acme.immutable.Post").then(function(result) {
    var factory = getFactory();
    var newPost = factory.newResource("org.acme.immutable", "Post", "9999");
    var rs = factory.newRelationship("org.acme.immutable", "User", "1111");

    newPost.content = "This is a post from Rupert!";
    newPost.owner = rs;
    newPost.date = "today";

    //continue with property assignments and any logic you have
    //when you are done and everything looks good you can continue
    return result.add(newPost);
  });
}
