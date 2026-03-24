// File: data/verses.ts
export type DailyVerse = {
  reference: string;
  text: string;
};

export const DAILY_VERSES: DailyVerse[] = [
  {
    reference: "Luke 10:27",
    text: "Love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind."
  },
  {
    reference: "Psalm 46:1",
    text: "God is our refuge and strength, an ever-present help in trouble."
  },
  {
    reference: "Isaiah 41:10",
    text: "Do not fear, for I am with you; do not be dismayed, for I am your God."
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you."
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me."
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding."
  },
  {
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love Him."
  },
  {
    reference: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest."
  },
  {
    reference: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd, I lack nothing."
  },
  {
    reference: "John 14:27",
    text: "Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid."
  },
  {
    reference: "Romans 15:13",
    text: "May the God of hope fill you with all joy and peace as you trust in Him."
  },
  {
    reference: "2 Corinthians 5:7",
    text: "For we live by faith, not by sight."
  },
  {
    reference: "Psalm 121:1-2",
    text: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord."
  },
  {
    reference: "Hebrews 11:1",
    text: "Now faith is confidence in what we hope for and assurance about what we do not see."
  },
  {
    reference: "James 1:5",
    text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault."
  },
  {
    reference: "Galatians 6:9",
    text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."
  },
  {
    reference: "Psalm 34:8",
    text: "Taste and see that the Lord is good; blessed is the one who takes refuge in Him."
  },
  {
    reference: "1 Peter 5:7",
    text: "Cast all your anxiety on Him because He cares for you."
  },
  {
    reference: "Ephesians 3:20",
    text: "Now to Him who is able to do immeasurably more than all we ask or imagine."
  },
  {
    reference: "Lamentations 3:22-23",
    text: "His compassions never fail. They are new every morning; great is Your faithfulness."
  },
  {
    reference: "Psalm 37:4",
    text: "Take delight in the Lord, and He will give you the desires of your heart."
  },
  {
    reference: "Mark 9:23",
    text: "Everything is possible for one who believes."
  },
  {
    reference: "John 8:12",
    text: "I am the light of the world. Whoever follows me will never walk in darkness."
  },
  {
    reference: "Deuteronomy 31:6",
    text: "Be strong and courageous. Do not be afraid or terrified, for the Lord your God goes with you."
  },
  {
    reference: "Psalm 118:24",
    text: "This is the day the Lord has made; we will rejoice and be glad in it."
  },
  {
    reference: "Colossians 3:15",
    text: "Let the peace of Christ rule in your hearts."
  },
  {
    reference: "Micah 6:8",
    text: "Act justly and to love mercy and to walk humbly with your God."
  },
  {
    reference: "Romans 12:12",
    text: "Be joyful in hope, patient in affliction, faithful in prayer."
  },
  {
    reference: "Matthew 5:16",
    text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
  },
  {
    reference: "Psalm 27:1",
    text: "The Lord is my light and my salvation—whom shall I fear?"
  }
];

export function getVerseOfTheDay(date = new Date()): DailyVerse {
  const utcStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const utcNow = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayOfYear = Math.floor((utcNow - utcStart) / 86400000);
  const index = dayOfYear % DAILY_VERSES.length;

  return DAILY_VERSES[index];
}