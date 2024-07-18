import { FiGift } from "react-icons/fi";
import {
  footerBg,
  maldivesPop,
  mytripIcon,
  testimonialAvatar,
  userAvatar,
  postAvatar,
  postAvatarSec,
  postImageOne,
  postImageTwo,
  postImageThree,
  postVideo,
  gymCover,
  gymProfile,
  association,
  instructor,
  accolades,
  fighterProfile,
  trainerProfile,
  trainerCover,
  studentCover,
  affiliated,
  gymProfilePhoto,
  trainerThumbOne,
  trainerThumbTwo,
  trainerThumbThree,
  trainerThumbFour,
  cardAvatar,
  cardCover,
  userProfile,
  friends,
  students,
  fighter,
  trainer,
  gyms,
} from "../constant/imagePath";
import { FaMessage } from "react-icons/fa6";

export const postArr = [
  {
    _id: "1",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "456",
      name: "John Doe",
      avatar: postAvatarSec,
    },
    body: {
      type: "text",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem fauciibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignisasim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus dam eu, interdum mauris.",
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "2",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "456",
      name: "Don Joe",
      avatar: postAvatarSec,
    },
    body: {
      type: "images",
      title: `Glimpse of my 'Fighter Training Session 3'`,
      content: [postImageOne, postImageTwo, postImageThree],
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "3",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    body: {
      type: "video",
      title: `Fight Prep...🔥🔥🔥`,
      content: postVideo,
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "4",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    body: {
      type: "text",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem fauciibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignisasim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus dam eu, interdum mauris.",
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "5",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "456",
      name: "John Doe",
      avatar: postAvatarSec,
    },
    body: {
      type: "text",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem fauciibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignisasim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus dam eu, interdum mauris.",
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "6",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    body: {
      type: "images",
      title: `Glimpse of my 'Fighter Training Session 3'`,
      content: [postImageOne, postImageTwo, postImageThree],
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "7",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    body: {
      type: "video",
      title: `Fight Prep...🔥🔥🔥`,
      content: postVideo,
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
  {
    _id: "8",
    user: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    date: "2:52 AM Friday, July 28, 2023",
    postedBy: {
      _id: "123",
      name: "John Doe",
      avatar: postAvatar,
    },
    body: {
      type: "text",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem fauciibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignisasim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus dam eu, interdum mauris.",
    },
    likes: 2000,
    comments: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "3",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
      {
        _id: "4",
        user: {
          name: "John Doe",
          avatar: postAvatar,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        },
      },
    ],
    shares: 1000,
  },
];
const userRoleArr = ["trainer", "school", "fighter", "student"];
export const usersArr = [
  {
    _id: 1,
    name: "John Doe",
    occupation: userRoleArr[0],
    profile: trainerProfile,
    cover: trainerCover,
    skill: "Karate",
    location: "State, Country",
    followers: 365,
    fighterStats: [
      { type: "Total Fights", value: "20" },
      { type: "Draws", value: "20" },
      { type: "Total Title Wins", value: "20" },
      { type: "Wins", value: "20" },
      { type: "No-Contests", value: "20" },
      { type: "Title Defenses", value: "20" },
      { type: "Losses", value: "20" },
      { type: "KO Wins", value: "20" },
    ],
  },
  {
    _id: 2,
    name: "John Doe",
    occupation: userRoleArr[1],
    profile: gymProfilePhoto,
    cover: gymCover,
    skill: "Karate",
    location: "State, Country",
    followers: 365,
    fighterStats: [
      { type: "Total Fights", value: "20" },
      { type: "Draws", value: "20" },
      { type: "Total Title Wins", value: "20" },
      { type: "Wins", value: "20" },
      { type: "No-Contests", value: "20" },
      { type: "Title Defenses", value: "20" },
      { type: "Losses", value: "20" },
      { type: "KO Wins", value: "20" },
    ],
  },
  {
    _id: 3,
    name: "John Doe",
    occupation: userRoleArr[2],
    profile: fighterProfile,
    cover: postImageOne,
    skill: "Karate",
    location: "State, Country",
    followers: 365,
    fighterStats: [
      { type: "Total Fights", value: "20" },
      { type: "Draws", value: "20" },
      { type: "Total Title Wins", value: "20" },
      { type: "Wins", value: "20" },
      { type: "No-Contests", value: "20" },
      { type: "Title Defenses", value: "20" },
      { type: "Losses", value: "20" },
      { type: "KO Wins", value: "20" },
    ],
  },
  {
    _id: 4,
    name: "John Doe",
    occupation: userRoleArr[3],
    profile: postAvatar,
    cover: studentCover,
    skill: "Karate",
    location: "State, Country",
    followers: 365,
    fighterStats: [
      { type: "Total Fights", value: "20" },
      { type: "Draws", value: "20" },
      { type: "Total Title Wins", value: "20" },
      { type: "Wins", value: "20" },
      { type: "No-Contests", value: "20" },
      { type: "Title Defenses", value: "20" },
      { type: "Losses", value: "20" },
      { type: "KO Wins", value: "20" },
    ],
  },
];
export const awardsArr = Array(6).fill({
  image: accolades,
  name: "Award Name",
});
export const clubArr = Array(2).fill({
  image: association,
  name: "Club Name Here",
  grade: 11,
  year: "2013-2016",
});
export const affiliatedArr = Array(2).fill({
  image: affiliated,
  name: "Club Name Here",
  grade: 11,
  year: "2013-2016",
});
export const instructorsArr = Array(2).fill({
  image: instructor,
  name: "Instructor Name Here",
  skill: "Karate",
  year: "2013-2016",
});
export const studentsArr = Array(4).fill({
  image: testimonialAvatar,
  name: "Student Name Here",
  skill: "Karate",
  year: "2013-2016",
});
export const gymsArr = Array(4).fill({
  image: affiliated,
  name: "Student Name Here",
  skill: "Karate",
  year: "2013-2016",
});
export const ownersArr = Array(5)
  .fill()
  .map((ele, index) => (index % 2 === 0 ? testimonialAvatar : userAvatar));
export const followersArr = Array(10)
  .fill()
  .map((ele, index) => ({
    _id: index + 1,
    name: "John Doe",
    avatar: testimonialAvatar,
    skill: "Karate",
    loction: "State, Country",
  }));

export const skillsArr = [
  {
    label: "Karate",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    label: "Wrestling",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
export const availableStatsArr = [
  {
    label: "Available For Private Lessons",
    weightClass: "80Kg",
  },
  {
    label: "Available For Sparring",
    weightClass: "80Kg",
  },
  {
    label: "Available For Sparring Fees",
    weightClass: "80Kg",
  },
  {
    label: "Available for Sparring and Fights",
    weightClass: "80Kg",
  },
];
export const availableForFigher = [
  {
    label: "Available at 155 LBS for MMA",
  },
  {
    label: "Available as a Sparring Partner",
  },
];
export const societyMembers = Array(5)
  .fill()
  .map((ele, index) => ({
    _id: index + 1,
    name: "Club Name",
    members: 80,
    description: "Lorem Ipsum is simply dummy text of the dawdwadwadwa",
  }));

export const notificationArr = Array(8).fill({
  image: "https://picsum.photos/600/400",
  name: "Nicholas Amazon",
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et ac et justo duo dolores et ea rebum. Stet clita kasd gubergren, no",
  time: "50 Minutes Ago",
});
export const postDetailArr = {
  name: "John Smith",
  userImage: "https://picsum.photos/600/400",
  date: "02 July, 2023",
  image: postImageThree,
  like: "2",
  comment: "500",
  share: "1",
  userComments: Array(8).fill({
    image: "https://picsum.photos/600/400",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et ac et justo duo dolores et ea rebum. Stet clita kasd gubergren, no",
    time: "50 Minutes Ago",
  }),
};

export const upcomingFights = [
  {
    _id: 1,
    date: "Tue Jan 20 1970 19:47:01 GMT+0500",
    opponent: "Scott Sigman ",
    venue: "York Hall",
  },
  {
    _id: 2,
    date: "Tue Jan 22 1970 19:47:01 GMT+0500",
    opponent: "Bobby Gunn ",
    venue: "Olympia Stadium",
  },
  {
    _id: 3,
    date: "Tue Feb 20 1970 19:47:01 GMT+0500",
    opponent: "Bobby Gunn ",
    venue: "The MGM Grand",
  },
  {
    _id: 4,
    date: "Tue Jan 20 1970 19:47:01 GMT+0500",
    opponent: "Scott Sigman ",
    venue: "York Hall",
  },
];

export const trainersArr = [
  {
    _id: 1,
    name: "John Doe",
    image: trainerThumbFour,
    speciality: "Karate Student",
  },
  {
    _id: 2,
    name: "John Doe",
    image: trainerThumbThree,
    speciality: "Muay Thai Fighter",
  },
  {
    _id: 3,
    name: "John Doe",
    image: trainerThumbTwo,
    speciality: "Boxing Trainer",
  },
  {
    _id: 4,
    name: "John Doe",
    image: trainerThumbOne,
    speciality: "MMA Trainer",
  },
];
export const searchArr = [
  {
    _id: 1,
    name: "John Doe",
    image: trainerThumbFour,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Jitsu Trainer",
  },
  {
    _id: 2,
    name: "John Doe",
    image: trainerThumbThree,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Martial Arts Trainer",
  },
  {
    _id: 3,
    name: "John Doe",
    image: trainerThumbTwo,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Boxing Trainer",
  },
  {
    _id: 4,
    name: "John Doe",
    image: trainerThumbOne,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "MMA Trainer",
  },
  {
    _id: 5,
    name: "John Doe",
    image: trainerThumbFour,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Jitsu Trainer",
  },
  {
    _id: 6,
    name: "John Doe",
    image: trainerThumbThree,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Martial Arts Trainer",
  },
  {
    _id: 7,
    name: "John Doe",
    image: trainerThumbTwo,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Boxing Trainer",
  },
  {
    _id: 8,
    name: "John Doe",
    image: trainerThumbOne,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "MMA Trainer",
  },
  {
    _id: 9,
    name: "John Doe",
    image: trainerThumbFour,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Jitsu Trainer",
  },
  {
    _id: 10,
    name: "John Doe",
    image: trainerThumbThree,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Martial Arts Trainer",
  },
  {
    _id: 11,
    name: "John Doe",
    image: trainerThumbTwo,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Boxing Trainer",
  },
  {
    _id: 12,
    name: "John Doe",
    image: trainerThumbOne,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "MMA Trainer",
  },
  {
    _id: 13,
    name: "John Doe",
    image: trainerThumbFour,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Jitsu Trainer",
  },
  {
    _id: 14,
    name: "John Doe",
    image: trainerThumbThree,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Martial Arts Trainer",
  },
  {
    _id: 15,
    name: "John Doe",
    image: trainerThumbTwo,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "Boxing Trainer",
  },
  {
    _id: 16,
    name: "John Doe",
    image: trainerThumbOne,
    avatar: cardAvatar,
    cover: cardCover,
    location: "State, Country",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris. ",
    speciality: "MMA Trainer",
  },
];

export const sidebarDropdownData = [
  {
    _id: 2,
    name: "discipline",
    items: [
      "Aikido",
      "Aikijujitsu",
      "Angampora",
      "American Kenpo",
      "Bagua Zhang",
      "Bajutsu",
      "Bakom",
      "Bajiquan",
      " Bando",
      "Bartitsu",
      "Bataireacht",
    ],
  },
  {
    _id: 3,
    name: "amenities",
    items: [
      "Sparring ring",
      "Hanging heavy bags",
      "Floor sitting bags",
      "Cushioned floor for Jiujitsu",
      "Full gym equipment",
      "Full set of free weights",
      "Some free weights",
      "Battle ropes",
      "Exercise machines",
      "Foam Rollers",
      "Medicine balls",
    ],
  },
];
export const repliesArr = [
  {
    user: {
      firstName: "John",
      lastName: "Doe",
      photo: postAvatar,
    },
    text: "description",
    createdAt: "2024-01-01T16:41:23.575Z",
  },
];
export const justJoinedUsers = Array(4)
  .fill()
  .map((item, index) => {
    return {
      _id: index + 1,
      photo: userProfile,
      firstName: "User",
      lastName: "Name",
    };
  });

export const userRoles = [
  {
    role: "Followers",
    photo: friends,
    value: "followers",
  },
  {
    role: "Student",
    photo: students,
    value: "studentDetails",
  },
  {
    role: "Fighter",
    photo: fighter,
    value: "fighterDetails",
  },
  {
    role: "Trainer",
    photo: trainer,
    value: "trainerDetails",
  },
  {
    role: "Gym",
    photo: gyms,
    value: "schoolDetails",
  },
];
export const associationRequests = Array(4)
  .fill()
  .map((item, index) => {
    return {
      _id: index + 1,
      photo: userProfile,
      message: "has requested",
      firstName: "User",
      lastName: "Name",
    };
  });
export const schoolRequests = [
  {
    _id: 1,
    photo: cardCover,
    profile: cardAvatar,
    name: "School Name",
    location: "state, country",
  },
  {
    _id: 2,
    photo: cardCover,
    profile: cardAvatar,
    name: "lorem ipsum fight",
    location: "state, country",
  },
];
export const birthdayArr = [
  {
    _id: 1,
    photo: userProfile,
    firstName: "User",
    lastName: "Name",
    message: "has birthday today",
    icon: <FiGift />,
  },
  {
    _id: 1,
    photo: userProfile,
    firstName: "User",
    lastName: "Name",
    message: "has birthday today",
    icon: <FaMessage />,
  },
];

export const profileTooltTipData = {
  student: {
    aboutMe:
      "About me is an opportunity to let everyone know about your journey in the fighting arts",
    fightingDisipline:
      "Fighting Disciplines are broken down by the three main types with subcategories of each. Choose all that apply to your experience",
    accolades:
      "Accolades is an opportunity to list any awards, special positions, honor, or recognition you have garnered during your martial arts journey. Examples would be instructor of the year, hall of fame induction, or President of an association",
    gym: "Gyms are businesses providing training in various fighting disciplines. It is important to list your full information with as much detail as possible, so students are informed about what you offer, your facilities, and your fees",
    associations:
      "Associations are organizing bodies within different types of martial arts as well as fighting associations. If you are an active fighter list the association in which you fight. Students can link to the associates they or their school is associated with",
    joinedWarriorSociety:
      "(Joined Warrior Society) Thank you for joining the world’s leading network of martial arts students, fighters, trainers, and training schools",
  },
  trainer: {
    experienceAndTrainingIdeology:
      "It is important to provide details to possible students regarding your training, your instructors experience, and your training ideology about your gym",
    trainingDisiplines:
      "Fighting Disciplines are broken down by the three main types with subcategories of each. Choose all that apply to your experience",

    professionalBackground:
      "Let students know the types of training disciplines you are proficient in and information about your training ideology",
    accolades:
      "Accolades is an opportunity to list any awards, special positions, honor, or recognition you have garnered during your martial arts journey. Examples would be instructor of the year, hall of fame induction, or President of an association",
    gym: "Gyms are businesses providing training in various fighting disciplines. It is important to list your full information with as much detail as possible, so students are informed about what you offer, your facilities, and your fees",

    association:
      "Associations are organizing bodies within different types of martial arts as well as fighting associations. If you are an active fighter list the association in which you fight. Students can link to the associates they or their school is associated with",
  },
  gym: {
    aboutGym:
      "Gyms are businesses providing training in various fighting disciplines. It is important to list your full information with as much detail as possible, so students are informed about what you offer, your facilities, and your fees",
    fightingDisipline:
      "Fighting Disciplines are broken down by the three main types with subcategories of each. Choose all that apply to your experience",
    dues: "Provide a range of your drop in, monthly, or punch card fees as well as information regarding private lessons",
    amenities:
      "Provide a range of your drop in, monthly, or punch card fees as well as information regarding private lessons",
    accolades:
      "Accolades is an opportunity to list any awards, special positions, honor, or recognition you have garnered during your martial arts journey. Examples would be instructor of the year, hall of fame induction, or President of an association",

    associatedInstructors:
      "Associated instructors are affiliated with the gym and actively teach classes and/or provide private lessons at the gym",
    students:
      "Most people are students. Rarely in the fighting arts are you “done” learning. So checking student is applicable for most except the most highly skilled who are in the final phases of their journey",
    association:
      "Associations are organizing bodies within different types of martial arts as well as fighting associations. If you are an active fighter list the association in which you fight. Students can link to the associates they or their school is associated with",
    owners: "owners",
  },
  fighter: {
    aboutMe:
      "About me is an opportunity to let everyone know about your journey in the fighting arts",
    fightingDisipline:
      "Fighting Disciplines are broken down by the three main types with subcategories of each. Choose all that apply to your experience",
    fightingRecord:
      "Fighting record is an opportunity for amateur or pro fighters to list all your fights along with the outcome. It is important to be accurate and list all your amateur and pro fights. Promoters may use this information to contact you for future opportunities",
    upcomingFights:
      "Upcoming fights is an opportunity to promote your future fights whether pro or amateur",
    accolades:
      "Accolades is an opportunity to list any awards, special positions, honor, or recognition you have garnered during your martial arts journey. Examples would be instructor of the year, hall of fame induction, or President of an association",

    affiliatedGyms:
      "As trainers, students, and fighters you can list all the schools and gyms you are affiliated with and where you train and teach",
    association:
      "Associations are organizing bodies within different types of martial arts as well as fighting associations. If you are an active fighter list the association in which you fight. Students can link to the associates they or their school is associated with",
  },
};
