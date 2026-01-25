export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
}

export interface Song {
  id: string;
  title: string;
  artistName: string;
  artistImage: string;
  lyrics: string;
}

export const ARTISTS: Artist[] = [
  {
    id: "1",
    name: "Kevin Smokio",
    image: "https://th.bing.com/th/id/OIP.zjGXzFC0f_b0MsGuURJVAgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    genre: "Hip-Hop",
  },
  {
    id: "2",
    name: "J. Cole",
    image: "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/481953762_1216585003158079_6857051442189892721_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dx8EJSROG2cQ7kNvwFlsVrs&_nc_oc=AdkCM5ee3RF9yVimw9BwacS9J5yNMMnRjjrGbmjEEVQwLwnr2XGS3aRrJBq2mwA5jxM&_nc_zt=23&_nc_ht=scontent.fcmb1-2.fna&_nc_gid=8HfWtqzfGXkTYlhxFJRvwg&oh=00_AfpnjCJvWbn1_mcGlyvccriyhghhhS-hGciw9b5-aaeMNw&oe=697B781B",
    genre: "Hip-Hop",
  },
  {
    id: "3",
    name: "Drake",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    genre: "Hip-Hop",
  },
  {
    id: "4",
    name: "Travis Scott",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    genre: "Hip-Hop",
  },
  {
    id: "5",
    name: "Lil Baby",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    genre: "Trap",
  },
  {
    id: "6",
    name: "21 Savage",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    genre: "Trap",
  },
  {
    id: "7",
    name: "Future",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    genre: "Trap",
  },
  {
    id: "8",
    name: "Nas",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
    genre: "Hip-Hop",
  },
];

