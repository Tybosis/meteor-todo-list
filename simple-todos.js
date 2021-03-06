Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Session.setDefault('counter', 0);

  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // this function is called when the new task form is submitted
      //
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      // clear form
      event.target.text.value = "";
      // prevent default form submit
      return false;
    }
  });

  Template.task.events({
    "click .toggle-checked": function () {
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
