from models.user import User
from models.comment import Comment
from models.song import Song

list_users = [
    User(username='Nick', password='nick', email='nick@nick.com'),
    User(username='Deadmau6', password='deadmau6', email='deadmau6@deadmau6.com')
]

list_songs = [
    Song(content={
    "comments": [],
    "drums": [
      [
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": "0.4"
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": "0.5"
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        }
      ],
      [
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": "0.6"
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": "0.3"
        }
      ],
      [
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": "0.5"
        },
        {
          "edit": 0,
          "playNote": "C1",
          "probability": 1
        }
      ],
      [
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        },
        {
          "edit": 0,
          "playNote": "-",
          "probability": 1
        }
      ]
    ],
    "genre": "Electronica",
    "grid": [
      [
        "0",
        "-",
        "-",
        "-",
        "-",
        "0",
        "-",
        "-",
        "-",
        "-",
        "0",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "1",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "1"
      ],
      [
        "-",
        "-",
        "2",
        "-",
        "-",
        "-",
        "-",
        "2",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "2",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "3",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "3",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "4",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "6",
        "-",
        "6",
        "-",
        "-",
        "6",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ]
    ],
    "hatEffect": "Delay",
    "kickEffect": "None",
    "likes": [],
    "notes": [
      "F2",
      "D#2",
      "C#2",
      "A#1",
      "G#1",
      "F1",
      "D#1",
      "C#1"
    ],
    "octave": 1,
    "osc1": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "0",
      "6",
      "2",
      "6",
      "-",
      "0",
      "6",
      "-",
      "3",
      "2",
      "1"
    ],
    "osc1Effect": "Bitcrusher",
    "osc1Settings": {
      "envelope": {
        "attack": "0.142",
        "decay": "1.031",
        "release": "0.702",
        "sustain": "0.18"
      },
      "oscType": "sawtooth",
      "synthType": "FMSynth",
      "volume": 0
    },
    "osc2Effect": "Distortion",
    "osc2Settings": {
      "envelope": {
        "attack": "0.035",
        "decay": "1.951",
        "release": "0.047",
        "sustain": "0.518"
      },
      "oscType": "pulse",
      "synthType": "Synth",
      "volume": -22.378999999999998
    },
    "percEffect": "None",
    "polyGrid": [
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "0",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "1",
        "-",
        "1"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "3",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "6",
        "-",
        "6",
        "-",
        "6",
        "-",
        "6",
        "-",
        "6",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ],
      [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
      ]
    ],
    "polySynth": [
      {
        "edit": 0,
        "playNote": [
          "6"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "6"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "6"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "6"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "6"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "0",
          "3"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "1"
        ],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [],
        "probability": 1
      },
      {
        "edit": 0,
        "playNote": [
          "1"
        ],
        "probability": 1
      }
    ],
    "snareEffect": "None",
    "songKey": "C#",
    "songName": "In the kitchen",
    "songScale": "majorPentatonic",
    "tempo": 140,
    "user": None
  }, user_id=1),
  Song(content={
        "comments": [],
        "drums": [
          [
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": "0.4"
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": "0.5"
            }
          ],
          [
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            }
          ],
          [
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            }
          ],
          [
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": "0.3"
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": "0.3"
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": "0.4"
            },
            {
              "edit": 0,
              "playNote": "-",
              "probability": 1
            },
            {
              "edit": 0,
              "playNote": "C1",
              "probability": 1
            }
          ]
        ],
        "genre": "Electronica",
        "grid": [
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "3",
            "-",
            "-",
            "-",
            "-",
            "3",
            "-",
            "-",
            "3",
            "-",
            "3",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "4",
            "-",
            "-",
            "-",
            "-",
            "-",
            "4",
            "4",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "5",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ]
        ],
        "hatEffect": "Delay",
        "kickEffect": "Bitcrusher",
        "likes": [],
        "notes": [
          "A1",
          "G1",
          "F1",
          "E1",
          "D1",
          "C1",
          "B0",
          "A0"
        ],
        "octave": 0,
        "osc1": [
          "3",
          "-",
          "-",
          "-",
          "-",
          "3",
          "4",
          "5",
          "3",
          "-",
          "3",
          "-",
          "4",
          "4",
          "-",
          "-"
        ],
        "osc1Effect": "Chorus",
        "osc1Settings": {
          "envelope": {
            "attack": "0.195",
            "decay": "0.249",
            "release": 0.01,
            "sustain": 1
          },
          "oscType": "square",
          "synthType": "FMSynth",
          "volume": 0
        },
        "osc2Effect": "None",
        "osc2Settings": {
          "envelope": {
            "attack": "0.415",
            "decay": 0.1,
            "release": 1,
            "sustain": 0.3
          },
          "oscType": "pulse",
          "synthType": "Synth",
          "volume": 0
        },
        "percEffect": "None",
        "polyGrid": [
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "3",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "3",
            "-",
            "3",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "4",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ]
        ],
        "polySynth": [
          {
            "edit": 0,
            "playNote": [
              "3"
            ],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [
              "3"
            ],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [
              "3"
            ],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [
              "4"
            ],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          },
          {
            "edit": 0,
            "playNote": [],
            "probability": 1
          }
        ],
        "snareEffect": "None",
        "songKey": "A",
        "songName": "Spiral",
        "songScale": "naturalMinor",
        "tempo": 170,
        "user": None
      }, user_id=2)
]

# Song(content={}, user_id=whatever)

list_comments = [
    Comment(content='Great song!', user_id=2, song_id=1),
]