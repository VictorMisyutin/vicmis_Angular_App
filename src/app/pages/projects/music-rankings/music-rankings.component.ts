import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-rankings',
  templateUrl: './music-rankings.component.html',
  styleUrl: './music-rankings.component.css'
})
export class MusicRankingsComponent implements OnInit {
  genre_options: string[] = ['rock', 'pop', 'jazz', 'hip hop', 'country', 'classical', 'all'];
  current_genre:string = '';

  // artist lists
  rock_artists: string[] = [
    'The Beatles',
    'Led Zepplin',
    'Pink Floyd',
    'Jimi Hendrix',
    'The Rolling Stones',
    'Black Sabbath',
    'Elvis Presely',
    'Queen',
    'The Clash',
    'The Strokes',
    'The Cure',
    'The Arctic Monkeys',
    'Bob Dylan',
    'Nirvana',
    'The Doors',
    'The Who',
    'Billy Joel',
    'Dire Straits',
    'The Talking Heads',
    'King Crimson',
    'Steely Dan',
    'Fleetwood Mac',
    'Santana',
    'Lynyrd Skynyrd',
    'Iron Maidon',
    'The Smiths',
    'Pearl Jam',
    'Pixies',
    'The Eagles',
    'AC/DC',
    'Radiohead',
    'Metallica',
    'Aerosmith',
    'The Police',
    'The Smashing Pumpkins',
    'Def Leppard',
    'Foo Fighters',
    'Red Hot Chilli Peppers',
    'Electric Light Orchestra',
    'Green Day',
    'Nickelback',
    "Prince"
  ];

  pop_artists: string[] = [
    "Michael Jackson",
    "Madonna",
    "Elton John",
    "Elvis Presley",
    "The Beatles",
    "Whitney Houston",
    "Mariah Carey",
    "Celine Dion",
    "Rihanna",
    "Taylor Swift",
    "Adele",
    "Lady Gaga",
    "Beyoncé",
    "Britney Spears",
    "Bruno Mars",
    "Justin Bieber",
    "Katy Perry",
    "Ed Sheeran",
    "Usher",
    "Janet Jackson",
    "Prince",
    "Stevie Wonder",
    "Phil Collins",
    "Lionel Richie",
    "Paul McCartney",
    "George Michael",
    "Whitney Houston",
    "Shakira",
    "Ariana Grande",
    "Billie Eilish"
  ];

  jazz_artists: string[] = [
    "Miles Davis",
    "John Coltrane",
    "Louis Armstrong",
    "Duke Ellington",
    "Charlie Parker",
    "Thelonious Monk",
    "Billie Holiday",
    "Ella Fitzgerald",
    "Herbie Hancock",
    "Chet Baker",
    "Stan Getz",
    "Charles Mingus",
    "Dizzy Gillespie",
    "Wynton Marsalis",
    "Art Blakey",
    "Sonny Rollins",
    "Sarah Vaughan",
    "Oscar Peterson",
    "Count Basie",
    "Nina Simone",
    "Dave Brubeck",
    "Wayne Shorter",
    "Joe Henderson",
    "Cannonball Adderley",
    "Keith Jarrett",
    "Ornette Coleman",
    "Pat Metheny",
    "Chick Corea",
    "McCoy Tyner",
    "Gerry Mulligan"
];

 hiphop_artists: string[] = [
  "2pac",
  "The Notorious B.I.G.",
  "Jay-Z",
  "Eminem",
  "Nas",
  "Dr. Dre",
  "Kanye West",
  "Snoop Dogg",
  "Kendrick Lamar",
  "Ice Cube",
  "Rakim",
  "OutKast",
  "Wu-Tang Clan",
  "Lil Wayne",
  "Nicki Minaj",
  "Missy Elliott",
  "Mos Def",
  "Run-DMC",
  "Busta Rhymes",
  "DMX",
  "50 Cent",
  "Scarface",
  "A Tribe Called Quest",
  "Method Man",
  'Drake',
  'J. Cole',
  'Logic',
  'Lil Uzi Vert',
  'Future',
  'Gunna',
  'MF Doom',
  '21 Savage',
  'Ludacris',
  'Tyler The Creator',
  'Travis Scott',
  'Central Cee',
  'Stormzy',
  'Metro Boomin',
  'Offset',
  'Lil Tecca',
  'Megan Thee Stallion',
  'Lauryn Hill',
  'Cardi B',
  'Ice Spice',
  'Sexyy Red',
  'Doja Cat',
  "A$AP Rocky",
  "Childish Gambino",
  "Chance the Rapper",
  "Migos",
  "Post Malone",
  "Playboi Carti",
  "Lil Nas X",
  "Pusha T",
  "Rick Ross",
  "Big Sean",
  "YG",
  "Juice WRLD",
  "Lil Baby",
  "DaBaby",
  "Roddy Ricch",
  "Pop Smoke",
  "Young Thug"
];


