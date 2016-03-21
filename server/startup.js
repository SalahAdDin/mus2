/**
 * Created by salahaddin on 19/03/16.
 */
if (Meteor.isServer) {

    Meteor.startup(function () {
        if (Toolbars.find().count() == 0) {
            Toolbars.insert(
                {
                    name: 'main_toolbar',
                    class: '',
                    title: 'Play toolbar',
                    items: [
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
                            help_text: 'Score information',
                            items: [
                                {
                                    name: 'Information',
                                    class: 'info-circle js-show-score-info-form',
                                    help_text: 'Edit score information'
                                }
                            ]
                        }
                    ]
                }
            );
            console.log("startup.js says: " + Toolbars.find().count());
        }
    });

}