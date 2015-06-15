Licenses = new Mongo.Collection("licenses");

if (Meteor.isClient) {

    Template.body.helpers({
        licenses: function () {
            return Licenses.find({}, {sort: {name: -1}});
        }
    });

    Template.body.events({
        "submit .new-license": function (event) {
            var company = event.target.companyBox.value;
            var product = event.target.productBox.value;
            var edition = event.target.editionBox.value;
            var version = event.target.versionBox.value;
            var key = event.target.keyBox.value;
            var other = event.target.otherBox.value;

            Licenses.insert({
                company: company,
                product: product,
                edition: edition,
                version: version,
                key: key,
                other: other,
                createdAt: new Date()
            });

            event.target.companyBox.value = "";
            event.target.productBox.value = "";
            event.target.editionBox.value = "";
            event.target.versionBox.value = "";
            event.target.keyBox.value = "";
            event.target.otherBox.value = "";

            return false;
        }
    })

    Template.license.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of what it is now.
            Licenses.update(this._id, {$set: {checked: ! this.checked}});
        },
        "click .delete": function () {
            Licenses.remove(this._id);
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
