const Observation = require('../../data/models/observation');


const birds = [
    'Pica Pica',
    'Alauda Arvensis',
    'Apus Apus',
    'Larus Argentatus',
    'Mergus Mergansser',
    'Aythia Ferina',
    'Turdus Philomecus',
    'Passer Domesticus'
];


module.exports.allObservations = () => {
    var observations = [];
    //observations.append(observationSet_20160524().map(toObservationInstance()));
    observations.append(observationSet_20170520().map(toObservationInstance()));
    //observations.append(observationSet_20170524().map(toObservationInstance()));

    return observations;
}

function toObservationInstance(json) {
    return new Observation(json);
}


// 3 observations, 3 species, 15 birds, date 20.5.2017
// 2 * Pica Pica, state "p"
// 12 * Passer Domesticus, state "p"
// 2 * Turdus Philomecus, state "Än"
function observationSet_20170520() {
    const observations = [{
            "species": "Pica Pica",
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9
            },
            "year": 2017,
            "count": 2,
            "state": "p",
            "time": "1495227600000"
        },
        {
            "species": 'Passer Domesticus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2017,
            "count": 12,
            "state": "p",
            "time": "1495227600000"
        },
        {
            "species": 'Turdus Philomecus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2017,
            "count": 2,
            "state": "Än",
            "time": "1495227600000"
        }
    ]
    return observations;
}

// 4 observations, 4 species, 15 birds, date 24.5.2017
// 2 * Aythia Ferina, state "p"
// 5 * Larus Argentatus, state "p"
// 1 * Alauda Arvensis, state "Än"
// 7 * Apus Apus, state "Än"
function observationSet_20170524() {
    const observations = [{
            "species": 'Aythia Ferina',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2017,
            "count": 2,
            "state": "p",
            "time": "1495573200000"
        },
        {
            "species": 'Larus Argentatus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2017,
            "count": 5,
            "state": "p",
            "time": "1495573200000"
        },
        {
            "species": 'Alauda Arvensis',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2017,
            "count": 1,
            "state": "Än",
            "time": "1495573200000"
        },
        {
            "species": 'Apus Apus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 5
            },
            "year": 2017,
            "count": 7,
            "state": "Än",
            "time": "1495573200000"
        }
    ];
    return observations;
}

// 5 observations, 5 species, 27 birds, date 24.5.2016
// 2 * Aythia Ferina, state "p"
// 1 * Larus Argentatus, state "p"
// 3 * Alauda Arvensis, state "Än"
// 17 * Apus Apus, state "Än"
// 4 * Mergus Merganser, state "p"
function observationSet_20160524() {
    const observations = [{
            "species": 'Aythia Ferina',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2016,
            "count": 2,
            "state": "p",
            "time": "1464037200000"
        },
        {
            "species": 'Larus Argentatus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2016,
            "count": 1,
            "state": "p",
            "time": "1464037200000"
        },
        {
            "species": 'Alauda Arvensis',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 3.9000000953674316
            },
            "year": 2016,
            "count": 3,
            "state": "Än",
            "time": "1464037200000"
        },
        {
            "species": 'Apus Apus',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 5
            },
            "year": 2016,
            "count": 17,
            "state": "Än",
            "time": "1464037200000"
        },
        {
            "species": 'Mergus Merganser',
            "location": {
                "lat": 60.2187743,
                "lng": 25.0159759,
                "accuracy": 5
            },
            "year": 2016,
            "count": 4,
            "state": "p",
            "time": "1464037200000"
        }
    ];
    return observations;
}
