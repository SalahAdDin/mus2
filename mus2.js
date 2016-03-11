if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    // play toolbar
    var music_toolbar = [
        {
            name: 'Play buttons',
            class: '',
            help_text: '',
            items: [
                {
                    name: 'Backward',
                    class: 'backward',
                    help_text: ''
                },
                {
                    name: 'Play',
                    class: 'play'
                },
                {
                    name: 'Forward',
                    class: 'forward'
                },
                {
                    name: 'name',
                    class: 'stop'
                }
            ]
        },
        {
            name: 'Playback tools',
            class: 'col-xs-12 col-md-3',
            help_text: '',
            items: [

                {
                    name: 'Playback progress',
                    class: 'playback'
                },
                {
                    name: 'Metronome',
                    class: 'clock-o'
                }
            ]
        },
        {
            name: 'Tools',
            class: '',
            help_text: '',
            items: [
                {
                    class: 'save'
                },
                {
                    class: 'plus'
                }
            ]
        },
        {
            name: 'View tools',
            class: '',
            help_text: '',
            items: [
                {
                    class: 'search-plus'
                },
                {
                    class: 'search-minus'
                }
            ]
        },
        {
            name: 'Sheet tools',
            class: '',
            help_text: '',
            items: [
                {
                    class: 'hashtag'
                },
                {
                    class: 'wrench'
                },
                {
                    class: 'align-justify'
                },
                {
                    class: 'arrows-alt'
                }

            ]
        },
        {
            name: 'Info',
            class: '',
            help_text: '',
            items: [
                {
                    class: 'info-circle'
                }
            ]
        }
    ];

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

    Template.play_toolbar.helpers({
        group: music_toolbar,
        ifProgressBar: function(name) {
        return name === 'playback'}
    });

    Template.accidentals_bar.helpers({accidents:accidentals});

    Template.sheet_canvas.helpers({});

    // events
    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
