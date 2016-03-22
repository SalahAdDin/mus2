// if (Meteor.isClient) {

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 5
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email'
    },
    pwd
]);

// counter starts at 0
Session.setDefault('counter', 0);

// var accidentals = Vex.Flow.accidentalCodes.accidentals;
var accidentals = Vex.Flow.accidentalCodes;
console.log(Vex.Flow.accidentalCodes.accidentals);
console.log(accidentals);

// helpers
Template.body.helpers({
    username: function () {
        return "dunno... who are you?"
    }
});

Template.hello.helpers({
    counter: function () {
        return Session.get('counter');
    },

    username: function () {
        if (Meteor.user()) {
            return Meteor.user().username;
            //return Meteor.user().emails[0].address;
        }
        else {
            return "Anonymous user... who are you?"
        }
    }
});


// console.log("startup.js says: " + Toolbars.find().count());

Template.play_toolbar.helpers({
    group: function () {
        var main = Toolbars.find({name: 'main_toolbar'}, {items: 1, _id: 0}).fetch();
        console.log(main);
        return main[0].items
    },
    // group: music_toolbar,
    ifProgressBar: function (name) {
        return name === 'playback'
    }
});

// TODO: Implements get the current user session id
// TODO: Implements same prepopulated fields but when are editing the Score
Template.score_info_form.helpers({
    getAuthor: function (user_id) {
        var user = Meteor.users.findOne({_id: user_id});
        if (user) {
            return user.username;
        }
        else {
            return "";
        }

    }
});

Template.accidentals_bar.helpers({accidents: accidentals});

Template.sheet_canvas.helpers({});

// onRendered
Template.sheet_canvas.onRendered(function () {
    var canvas = $("#sheet")[0];
    console.log(canvas.width);
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

    var ctx = renderer.getContext();

    var verticalBarsNumber = 6;
    var stavesNumber = 3;

    for (var i = 0; i < stavesNumber; i++) {
        var stave = new Vex.Flow.Stave(25, (100 * i), 800);
        if ((i + 1) == stavesNumber) stave.setEndBarType(Vex.Flow.Barline.type.END);
        stave.addClef("treble").addTimeSignature("4/4").setContext(ctx).draw();
        for (var j = 1; j <= verticalBarsNumber; j++) {
            // console.log((canvas.width/verticalBarsNumber)*j);
            stave.drawVerticalBar((canvas.width / verticalBarsNumber) * j, false);
        }
    }
});

/*
 Template.score_info_form.onRendered(function(){
 var author_input_field = $("score_ath")[0];
 if (Meteor.user())
 author_input_field.value = Meteor.user();

 });
 */

// events
Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    },
    'click #at-nav-button': function (event) {
        if (!Meteor.user()) $('#signin_form').modal('show');
    }
});

Template.play_toolbar.events({
    // TODO: Get current session for know if edit a score or created score(is new score?)
    // TODO: Is not new score, get all information and pull the form
    'click .js-show-score-info-form': function (event) {
        $('#score_edit_form').modal('show');
    }
});

Template.score_info_form.events({
    // TODO: Use update if edit a score
    'submit .js-edit-score-info': function (event) {
        var title, subtitle, composer, lyricist, author, description;
        title = event.target.score_tit.value;
        subtitle = event.target.score_subt.value;
        composer = event.target.score_comp.value;
        lyricist = event.target.score_lyr.value;
        author = event.target.score_ath.value;
        description = event.target.score_des.value;

        console.log("title: " + title + "\nsubtitle:" + subtitle);

        if (Meteor.user()) {

            // TODO: This works when score is news, so, if isn't new, doesn't change the scores's author

            Scores.insert({
                title: title,
                subtitle: subtitle,
                composer: composer,
                lyricist: lyricist,
                description: description,
                // author: author,
                author: Meteor.user()._id,
                createdOn: new Date()
            });
        }


        $('#score_edit_form').modal('hide');

        return false;
    }
});

/*
 Meteor.startup(function () {
 var canvas = $("#sheet")[0];
 var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

 var ctx = renderer.getContext();
 var stave = new Vex.Flow.Stave(25, 0, 800);

 stave.setContext(ctx).draw();

 });
 */
// }

