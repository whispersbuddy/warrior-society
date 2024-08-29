import {
  FaSmile,
  FaSadTear,
  FaAngry,
  FaLaughSquint,
  FaHeart,
  FaSurprise,
  FaMeh,
  FaGrin,
  FaTired,
  FaFlushed,
  FaGrinStars,
  FaKissWinkHeart,
  FaDizzy,
  FaRegGrinBeam,
} from "react-icons/fa";
export const disciplineOptions = [
  { label: "Martial Arts", value: "martial arts" },
  { label: "Boxing", value: "boxing" },
  { label: "Wrestling", value: "wrestling" },
];
export const disciplineData = [
  {
    _id: 1,
    value: "Martial Arts",
    questions: [
      {
        question: "What year did you begin training?",
        answer: "",
        type: "year",
      },
      {
        question: "What Belt did you achieve?",
        answer: "",

        type: "input",
      },
    ],
    physicalSkillLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Competent", value: "Competent" },
      { label: "Proficient", value: "Proficient" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
    knowledgeLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
  },
  {
    _id: 2,
    value: "Boxing",
    questions: [
      { question: "When did you begin boxing?", answer: "", type: "input" },
      {
        question: "Did you compete as an amateur boxer?",
        answer: "",
        type: "dropdown",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        question: "Did/do you compete as a professional boxer?",
        answer: "",
        type: "dropdown",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    physicalSkillLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Competent", value: "Competent" },
      { label: "Proficient", value: "Proficient" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
    knowledgeLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
  },
  {
    _id: 3,
    value: "Wrestling",
    questions: [
      {
        question: "When did you begin wrestling in a organized environment?",
        answer: "",
        type: "input",
      },
      {
        question: "Where did/do you wrestle in high school?",
        answer: "",
        type: "input",
      },
      {
        question: "Where did/do you wrestle in college?",
        answer: "",
        type: "input",
      },
    ],
    physicalSkillLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Competent", value: "Competent" },
      { label: "Proficient", value: "Proficient" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
    knowledgeLevelOptions: [
      { label: "Novice", value: "Novice" },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
      { label: "Expert", value: "Expert" },
    ],
  },
];
export const martialArtTypes = [
  {
    label: "Sellect All",
    value: "all",
    description:
      "all",
  },
  {
    label: "Aikido",
    value: "Aikido",
    description:
      "A Japanese martial arts style focused on redirecting the attack away from you. Aikido concentrates on throwing, joint locks, traditional Japanese weapons, etc.",
  },
  {
    label: "Aikijujitsu",
    value: "Aikijujitsu",
    description:
      "A sub-genre of Jujutsu. In contrast to Jujutsu, Aikijujitsu focuses more heavily on blending with the opponent, moving joint-locks, and other esoteric principles.",
  },
  {
    label: "American Kenpo",
    value: "American Kenpo",
    description:
      "American Kenpo is a hybrid martial arts style. It is also known as Kenpo Karate.",
  },
  {
    label: "Angampora",
    value: "Angampora",
    description:
      "A Sri Lankan martial arts that focuses on unarmed combat, grappling, weapons, and pressure points.",
  },
  {
    label: "Bagua Zhang",
    value: "Bagua Zhang",
    description:
      "The “Eight Trigram Palm” style is one of the 3 best known Wudang styles. Best known for its “circle walking”.",
  },
  {
    label: "Bajutsu",
    value: "Bajutsu",
    description: "A Japanese martial arts focused on military equestrianism.",
  },
  {
    label: "Bakom",
    value: "Bakom",
    description:
      "Also known as Vacon, Bakom is a Peruvian martial arts that combines Jujutsu with street fighting techniques. It was designed for survival in the slums of Peru.",
  },
  {
    label: "Bajiquan",
    value: "Bajiquan",
    description:
      "A Chinese martial arts style that is famous for its explosive power and elbow strikes.",
  },
  {
    label: "Bando",
    value: "Bando",
    description:
      "Bando is a martial arts style from the Southeast Asian country of Myanmar (formerly known as Burma).",
  },
  {
    label: "Bartitsu",
    value: "Bartitsu",
    description:
      "An English martial arts that combines boxing, cane fighting, jujutsu, etc.",
  },
  {
    label: "Bataireacht",
    value: "Bataireacht",
    description: "The martial arts better known as Irish stick fighting.",
  },
  {
    label: "Bokh",
    value: "Bokh",
    description:
      "A traditional wrestling martial arts that was practiced by Mongol warriors. It is better known today as Mongolian Wrestling.",
  },
  {
    label: "Budokon",
    value: "Budokon",
    description:
      "A hybrid system that combines martial arts training with Yoga.",
  },
  {
    label: "Bojuka",
    value: "Bojuka",
    description:
      "A self-defense system focused on grappling and strikes to an opponent’s vital areas.",
  },
  {
    label: "Bojutsu",
    value: "Bojutsu",
    description: "A weapon-based martial arts focused on the long staff (Bo).",
  },
  {
    label: "Bokator",
    value: "Bokator",
    description:
      "An ancient Cambodian martial arts that includes grappling, strikes, and weapons training.",
  },
  {
    label: "Boxing",
    value: "Boxing",
    description:
      "An American fighting style focused on punching, footwork, and avoiding strikes.",
  },
  {
    label: "Brazilian Jiu-Jitsu",
    value: "Brazilian Jiu-Jitsu",
    description:
      "A Brazilian martial arts style focused on ground fighting (i.e. grappling).",
  },
  {
    label: "Bujutsu",
    value: "Bujutsu",
    description: "The Japanese martial arts of the Samurai.",
  },
  {
    label: "Butthan",
    value: "Butthan",
    description:
      "A martial art from Bangladesh focused on subjects such as mediation, self-defense, weapons, etc.",
  },
  {
    label: "Byakuren Kaikan",
    value: "Byakuren Kaikan",
    description:
      "A Japanese martial arts focused on full contact sparring. This style originated out of Shorinji Kempo.",
  },
  {
    label: "Catch Wrestling",
    value: "Catch Wrestling",
    description:
      "A grappling martial arts created in the late 1800s that combines techniques from wrestling, Judo, Jujutsu, and other grappling martial arts.",
  },
  {
    label: "Canne de Combat",
    value: "Canne de Combat",
    description:
      "A French martial arts that focuses on a sports version of cane fighting.",
  },
  {
    label: "Capoeira",
    value: "Capoeira",
    description: "A very fluid and acrobatic martial arts style from Brazil.",
  },
  {
    label: "Choy Li Fut",
    value: "Choy Li Fut",
    description:
      "A substyle of Kung Fu that combines long and short-range techniques.",
  },
  {
    label: "Chun Kuk Do",
    value: "Chun Kuk Do",
    description:
      "A Korean and American hybrid system created by Chuck Norris. In 2015, this martial arts was renamed to the Chuck Norris System.",
  },
  {
    label: "Combat Hapkido",
    value: "Combat Hapkido",
    description:
      "A spin-off of traditional Hapkido. It has a much greater focus on self-defense and grappling than traditional Hapkido.",
  },
  {
    label: "Combat Hopak",
    value: "Combat Hopak",
    description:
      "An Ukrainian martial arts supposedly derived from Cossack military traditions.",
  },
  {
    label: "Coreeda",
    value: "Coreeda",
    description: "An Australian aboriginal martial arts focused on wrestling.",
  },
  {
    label: "Cuong Nhu",
    value: "Cuong Nhu",
    description:
      "A Vietnamese American hybrid martial arts that combines elements from Shotokan Karate, Aikido, Judo, Wing Chun, Vovinam, Tai Chi, and Boxing.",
  },
  {
    label: "Daido Juku Kudo",
    value: "Daido Juku Kudo",
    description:
      "A Japanese martial arts that practices mixed martial arts techniques while wearing a traditional gi.",
  },
  {
    label: "Daito-Ryu Aikijujutsu",
    value: "Daito-Ryu Aikijujutsu",
    description:
      "A traditional Japanese martial arts focused on unarmed combat, throws, strikes to vital areas, joint locks, etc.",
  },
  {
    label: "Dambe",
    value: "Dambe",
    description:
      "An African martial arts focused primarily on boxing, but it also uses kicking techniques.",
  },
  {
    label: "Danzan Ryu",
    value: "Danzan Ryu",
    description: "An American hybrid form of Jujutsu, also known as Kodenkan.",
  },
  {
    label: "Defendo Alliance",
    value: "Defendo Alliance",
    description:
      "A European martial arts focused on realistic self-defense training.",
  },
  {
    label: "Defendu",
    value: "Defendu",
    description:
      "A British martial arts created by William Fairbairn and Eric Sykes, taught to Office of Strategic Services agents and Allied troops in World War 2.",
  },
  {
    label: "Dumog",
    value: "Dumog",
    description: "A Philippine martial arts focused on wrestling.",
  },
  {
    label: "Eagle Claw Kung Fu",
    value: "Eagle Claw Kung Fu",
    description:
      "A Chinese martial arts known for its gripping techniques, strikes, joint locks, takedowns and pressure point attacks.",
  },
  {
    label: "Enshin Kaikan",
    value: "Enshin Kaikan",
    description:
      "A Japanese martial arts that utilizes the Sabaki method, involving kicks, punches, sweeps, throws, etc.",
  },
  // {
  //   label: "Eskrima, Arnis & Kali",
  //   value: "Eskrima, Arnis & Kali",
  //   description:
  //     "A martial arts style from the Philippines focused on the use of stick and blade weapons.",
  // },
  {
    label: "Fencing",
    value: "Fencing",
    description:
      "Mainly an Olympic-style sport, with a sub-style called historical fencing which focuses on fencing as a martial arts.",
  },
  {
    label: "Fu Jow Pai",
    value: "Fu Jow Pai",
    description: "A Chinese martial art famous for its 'Tiger Claw' style.",
  },
  {
    label: "Gatka",
    value: "Gatka",
    description:
      "An Indian martial arts focused on weapons, especially swords.",
  },
  {
    label: "Glima",
    value: "Glima",
    description:
      "A Scandinavian wrestling-based martial arts that was created by the Vikings.",
  },
  {
    label: "Gongkwon Yusul",
    value: "Gongkwon Yusul",
    description:
      "A Korean hybrid martial arts that includes elements from Hapkido, Jujutsu, Judo, and Boxing.",
  },
  {
    label: "Gungsol",
    value: "Gungsol",
    description: "A Korean martial arts focused on archery.",
  },
  {
    label: "Haidong Gumdo",
    value: "Haidong Gumdo",
    description:
      "A Korean martial arts focused on sword techniques, containing elements similar to Kenjutsu and Iaido.",
  },
  {
    label: "Hanbojutsu",
    value: "Hanbojutsu",
    description:
      "A martial arts that utilizes the Hanbo, a 3-foot wooden staff.",
  },
  {
    label: "Han Mu Do",
    value: "Han Mu Do",
    description:
      "A Korean martial arts style seen as a 'smoother' and more 'open hand' cousin to Hapkido, also training with weapons.",
  },
  {
    label: "Hapkido",
    value: "Hapkido",
    description:
      "A Korean martial arts style focused on punches, kicks, throws, and joint locks.",
  },
  {
    label: "HEMA",
    value: "HEMA",
    description:
      "Historical European Martial Arts, mainly sword-based martial arts based on techniques used in Europe from around the 1300s to the 1800s.",
  },
  {
    label: "Hojojutsu",
    value: "Hojojutsu",
    description:
      "A Japanese martial arts that uses ropes to restrain or disable an opponent.",
  },
  {
    label: "Hung Ga",
    value: "Hung Ga",
    description:
      "A southern Chinese martial arts that combines 5 animal styles (Crane, Dragon, Leopard, Snake, and Tiger).",
  },
  {
    label: "Huyen Langlon",
    value: "Huyen Langlon",
    description: "A martial arts from northeastern India.",
  },
  {
    label: "Hwa Rang Do",
    value: "Hwa Rang Do",
    description:
      "A Korean martial arts that includes sparring, self-defense, weapons training and grappling.",
  },
  {
    label: "Iaido",
    value: "Iaido",
    description:
      "A Japanese martial arts focused on the drawing of a sword from its scabbard, relying heavily on katas and not utilizing sparring.",
  },
  {
    label: "Iaijutsu",
    value: "Iaijutsu",
    description: "The combat version of Iaido.",
  },
  {
    label: "Icho-Ryu",
    value: "Icho-Ryu",
    description:
      "A fusion of martial arts such as Aikido, Goju Ryu Karate, Jujutsu, Judo, and Aikijujutsu, created for law enforcement officers.",
  },
  {
    label: "Itto-Ryu",
    value: "Itto-Ryu",
    description:
      "A Japanese martial arts focused on the sword, with many sub-styles, having significant influence on the development of modern Kendo.",
  },
  {
    label: "Jailhouse Rock",
    value: "Jailhouse Rock",
    description:
      "A martial arts system that was developed in the US prison system.",
  },
  {
    label: "Jeet Kune Do",
    value: "Jeet Kune Do",
    description: "A martial arts style created by Bruce Lee.",
  },
  {
    label: "Jojutsu",
    value: "Jojutsu",
    description: "A Japanese martial arts focused on the short staff (Jo).",
  },
  {
    label: "Judo",
    value: "Judo",
    description:
      "A Japanese martial arts style focused on grappling, joint locks and throws.",
  },
  {
    label: "Jujutsu",
    value: "Jujutsu",
    description:
      "A Japanese martial arts style focused on joint locks, holds and throws. It tries to redirect or manipulate the force of an attack in order to defeat the attacker.",
  },
  {
    label: "Jukendo",
    value: "Jukendo",
    description: "A Japanese martial arts focused on the bayonet.",
  },
  {
    label: "Juttejutsu",
    value: "Juttejutsu",
    description:
      "A Japanese martial arts that focuses on the martial arts weapon known as the Jutte (Jitte).",
  },
  {
    label: "Kajukenbo",
    value: "Kajukenbo",
    description:
      "An American martial arts style that combines techniques from many different martial arts such as Judo, Karate, Eskrima, etc. It was designed to be effective in real world self-defense situations and street fights.",
  },
  {
    label: "Kalaripayattu",
    value: "Kalaripayattu",
    description: "An ancient martial arts style from India.",
  },
  {
    label: "KAPAP",
    value: "KAPAP",
    description:
      "The Hebrew acronym for Face-To-Face-Combat. While not as well-known as Krav Maga, this Israeli martial arts system is used by a number of Israel’s elite military units.",
  },
  {
    label: "Karate",
    value: "Karate",
    description:
      "A Japanese martial arts style focused on punches, hand/elbow strikes, knee strikes and kicks.",
  },
  {
    label: "Keijojutsu",
    value: "Keijojutsu",
    description:
      "A Japanese martial arts focused on police stick fighting (batons).",
  },
  {
    label: "Kendo",
    value: "Kendo",
    description:
      "A Japanese martial arts style focused on sword fighting (i.e., Bokken and Katana).",
  },
  {
    label: "Kenjutsu",
    value: "Kenjutsu",
    description:
      "A Japanese martial arts style focused on sword techniques. In contrast to Kendo, Kenjutsu is less focused on sparring.",
  },
  {
    label: "Keysi",
    value: "Keysi",
    description:
      "A self-defense system 'created to act and react while defending yourself'.",
  },
  {
    label: "Kickboxing",
    value: "Kickboxing",
    description: "A martial arts style focused on powerful kicks and punches.",
  },
  {
    label: "Kinomichi",
    value: "Kinomichi",
    description:
      "A martial arts style that originated in France and was developed by one of the students of the founder of Aikido.",
  },
  {
    label: "Kino Mutai",
    value: "Kino Mutai",
    description:
      "A Philippines martial arts that uses unconventional tactics such as biting and eye-gouging.",
  },
  {
    label: "Kobudo",
    value: "Kobudo",
    description:
      "A Japanese (Okinawan) martial art focused on weapons training. Weapons used include the bo staff, sai, tonfa, and nunchaku.",
  },
  {
    label: "Kokondo",
    value: "Kokondo",
    description: "A style that combines techniques from Karate and Jujutsu.",
  },
  {
    label: "Krabi-Krabong",
    value: "Krabi-Krabong",
    description: "A weapon-based martial arts from Thailand.",
  },
  {
    label: "Krav Maga",
    value: "Krav Maga",
    description:
      "A martial arts style from Israel focused on winning in 'real life' combat situations.",
  },
  {
    label: "Kuk Sool Won",
    value: "Kuk Sool Won",
    description:
      "A Korean martial arts focused on strikes, kicks, grappling, joint locks, weapons training, and healing techniques.",
  },
  {
    label: "Kumdo",
    value: "Kumdo",
    description: "A Korean sword-based martial arts which is similar to Kendo.",
  },
  {
    label: "Kung Fu",
    value: "Kung Fu",
    description:
      "A Chinese martial arts style focused on hand/arm strikes, kicks, and even weapons training.",
  },
  {
    label: "Kung Fu To'a",
    value: "Kung Fu To'a",
    description:
      "An Iranian martial arts style that combines Kung Fu and Yoga.",
  },
  {
    label: "Kuntao",
    value: "Kuntao",
    description:
      "A southeast Asian martial arts that utilizes hand strikes, kicking techniques, grappling and martial arts weapons such as swords, staffs, and spears.",
  },
  {
    label: "Kyudo",
    value: "Kyudo",
    description: "A Japanese martial arts style focused on archery.",
  },
  {
    label: "Kyuk Too Ki",
    value: "Kyuk Too Ki",
    description: "Korean kickboxing.",
  },
  {
    label: "Kyusho Jitsu",
    value: "Kyusho Jitsu",
    description: "A martial arts focused on targeting pressure points.",
  },
  {
    label: "Laamb",
    value: "Laamb",
    description:
      "A Senegalese martial arts that combines wrestling and punches.",
  },
  {
    label: "Lathi Khela",
    value: "Lathi Khela",
    description: "A Bangladeshi stick-fighting martial arts.",
  },
  {
    label: "Lerdrit",
    value: "Lerdrit",
    description: "A military martial arts used by the Royal Thai Army.",
  },
  {
    label: "Leopard Kung Fu (Bao Quan)",
    value: "Leopard Kung Fu (Bao Quan)",
    description:
      "A Chinese martial arts that focuses on aggressive speed and agility to defeat an opponent.",
  },
  {
    label: "Lethwei",
    value: "Lethwei",
    description:
      "A Myanmar (Burma) martial arts that is similar to Muay Thai and Kickboxing. However, Lethwei has less restrictions as this martial arts allows techniques such as headbutts.",
  },
  {
    label: "LimaLama",
    value: "LimaLama",
    description: "A martial arts from Samoa.",
  },
  {
    label: "Linh Quyen Dao",
    value: "Linh Quyen Dao",
    description: "A Vietnamese martial arts.",
  },
  {
    label: "Lua",
    value: "Lua",
    description:
      "A traditional Hawaiian martial arts that focuses on bone breaking, boxing, wrestling, weapons, etc.",
  },
  {
    label: "Luta Livre",
    value: "Luta Livre",
    description:
      "A Brazilian grappling martial arts known in Portuguese as 'Free Fighting'.",
  },
  {
    label: "Malla Yuddha",
    value: "Malla Yuddha",
    description:
      "An Indian and Southeast Asian martial arts focused on combat wrestling.",
  },
  {
    label: "Marine Corps Martial Arts Program (MCMAP)",
    value: "Marine Corps Martial Arts Program (MCMAP)",
    description:
      "A fighting style focused on unarmed combat, knife training, bayonet techniques, etc.",
  },
  {
    label: "Mau Rakau",
    value: "Mau Rakau",
    description:
      "A weapons-based martial arts developed by the Maori of New Zealand.",
  },
  {
    label: "Mixed Martial Arts",
    value: "Mixed Martial Arts",
    description:
      "Utilizes techniques from a variety of different martial arts styles such as wrestling, jiu-jitsu, boxing, karate, etc., in order to defeat an opponent.",
  },
  {
    label: "Monkey Kung Fu (Hou Quan)",
    value: "Monkey Kung Fu (Hou Quan)",
    description:
      "An unorthodox and acrobatic style used to disorient and attack opponents from unusual angles and positions.",
  },
  {
    label: "Muay Boran",
    value: "Muay Boran",
    description:
      "A Thai martial arts. Modern Muay Thai evolved from this martial arts style.",
  },
  {
    label: "Muay Thai",
    value: "Muay Thai",
    description:
      "A martial arts style from Thailand. It is similar to kickboxing but also involves elbow and knee strikes.",
  },
  {
    label: "Naginatajutsu",
    value: "Naginatajutsu",
    description:
      "A Japanese martial arts style focused on the long pole weapon known as the Naginata.",
  },
  {
    label: "Nam Hong Son",
    value: "Nam Hong Son",
    description: "A Vietnamese martial arts.",
  },
  {
    label: "Nhat Nam",
    value: "Nhat Nam",
    description: "A Vietnamese martial arts.",
  },
  {
    label: "Ninjutsu",
    value: "Ninjutsu",
    description:
      "A martial arts style developed from the techniques used by ninjas (Japanese spies and assassins).",
  },
  {
    label: "Niten Ichi-Ryu",
    value: "Niten Ichi-Ryu",
    description:
      "A two-sword martial arts style created by the famous Japanese samurai, Miyamoto Musashi.",
  },
  {
    label: "Niyuddha",
    value: "Niyuddha",
    description:
      "An ancient Indian martial arts focused on kicking, punching and throwing.",
  },
  {
    label: "Nunchaku Do",
    value: "Nunchaku Do",
    description:
      "A martial arts focused on the sports usage of the Nunchaku (Nunchucks).",
  },
  {
    label: "Okichitaw",
    value: "Okichitaw",
    description:
      "A hybrid martial arts that combines the traditional fighting techniques used by the Cree Indians (Native Americans) with techniques from martial arts such as Taekwondo and Judo.",
  },
  {
    label: "Panantukan",
    value: "Panantukan",
    description:
      "The boxing component of Filipino martial arts, Panantukan is a street-oriented fighting system, also known as Suntukan, Pangamot, Pakamot, and Mano-Mano.",
  },
  {
    label: "Pankration",
    value: "Pankration",
    description:
      "This Greek martial arts style combines grappling, kicking techniques and boxing. It was part of the first Olympics in 648 BC.",
  },
  {
    label: "Pehlwani",
    value: "Pehlwani",
    description:
      "An Indian martial arts focused on wrestling & grappling techniques.",
  },
  {
    label: "Pencak Silat",
    value: "Pencak Silat",
    description:
      "The name used to refer to a variety of Indonesian martial arts.",
  },
  {
    label: "Pradal Serey",
    value: "Pradal Serey",
    description:
      "A Cambodian martial arts similar to Muay Thai and Kickboxing, well known for its use of elbow strikes in order to win a fight.",
  },
  {
    label: "Praying Mantis Kung Fu",
    value: "Praying Mantis Kung Fu",
    description:
      "Known for its redirection, joint manipulation, pressure point attacks, and trapping tactics.",
  },
  {
    label: "Quarterstaff",
    value: "Quarterstaff",
    description: "A British martial arts that uses a 6–9-foot wooden staff.",
  },
  {
    label: "Sambo",
    value: "Sambo",
    description:
      "A Russian martial arts style. There are two main types of Sambo; Combat Sambo and Sports Sambo.",
  },
  {
    label: "Sanshou (or Sanda)",
    value: "Sanshou (or Sanda)",
    description:
      "A martial arts style developed for the Chinese military, focused on combat training and combines elements of kung fu, grappling, and self-defense techniques.",
  },
  {
    label: "Savate (French Kickboxing)",
    value: "Savate (French Kickboxing)",
    description:
      "A French martial arts style focused on boxing and kicking. No knee strikes are allowed.",
  },
  {
    label: "Shaolin Kempo Karate",
    value: "Shaolin Kempo Karate",
    description:
      "A hybrid martial arts that combines techniques from Shaolin Kung Fu, Karate, and Asian wrestling.",
  },
  {
    label: "Shaolin Kung Fu",
    value: "Shaolin Kung Fu",
    description:
      "A well-known style of Kung Fu developed by the monks at the Shaolin Temple in China.",
  },
  {
    label: "Shin Kicking",
    value: "Shin Kicking",
    description:
      "An English martial arts or combat sports where contestants kick each other in the shins until one withdraws from the contest.",
  },
  {
    label: "Shindo Jinen Ryu",
    value: "Shindo Jinen Ryu",
    description:
      "A martial arts that combines elements of Karate, Aikido & Jujutsu.",
  },
  {
    label: "Shintaido",
    value: "Shintaido",
    description:
      "A martial art that combines Karate, Kenjutsu, and Bojutsu with spiritual and mediation elements.",
  },
  {
    label: "Shootfighting",
    value: "Shootfighting",
    description:
      "A combat sport similar to Mixed Martial Arts, focused on techniques from 'Muay Thai Kickboxing and total body Submission Grappling'.",
  },
  {
    label: "Shooto",
    value: "Shooto",
    description:
      "A Japanese martial arts style similar to mixed martial arts, created by Satoru Sayama.",
  },
  {
    label: "Shorinji Kempo",
    value: "Shorinji Kempo",
    description:
      "A Japanese martial arts that combines personal growth, health, and spirituality with self-defense techniques such as punches, kicks, escapes, throws, etc. It is seen as a modified Japanese version of Shaolin Kung Fu, established in 1947.",
  },
  {
    label: "Shuai Jiao",
    value: "Shuai Jiao",
    description:
      "A Chinese martial arts focused mainly on wrestling and grappling techniques.",
  },
  {
    label: "Shuri-Ryu",
    value: "Shuri-Ryu",
    description: "A martial arts that combines elements of Karate and Kung Fu.",
  },
  {
    label: "Sibpalki",
    value: "Sibpalki",
    description:
      "A Korean martial arts that teaches close combat skills that were utilized in the late 1700s.",
  },
  {
    label: "Sikaran",
    value: "Sikaran",
    description:
      "A Philippines martial arts focused almost exclusively on kicking.",
  },
  {
    label: "Silambam",
    value: "Silambam",
    description: "An Indian martial arts focused primarily on staff fighting.",
  },
  {
    label: "Silat",
    value: "Silat",
    description:
      "A Southeast Asian martial arts style focused on strikes (i.e. elbow and knee), throws, takedowns, and weapons training.",
  },
  {
    label: "Siljun Dobup",
    value: "Siljun Dobup",
    description:
      "A sword-based martial arts based on Japanese and Korean traditions.",
  },
  {
    label: "Singlestick",
    value: "Singlestick",
    description:
      "An ancient English martial arts that uses a wooden rod to practice techniques originally designed to teach cutlass fighting to sailors.",
  },
  {
    label: "Sojutsu",
    value: "Sojutsu",
    description: "A Japanese martial arts focused on spear fighting.",
  },
  {
    label: "Soo Bahk Do",
    value: "Soo Bahk Do",
    description: "A Korean martial arts that grew out of Tang Soo Do.",
  },
  {
    label: "Special Combat Aggressive Reactionary System (SCARS)",
    value: "Special Combat Aggressive Reactionary System (SCARS)",
    description:
      "A martial art program taught to US Navy Seals in the 1980s and 1990s.",
  },
  {
    label: "Spochan",
    value: "Spochan",
    description:
      "A martial arts that uses 'air soft' weapons to practice various sword & stick-based fighting techniques.",
  },
  {
    label: "Ssireum",
    value: "Ssireum",
    description: "A Korean martial arts focused on wrestling.",
  },
  {
    label: "Sumo",
    value: "Sumo",
    description: "A Japanese martial arts focused on wrestling.",
  },
  {
    label: "Systema",
    value: "Systema",
    description:
      "A martial arts style used by some Russian special forces (i.e. Spetsnaz).",
  },
  {
    label: "Taekkyeon",
    value: "Taekkyeon",
    description:
      "A Korean martial arts focused on low kicks, leg sweeps, trips, pushes, etc.",
  },
  {
    label: "Taekwondo",
    value: "Taekwondo",
    description:
      "A Korean martial arts style focused primarily on punches, blocks, strikes, and kicking.",
  },
  {
    label: "Tahtib",
    value: "Tahtib",
    description:
      "An Egyptian martial arts focused on stick fighting. Students generally train with a 4-foot wooden stick.",
  },
  {
    label: "Tai Chi",
    value: "Tai Chi",
    description:
      "A 'gentle' martial art because many seniors use its slow movements in order to improve their health & balance and to reduce stress.",
  },
  {
    label: "Taido",
    value: "Taido",
    description:
      "A Japanese martial arts that combines elements of Karate with gymnastic maneuvers & dynamic movement.",
  },
  {
    label: "Taiho Jutsu",
    value: "Taiho Jutsu",
    description:
      "A Japanese martial arts that was originally designed to help feudal police arrest armed criminals.",
  },
  {
    label: "Tang Soo Do",
    value: "Tang Soo Do",
    description:
      "A Korean martial arts style that is similar to Taekwondo and Karate.",
  },
  {
    label: "Tessenjutsu",
    value: "Tessenjutsu",
    description:
      "A Japanese martial arts based on the use of Tessen (war fans).",
  },
  {
    label: "Thien Mon Dao",
    value: "Thien Mon Dao",
    description: "A Vietnamese martial arts.",
  },
  {
    label: "US Army’s Modern Army Combatives Program",
    value: "US Army’s Modern Army Combatives Program",
    description: "A martial arts program taught by the U.S. Army.",
  },
  {
    label: "Vale Tudo",
    value: "Vale Tudo",
    description:
      "A Brazilian martial arts system that is similar to Mixed Martial Arts but with even fewer rules.",
  },
  {
    label: "Varma Kalai",
    value: "Varma Kalai",
    description:
      "An Indian martial arts focused on pressure points. It can also be used for healing applications.",
  },
  {
    label: "Vovinam",
    value: "Vovinam",
    description: "A Vietnamese martial arts style.",
  },
  {
    label: "Wing Chun",
    value: "Wing Chun",
    description:
      "A Chinese martial arts style focused on strikes, grappling and weapons training.",
  },
  {
    label: "Won Hwa Do",
    value: "Won Hwa Do",
    description: "A Korean martial arts known for its circular techniques.",
  },
  {
    label: "Wrestling",
    value: "Wrestling",
    description:
      "Used mainly for sports today, is an ancient martial arts style of fighting. It focuses on grappling, throws, and 'pinning' your opponent.",
  },
  {
    label: "Wushu",
    value: "Wushu",
    description:
      "The modern-day sports version of Kung Fu. Wushu was developed in the 1950s as an attempt to unify the multitude of traditional Chinese martial arts into one national style.",
  },
  {
    label: "Xtreme Martial Arts (XMA)",
    value: "Xtreme Martial Arts (XMA)",
    description:
      "Combines gymnastics with martial arts techniques to create acrobatic martial arts 'tricks'.",
  },
  {
    label: "Yabusame",
    value: "Yabusame",
    description:
      "A Japanese martial arts focused on archery while mounted on horseback.",
  },
  {
    label: "Yamanni-Ryu",
    value: "Yamanni-Ryu",
    description:
      "A martial arts style that focuses on training with Okinawan weapons (Kobudo).",
  },
  {
    label: "Yaw Yan",
    value: "Yaw Yan",
    description:
      "A Philippine kickboxing martial arts. It also utilizes grappling techniques and defenses against weapons.",
  },
  {
    label: "Yoseikan Budo",
    value: "Yoseikan Budo",
    description:
      "A Japanese martial arts system that combines a number of different martial arts including Aikido, Jujutsu, Judo, Karate, Kobudo, and Boxing.",
  },
  {
    label: "Zulu Stick Fighting",
    value: "Zulu Stick Fighting",
    description: "A South African weapons-based martial arts.",
  },
];
export const equipmentOptions = [
  { label: "Treadmill", value: "treadmill" },
  { label: "Dumbbells", value: "dumbbells" },
  { label: "Exercise Bike", value: "exercise_bike" },
  { label: "Yoga Mat", value: "yoga_mat" },
  { label: "Rowing Machine", value: "rowing_machine" },
];
export const weightOptions = [
  {
    label: "50Kgs",
    value: 50,
  },
  {
    label: "60Kgs",
    value: 60,
  },
  {
    label: "70Kgs",
    value: 70,
  },
];
export const skillOptions = [
  { label: "Novice", value: "Novice" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];
export const reportOptions = [
  {
    label: "Violation",
    value: "Violation",
  },
  {
    label: "Adult Content",
    value: "Adult Content",
  },
  {
    label: "Spam",
    value: "Spam",
  },
  {
    label: "Hate Speech",
    value: "Hate Speech",
  },
  {
    label: "False Information",
    value: "False Information",
  },
  {
    label: "Others",
    value: "Others",
  },
];

export const feelingsData = [
  { icon: "😊", text: "Feeling Happy" },
  { icon: "😢", text: "Feeling Sad" },
  { icon: "😠", text: "Feeling Angry" },
  { icon: "😆", text: "Feeling Excited" },
  { icon: "❤️", text: "Feeling Loved" },
  { icon: "😮", text: "Feeling Amazed" },
  { icon: "😐", text: "Feeling Indifferent" },
  { icon: "😁", text: "Feeling Cheery" },
  { icon: "😴", text: "Feeling Sleepy" },
  { icon: "😳", text: "Feeling Surprised" },
  { icon: "🌟", text: "Feeling Starry-eyed" },
  { icon: "😘", text: "Feeling Flirty" },
  { icon: "😵", text: "Feeling Dizzy" },
  { icon: "😄", text: "Feeling Joyful" },
];
export const activitiesData = [
  { icon: "🚴‍♂️", text: "Cycling" },
  { icon: "📖", text: "Reading" },
  { icon: "☕", text: "Coffee Time" },
  { icon: "🎵", text: "Listening to Music" },
  { icon: "🎨", text: "Art and Painting" },
  { icon: "🏃‍♂️", text: "Running" },
  { icon: "🏊‍♂️", text: "Swimming" },
  { icon: "🎮", text: "Gaming" },
  { icon: "🛍️", text: "Shopping" },
  { icon: "✈️", text: "Traveling" },
  { icon: "🎭", text: "Theater and Arts" },
];
export const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
