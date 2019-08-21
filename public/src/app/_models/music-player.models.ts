export interface Song {
  name: string;
}

export interface Album {
  name: string;
  songs: Song[];
}

export interface Artist {
  name: string;
  albums: Album[];
}

export const LIBRARY: Artist[] = [
  {
    name: "The Beatles",
    albums: [
      {
        name: "Abbey Road",
        songs: [
          { name: "Come Together" },
          { name: "Something" },
        ]
      },
      {
        name: "Hey Jude",
        songs: [
          { name: "Hey Jude" },
          { name: "Can't Buy Me Love" },
        ]
      },
      {
        name: "Beatles for Sale",
        songs: [
          { name: "Mr. Moonlight" },
          { name: "Eight Days a Week" },
        ]
      }
    ]
  },
  {
    name: "Rick Astley",
    albums: [
      {
        name: "Whenever You Need Somebody",
        songs: [
          { name: "Never Gonna Give You Up" },
          { name: "Together Forever" },
        ]
      }
    ]
  }
]
