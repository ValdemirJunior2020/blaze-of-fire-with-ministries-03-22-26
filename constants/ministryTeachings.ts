// File: constants/ministryTeachings.ts
export type MinistryTeaching = {
  slug: string;
  title: string;
  icon:
    | "flame-outline"
    | "eye-outline"
    | "megaphone-outline"
    | "school-outline"
    | "musical-notes-outline"
    | "happy-outline"
    | "people-outline"
    | "videocam-outline";
  color: string;
  verse: string;
  purpose: string;
  mission: string[];
  responsibilities: string[];
  spiritFilledCulture: string[];
  prayerFocus: string[];
};

export const ministryTeachings: MinistryTeaching[] = [
  {
    slug: "apostle",
    title: "Apostolic Ministry",
    icon: "flame-outline",
    color: "#4DB7FF",
    verse: "Ephesians 4:11-12",
    purpose:
      "The apostolic ministry helps establish spiritual order, vision, foundation, and sending grace in the church. It protects alignment with Christ and keeps the church advancing with authority and mission.",
    mission: [
      "Build on Jesus Christ as the true foundation.",
      "Strengthen leadership with vision, order, and accountability.",
      "Discern new fields, new works, and strategic direction.",
      "Equip the church to be sent, not just seated.",
    ],
    responsibilities: [
      "Provide spiritual covering and direction.",
      "Help plant, strengthen, and align ministries.",
      "Raise mature leaders with character and power.",
      "Guard doctrine, unity, and kingdom focus.",
    ],
    spiritFilledCulture: [
      "Prayer before decisions.",
      "Bold obedience to the Holy Spirit.",
      "Kingdom expansion, not human ambition.",
      "Fathering and mentoring with humility.",
    ],
    prayerFocus: [
      "Lord, keep this house aligned with Your will.",
      "Give our leaders wisdom, courage, and purity.",
      "Let every ministry stand on Christ alone.",
    ],
  },
  {
    slug: "prophets",
    title: "Prophetic Ministry",
    icon: "eye-outline",
    color: "#B46CFF",
    verse: "1 Corinthians 14:3",
    purpose:
      "The prophetic ministry strengthens, encourages, and comforts the church through sensitivity to the voice of God. It helps keep the church discerning, repentant, awake, and responsive to the Spirit.",
    mission: [
      "Discern what the Spirit is saying to the church.",
      "Call the church into purity, prayer, and alignment.",
      "Release encouragement rooted in Scripture.",
      "Strengthen intercession and spiritual sensitivity.",
    ],
    responsibilities: [
      "Minister with humility and biblical order.",
      "Test words carefully and submit them to leadership.",
      "Point people to Jesus, not to personalities.",
      "Build faith, holiness, and obedience.",
    ],
    spiritFilledCulture: [
      "Deep prayer and consecration.",
      "Reverence for Scripture and truth.",
      "Discernment without pride.",
      "Courage with tenderness and love.",
    ],
    prayerFocus: [
      "Holy Spirit, sharpen our discernment.",
      "Keep every prophetic voice pure and submitted to You.",
      "Let truth, repentance, and encouragement flow in this house.",
    ],
  },
  {
    slug: "evangelists",
    title: "Evangelism",
    icon: "megaphone-outline",
    color: "#FFD84D",
    verse: "Mark 16:15",
    purpose:
      "Evangelism carries the heart of God for the lost. A Spirit-filled church does not keep the Gospel inside the building; it takes Jesus to the streets, homes, cities, and nations.",
    mission: [
      "Preach Christ with compassion and boldness.",
      "Reach the lost, broken, forgotten, and hungry.",
      "Lead people to salvation and discipleship.",
      "Create a culture of outreach in the whole church.",
    ],
    responsibilities: [
      "Organize outreach and soul-winning efforts.",
      "Train believers to share their faith.",
      "Welcome new converts into discipleship pathways.",
      "Serve the community with both truth and love.",
    ],
    spiritFilledCulture: [
      "Boldness with compassion.",
      "A burden for souls.",
      "Joy in testimony and harvest.",
      "Dependence on the Holy Spirit, not performance.",
    ],
    prayerFocus: [
      "Lord, give us a burden for souls.",
      "Open doors for divine appointments.",
      "Confirm the Gospel with power, love, and truth.",
    ],
  },
  {
    slug: "teachers",
    title: "Teaching Ministry",
    icon: "school-outline",
    color: "#56F28B",
    verse: "2 Timothy 2:15",
    purpose:
      "The teaching ministry grounds the church in truth. It brings clarity, maturity, and stability so believers can understand Scripture, live it out, and resist deception.",
    mission: [
      "Teach the Word with clarity and integrity.",
      "Help believers grow in doctrine and daily obedience.",
      "Form mature disciples, not shallow hearers.",
      "Protect the church from confusion and error.",
    ],
    responsibilities: [
      "Prepare and deliver sound biblical teaching.",
      "Explain Scripture in a practical and faithful way.",
      "Support discipleship, classes, and Bible studies.",
      "Encourage spiritual maturity and wisdom.",
    ],
    spiritFilledCulture: [
      "Love for Scripture.",
      "Truth with grace.",
      "Depth without dryness.",
      "Revelation that produces transformation.",
    ],
    prayerFocus: [
      "Lord, open our understanding of Your Word.",
      "Raise teachers who are faithful, humble, and Spirit-led.",
      "Let truth produce freedom and maturity in this house.",
    ],
  },
  {
    slug: "music",
    title: "Worship & Music",
    icon: "musical-notes-outline",
    color: "#FF8A3D",
    verse: "Psalm 150:6",
    purpose:
      "Worship ministry leads people into the presence of God with reverence, joy, and excellence. In a Spirit-filled church, worship is not a performance; it is priestly ministry before the Lord.",
    mission: [
      "Honor Jesus and lead the congregation into genuine worship.",
      "Prepare the atmosphere for prayer, surrender, and encounter.",
      "Model holiness, unity, and devotion.",
      "Serve with excellence while staying sensitive to the Spirit.",
    ],
    responsibilities: [
      "Lead songs and moments of worship prayerfully.",
      "Maintain spiritual and musical preparation.",
      "Work in unity with leadership and the house vision.",
      "Help create an atmosphere of reverence and freedom.",
    ],
    spiritFilledCulture: [
      "Purity before platform.",
      "Sensitivity to the flow of the Holy Spirit.",
      "Excellence without pride.",
      "Unity, humility, and consecration.",
    ],
    prayerFocus: [
      "Jesus, be the center of our worship.",
      "Let every song glorify You and break chains.",
      "Keep our hearts pure before Your presence.",
    ],
  },
  {
    slug: "children",
    title: "Children's Ministry",
    icon: "happy-outline",
    color: "#FF5A66",
    verse: "Matthew 19:14",
    purpose:
      "Children's ministry introduces young hearts to Jesus in truth, love, joy, and safety. A powerful church does not overlook children; it raises them as disciples and worshipers.",
    mission: [
      "Teach children to know Jesus, love Scripture, and pray.",
      "Create a safe, joyful, and holy environment.",
      "Partner with parents in discipleship.",
      "Raise children with spiritual identity and confidence.",
    ],
    responsibilities: [
      "Teach age-appropriate biblical lessons.",
      "Maintain safety, order, and compassion.",
      "Encourage worship, memory verses, and prayer.",
      "Model Christlike love and patience.",
    ],
    spiritFilledCulture: [
      "Joy and gentleness.",
      "Biblical truth presented clearly.",
      "Prayer over every child.",
      "Protection, excellence, and love.",
    ],
    prayerFocus: [
      "Lord, protect and fill our children.",
      "Let every child encounter Your love and truth.",
      "Raise a generation on fire for Jesus.",
    ],
  },
  {
    slug: "pastors",
    title: "Pastoral Care",
    icon: "people-outline",
    color: "#4DB7FF",
    verse: "1 Peter 5:2-3",
    purpose:
      "Pastoral ministry cares for the flock with love, wisdom, correction, and protection. It strengthens people in seasons of growth, pain, healing, and restoration.",
    mission: [
      "Shepherd people with truth and compassion.",
      "Care for souls in both public and personal ministry.",
      "Protect the flock from harm, confusion, and discouragement.",
      "Help believers grow in stability and health.",
    ],
    responsibilities: [
      "Pray for and care for people faithfully.",
      "Counsel with biblical wisdom and love.",
      "Support families, the hurting, and the weak.",
      "Help people stay connected, healed, and growing.",
    ],
    spiritFilledCulture: [
      "Compassion with truth.",
      "Listening hearts and prayerful care.",
      "Correction in love.",
      "Faithful shepherding, not control.",
    ],
    prayerFocus: [
      "Lord, make us faithful shepherds.",
      "Give us wisdom to care for Your people well.",
      "Let healing, restoration, and strength flow through this ministry.",
    ],
  },
  {
    slug: "media",
    title: "Media Ministry",
    icon: "videocam-outline",
    color: "#56F28B",
    verse: "Psalm 96:3",
    purpose:
      "Media ministry helps carry the message farther with excellence, creativity, and spiritual responsibility. In a Spirit-filled church, media serves the presence of God and the communication of truth.",
    mission: [
      "Support services and ministry moments with excellence.",
      "Extend the message beyond the church walls.",
      "Use creativity to communicate Jesus clearly.",
      "Serve the house vision with humility and precision.",
    ],
    responsibilities: [
      "Manage audio, video, streaming, and presentation needs.",
      "Preserve quality and clarity during ministry moments.",
      "Work closely with worship, leadership, and production flow.",
      "Maintain excellence without becoming distracting.",
    ],
    spiritFilledCulture: [
      "Excellence with humility.",
      "Focus on ministry, not attention.",
      "Faithfulness in small and unseen tasks.",
      "Sensitivity to sacred moments.",
    ],
    prayerFocus: [
      "Lord, let every tool serve Your glory.",
      "Give this team excellence, peace, and precision.",
      "Use media to spread Your truth with power.",
    ],
  },
];

export function getMinistryTeachingBySlug(slug: string) {
  return ministryTeachings.find((item) => item.slug === slug);
}