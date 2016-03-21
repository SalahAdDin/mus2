Toolbars = new Mongo.Collection("toolbars");
Scores = new Mongo.Collection("scores");


if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    // var accidentals = Vex.Flow.accidentalCodes.accidentals;
    var accidentals = Vex.Flow.accidentalCodes;
    console.log(Vex.Flow.accidentalCodes.accidentals);
    console.log(accidentals);

    // helpers
    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });


    console.log("startup.js says: " + Toolbars.find().count());

    Template.play_toolbar.helpers({
        group: function(){
            var main = Toolbars.find({name: 'main_toolbar'}, {items: 1, _id: 0}).fetch();
            console.log(main);
            return main[0].items
        },
        // group: music_toolbar,
        ifProgressBar: function (name) {
            return name === 'playback'
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

        for (var i=0; i<stavesNumber; i++){
            var stave = new Vex.Flow.Stave(25, (100*i), 800);
            if((i+1)==stavesNumber) stave.setEndBarType(Vex.Flow.Barline.type.END);
            stave.addClef("treble").addTimeSignature("4/4").setContext(ctx).draw();
            for (var j= 1; j<=verticalBarsNumber; j++){
                // console.log((canvas.width/verticalBarsNumber)*j);
                stave.drawVerticalBar((canvas.width/verticalBarsNumber)*j, false);
            }
        }
    });

    // events
    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.play_toolbar.events({
        // TODO: Get current session for know if edit a score or created score(is new score?)
        // TODO: Is not new score, get all information and pull the form
        'click .js-show-score-info-form':function(event){
            $('#score_edit_form').modal('show');
        }
    });

    Template.score_info_form.events({
        // TODO: Use update if edit a score
        'submit .js-edit-score-info':function(event){
            var title, subtitle, composer, lyricist, author, description;
            title = event.target.score_tit.value;
            subtitle = event.target.score_subt.value;
            composer = event.target.score_comp.value;
            lyricist = event.target.score_lyr.value;
            author = event.target.score_ath.value;
            description = event.target.score_des.value;

            console.log("title: "+title+"\nsubtitle:"+subtitle);

            Scores.insert({
                title: title,
                subtitle: subtitle,
                composer: composer,
                lyricist: lyricist,
                description: description,
                author: author,
                createdOn: new Date()
            });


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
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