  country_artists: string[] = [
    "Johnny Cash",
    "Dolly Parton",
    "Willie Nelson",
    "Garth Brooks",
    "Reba McEntire",
    "George Strait",
    "Hank Williams",
    "Merle Haggard",
    "Loretta Lynn",
    "Kenny Rogers",
    "Patsy Cline",
    "Shania Twain",
    "Alan Jackson",
    "Tim McGraw",
    "Faith Hill",
    "Carrie Underwood",
    "Blake Shelton",
    "Miranda Lambert",
    "Keith Urban",
    "Randy Travis",
    "Luke Bryan",
    "Jason Aldean",
    "Brad Paisley",
    "Alabama",
    "Brooks & Dunn",
    "Vince Gill",
    "Chris Stapleton",
    "Kacey Musgraves",
    "Eric Church",
    "Florida Georgia Line"
  ];

  classical_artists: string[] = [
    "Ludwig van Beethoven",
    "Johann Sebastian Bach",
    "Wolfgang Amadeus Mozart",
    "Franz Schubert",
    "Richard Wagner",
    "Pyotr Ilyich Tchaikovsky",
    "Johannes Brahms",
    "Franz Liszt",
    "Frederic Chopin",
    "Antonio Vivaldi",
    "Igor Stravinsky",
    "Joseph Haydn",
    "Felix Mendelssohn",
    "Gustav Mahler",
    "Hector Berlioz",
    "Robert Schumann",
    "Claude Debussy",
    "Maurice Ravel",
    "Sergei Rachmaninoff",
    "Giacomo Puccini",
    "Antonín Dvořák",
    "George Frideric Handel",
    "Dmitri Shostakovich",
    "Gabriel Fauré",
    "Edward Elgar",
    "Jean Sibelius",
    "Sergei Prokofiev",
    "Anton Bruckner",
    "Camille Saint-Saëns",
    "Béla Bartók"
  ]

  rankings: string[] = [];
  currentArtist: string = '';

  ngOnInit(): void {
    this.rankings = ['', '', '', '', '', '', '', '', '', ''];
  }

  changeGenre(genre: string){
    this.rankings = ['', '', '', '', '', '', '', '', '', ''];
    document.getElementById(this.current_genre)?.classList.remove('selected');
    this.current_genre = genre;
    document.getElementById(genre)?.classList.add('selected');
  }

  resetRankings(){
    this.rankings = ['', '', '', '', '', '', '', '', '', ''];
  }
  
  rollNewArtist() {
    if(this.current_genre == '')
    {
      alert("please select a genre");
      return;
    }
    let currentArr: string[] = [];
    switch (this.current_genre.toLowerCase()) {
      case 'rock':
        currentArr = this.rock_artists;
        break;
      case 'pop':
        currentArr = this.pop_artists;
        break;
      case 'jazz':
        currentArr = this.jazz_artists;
        break;
      case 'hip hop':
        currentArr = this.hiphop_artists;
        break;
      case 'classical':
        currentArr = this.classical_artists;
        break;
      case 'all':
        currentArr = [
          ...this.rock_artists,
          ...this.pop_artists,
          ...this.jazz_artists,
          ...this.hiphop_artists,
          ...this.classical_artists
        ];
        break;
      default:
        return;
    }
  
    const pickRandomArtist = () => {
      return currentArr[Math.floor(Math.random() * currentArr.length)];
    };
  
    const numberOfShuffles = 15;
    let currentShuffleNumber = 0;
    let randomArtist = 'asdasdadasdsadas';
  
    const shuffle = () => {
      if (currentShuffleNumber < numberOfShuffles) {
        randomArtist = pickRandomArtist();
        this.currentArtist = randomArtist;
        currentShuffleNumber++;
        setTimeout(shuffle, 100); // wait 0.1 seconds and shuffle again
      } else {
        while(this.rankings.includes(randomArtist)){
          randomArtist = pickRandomArtist();
          this.currentArtist = randomArtist;
        }
      }
    };

    shuffle();
  }
  
  setRank(index: number){
    this.rankings[index] = this.currentArtist;
  }
}