export const SONGS: Song[] = [
  {
    id: "1",
    title: "HUMBLE.",
    artistName: "Kevin Smokio",
    artistImage: "https://th.bing.com/th/id/OIP.zjGXzFC0f_b0MsGuURJVAgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    lyrics: `[Verse 1]
Nobody pray for me
It's been that day for me
Way (Yeah, yeah!)
Ayy, I remember syrup sandwiches and crime allowances
Finesse a n***a with some counterfeits
But now I'm countin' this
Parmesan where my accountant lives
In fact, I'm downin' this
D'USSÉ with my boo bae, tastes like Kool-Aid for the analysts
Girl, I can buy yo' ass the world with my paystub
Ooh, that p***y good, won't you sit it on my taste bloods?

[Chorus]
I'm so f**kin' sick and tired of the Photoshop
Show me somethin' natural like afro on Richard Pryor
Show me somethin' natural like ass with some stretch marks
Still will take you down right on your mama's couch in Polo socks, ayy
This s**t way too crazy, ayy, you do not amaze me, ayy
I blew cool from AC, ayy, Obama just paged me, ayy
I don't fabricate it, ayy, most of y'all be fakin', ayy
I stay modest 'bout it, she elaborate it, ayy
This that Grey Poupon, that Evian, that TED Talk, ayy
Watch my soul speak, you let the meds talk, ayy

[Hook]
If I quit this season, I still be the greatest, funk
My left stroke just went viral
Right stroke put lil' baby in a spiral
Soprano C, we like to keep it on a high note
It's levels to it, you and I know
B***h, be humble (Hol' up, b***h)
Sit down (Hol' up, lil', hol' up, lil' b***h)
Be humble (Hol' up, b***h)
Sit down (Hol' up, sit down, lil', sit down, lil' b***h)
Be humble (Hol' up, hol' up)`,
  },
  {
    id: "2",
    title: "No Role Modelz",
    artistName: "J. Cole",
    artistImage: "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/481953762_1216585003158079_6857051442189892721_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dx8EJSROG2cQ7kNvwFlsVrs&_nc_oc=AdkCM5ee3RF9yVimw9BwacS9J5yNMMnRjjrGbmjEEVQwLwnr2XGS3aRrJBq2mwA5jxM&_nc_zt=23&_nc_ht=scontent.fcmb1-2.fna&_nc_gid=8HfWtqzfGXkTYlhxFJRvwg&oh=00_AfpnjCJvWbn1_mcGlyvccriyhghhhS-hGciw9b5-aaeMNw&oe=697B781B",
    lyrics: `[Intro]
First things first, rest in peace Uncle Phil
For real, you the only father that I ever knew
I get my b***h pregnant, I'ma be a better you
Prophecies that I made way back in the Ville
Fulfilled

[Chorus]
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved

[Verse 1]
Fool me one time, shame on you
Fool me twice, can't put the blame on you
Fool me three times, f**k the peace sign
Load the chopper, let it rain on you
My only regret was too young for Lisa Bonet
My only regret was too young for Nia Long
Now all I'm left with is hoes from reality shows
Hand her a script, the b***h probably couldn't read along
My wifey, she from Philly, she tell me Meek get back
That's the s**t I don't like
I'm tryna disregard what people say
Debate 'bout this, debate 'bout that
This n***a too wack, that n***a the s**t
But I can't help but feel like I missed
My opportunity, was it too late by 27?
Socrates asked, "Who is the wisest of men?"
The Oracle responded, "It is Socrates"
For I know one thing, and that's that I know nothing

[Chorus]
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved
Don't save her, she don't wanna be saved`,
  },
  {
    id: "3",
    title: "God's Plan",
    artistName: "Drake",
    artistImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    lyrics: `[Intro]
Yeah, they wishin' and wishin' and wishin' and wishin'
They wishin' on me, yuh

[Chorus]
I been movin' calm, don't start no trouble with me
Tryna keep it peaceful is a struggle for me
Don't pull up at 6 AM to cuddle with me
You know how I like it when you lovin' on me
I don't wanna die for them to miss me
Yes, I see the things that they wishin' on me
Hope I got some brothers that outlive me
They gon' tell the story, s**t was different with me

God's plan, God's plan
I hold back, sometimes I won't, yuh
I feel good, sometimes I don't, ayy, don't
I finessed down Weston Road, ayy, 'nessed
Might go down a G.O.D., yeah, wait
I go hard on Southside G, yuh, wait
I make sure that north-side eat

[Verse 1]
And still
Bad things
It's a lot of bad things
That they wishin' and wishin' and wishin' and wishin'
They wishin' on me
Bad things
It's a lot of bad things
That they wishin' and wishin' and wishin' and wishin'
They wishin' on me
Yeah, ayy, ayy

[Bridge]
She say, "Do you love me?" I tell her, "Only partly"
I only love my bed and my momma, I'm sorry
Fifty Dub, I even got it tatted on me
81, they'll bring the crashers to the party
And you know me
Turn the O2 into the O3, dog
Without 40, Oli, there'd be no me
'Magine if I never met the broskies`,
  },
  {
    id: "4",
    title: "SICKO MODE",
    artistName: "Travis Scott",
    artistImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    lyrics: `[Intro: Drake]
Astro, yeah
Sun is down, freezin' cold
That's how we already know, winter's here
My dawg would probably do it for a Louis belt
That's just all he know, he don't know nothin' else
I tried to show 'em, yeah
I tried to show 'em, yeah, yeah
Yeah, yeah, yeah
Gone on you with the pick and roll
Young LaFlame, he in sicko mode

[Chorus: Drake]
Woo, made this here with all the ice on in the booth
At the gate outside, when they pull up, they get me loose
Yeah, Jump Out boys, that's Nike boys, hoppin' out coupes
This s**t way too big, when we pull up, give me the loot
(Give me the loot!)
Was off the Remy, had a Papoose
Had to hit my old town to duck the news
Two-four hour lockdown, we made no moves
Now it's 4AM and I'm back up poppin' with the crew
I just landed in, Chase B mixes pop like Jamba Juice
Different colored chains, think my jeweler really sellin' fruits
And they chokin', man, know the crackers wish it was a noose

[Verse 1: Travis Scott]
Some—someone said
Mothaf**kas ain't playin', though
I don't talk, I just walk my way out
Ooh, don't play, we don't play, no way, yeah
Someone said, "Bands out, motherf**kas"
Down, yeah
Like a light, ayy, yeah
Like a light, ayy, yeah
Slept through the flight, ayy
Knocked for the night, ayy, 767, man
This s**t got double bedroom, man
I still got scores to settle, man`,
  },
  {
    id: "5",
    title: "Drip Too Hard",
    artistName: "Lil Baby",
    artistImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    lyrics: `[Intro: Lil Baby]
Ooh, drip too hard, hmm
Ooh, hmm, ooh
Yeah, Young Gunna Wunna, hmm (Gunna)

[Chorus: Lil Baby & Gunna]
Drip too hard, don't stand too close
You gon' f**k around and drown off this wave
Doing all these shows, I've been on the road
I don't care where I go, long as I get paid
Bad lil' vibe, she been on my mind
Soon as I get back, she gettin' slayed
Do this all the time, this ain't no surprise
Every other night, another movie gettin' made

[Verse 1: Lil Baby]
I got Stacey Dashed on me (Stacey Dashed)
Booked and busy, I got a lot of p***y waitin' on a n***a (A lot)
I'm picky with my women, I'm decisive (Yeah, hey)
I like my baguettes cloudy, not too icy (Baguettes)
I'm steady pushin' P, I don't pop molly
Keep that s**t a thousand, bae, I can't lie (Yeah, hey)
Movin' like a boss, you move like Kylie (Boss)
Bought that little b***h a bag, she a Barbie (Barbie)

[Chorus: Lil Baby & Gunna]
Drip too hard, don't stand too close
You gon' f**k around and drown off this wave
Doing all these shows, I've been on the road
I don't care where I go, long as I get paid
Bad lil' vibe, she been on my mind
Soon as I get back, she gettin' slayed
Do this all the time, this ain't no surprise
Every other night, another movie gettin' made`,
  },
  {
    id: "6",
    title: "a lot",
    artistName: "21 Savage",
    artistImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    lyrics: `[Intro]
How many n***as you done seen dead?
How many n***as done seen you dead?

[Chorus]
I got a lot on my mind
I got a lot on my mind
I got a lot on my mind
I got a lot
I got a whole lot on my mind
I got a lot on my mind
I got a lot on my mind
I got a lot, yeah

[Verse 1]
Havin' conversations with the Devil
Tryna see what he got to say (21)
Gotta go get the money
Even when you feelin' a way (Facts)
Murder on my mind when I ride
Put the Glock 'tween your eyes when we slide (Straight up)
N***a, free my lil' cousin Boosie
He did a drive-by with a blind eye (On God)
Tried to change my life, I was broke
Now I'm rich and these hoes treat me like Brad Pitt (21)

[Chorus]
I got a lot on my mind
I got a lot on my mind
I got a lot on my mind
I got a lot
I got a whole lot on my mind
I got a lot on my mind
I got a lot on my mind
I got a lot, yeah

[Verse 2: J. Cole]
Can't nobody make me feel like I'm the blame for this
I got a lot on my mind
A lot on my mind
Hundred-thousand in three days, the easiest money I ever made
Can't nobody make me feel like I'm the blame for this
Sometimes I feel like I'm losing it`,
  },
];
