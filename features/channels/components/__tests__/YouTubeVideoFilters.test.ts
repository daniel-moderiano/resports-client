import { YouTubeVideoResult } from "types/youtubeAPITypes";
import {
  filterByDateYouTube,
  filterByDurationYouTube,
  filterByKeywordYouTube,
} from "features/channels/utils/YouTubeVideoFilters";

const testVideos: YouTubeVideoResult[] = [
  {
    kind: "youtube#video",
    etag: "eUcSXOPwJTu6USe5ObyvKCLAhX0",
    id: "oc6faXVc54E",
    snippet: {
      publishedAt: "2022-07-12T15:39:48Z",
      channelId: "UC29ju8bIPH5as8OGnQzwJyA",
      title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
      description:
        "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/oc6faXVc54E/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/oc6faXVc54E/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/oc6faXVc54E/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Traversy Media",
      tags: [
        "javascript",
        "javascript engine",
        "javascript v8 engine",
        "node.js v8",
        "spidermonkey engine",
      ],
      categoryId: "28",
      liveBroadcastContent: "none",
      localized: {
        title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
        description:
          "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
      },
      defaultAudioLanguage: "en",
    },
    contentDetails: {
      duration: "PT12M30S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "10191",
      likeCount: "684",
      favoriteCount: "0",
      commentCount: "53",
    },
    player: {
      embedHtml:
        '<iframe width="480" height="270" src="//www.youtube.com/embed/oc6faXVc54E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
  },
  {
    kind: "youtube#video",
    etag: "GjY6y6VAgMamOEFwVxQKZROcobw",
    id: "BcLNfwF04Kw",
    snippet: {
      publishedAt: "2022-06-06T13:00:10Z",
      channelId: "UC29ju8bIPH5as8OGnQzwJyA",
      title: "GraphQL Crash Course With Full Stack MERN Project",
      description:
        "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/BcLNfwF04Kw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/BcLNfwF04Kw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/BcLNfwF04Kw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Traversy Media",
      tags: [
        "graphql",
        "express",
        "node.js",
        "react",
        "apollo",
        "apollo graphql",
        "mongodb",
        "graphql express",
        "express.js",
      ],
      categoryId: "28",
      liveBroadcastContent: "none",
      localized: {
        title: "GraphQL Crash Course With Full Stack MERN Project",
        description:
          "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
      },
      defaultAudioLanguage: "en",
    },
    contentDetails: {
      duration: "PT3H14M39S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "114896",
      likeCount: "4648",
      favoriteCount: "0",
      commentCount: "309",
    },
    player: {
      embedHtml:
        '<iframe width="480" height="270" src="//www.youtube.com/embed/BcLNfwF04Kw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
  },
  {
    kind: "youtube#video",
    etag: "Xt04CLSDVNxy1rhILv7fqzN65pU",
    id: "vxqBm6_0vyk",
    snippet: {
      publishedAt: "2022-05-30T13:00:28Z",
      channelId: "UC29ju8bIPH5as8OGnQzwJyA",
      title: "Python In The Browser! PyScript First Look",
      description:
        "In this video, we will look at the brand new PyScript framework, which uses Web Assembly and Pyodide to write Python and use Python Packages right in our HTML. And no, it will NOT replace JavaScript.\n\n🐍 PyScript Website & Examples:\nhttps://pyscript.net\nhttps://github.com/pyscript/pyscript/tree/main/examples\n\n📘Check out my 300 page Web Dev Guide:\nhttps://traversy.gumroad.com/l/web-dev-guide\n\n💻 All Courses\nhttps://traversymedia.com\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n1:45 - How it works\n4:18 - Getting Started\n5:17 - Disable formatOnSave\n6:06 - Writing Python in HTML\n6:37 - Mixing JavaScript\n7:02 - Targeting DOM elements\n8:15 - REPL\n8:54 - Math module\n9:18 - Env & 3rd party packages\n11:10 - Using a separate .py file\n13:16 - Handling events\n14:45 - Shuffle array\n16:04 - Using Element()\n18:00 - Using multiple files\n20:22 - Wrap up",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/vxqBm6_0vyk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/vxqBm6_0vyk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/vxqBm6_0vyk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Traversy Media",
      tags: [
        "pyscript",
        "python",
        "py script",
        "wasm",
        "pyodide",
        "python javascript",
      ],
      categoryId: "28",
      liveBroadcastContent: "none",
      localized: {
        title: "Python In The Browser! PyScript First Look",
        description:
          "In this video, we will look at the brand new PyScript framework, which uses Web Assembly and Pyodide to write Python and use Python Packages right in our HTML. And no, it will NOT replace JavaScript.\n\n🐍 PyScript Website & Examples:\nhttps://pyscript.net\nhttps://github.com/pyscript/pyscript/tree/main/examples\n\n📘Check out my 300 page Web Dev Guide:\nhttps://traversy.gumroad.com/l/web-dev-guide\n\n💻 All Courses\nhttps://traversymedia.com\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n1:45 - How it works\n4:18 - Getting Started\n5:17 - Disable formatOnSave\n6:06 - Writing Python in HTML\n6:37 - Mixing JavaScript\n7:02 - Targeting DOM elements\n8:15 - REPL\n8:54 - Math module\n9:18 - Env & 3rd party packages\n11:10 - Using a separate .py file\n13:16 - Handling events\n14:45 - Shuffle array\n16:04 - Using Element()\n18:00 - Using multiple files\n20:22 - Wrap up",
      },
      defaultAudioLanguage: "en",
    },
    contentDetails: {
      duration: "PT21M34S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "133775",
      likeCount: "4124",
      favoriteCount: "0",
      commentCount: "279",
    },
    player: {
      embedHtml:
        '<iframe width="480" height="270" src="//www.youtube.com/embed/vxqBm6_0vyk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
  },
  {
    kind: "youtube#video",
    etag: "i0OysdqEwSKDTO3RGrIdW0sXGU4",
    id: "2QQGWYe7IDU",
    snippet: {
      publishedAt: "2022-01-24T14:00:01Z",
      channelId: "UC29ju8bIPH5as8OGnQzwJyA",
      title: "MongoDB Crash Course 2022",
      description:
        "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/2QQGWYe7IDU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/2QQGWYe7IDU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/2QQGWYe7IDU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Traversy Media",
      tags: [
        "mongodb",
        "mongo",
        "mongodb crash course",
        "nosql",
        "document database",
        "non-relational database",
        "mongodb atlas",
      ],
      categoryId: "28",
      liveBroadcastContent: "none",
      localized: {
        title: "MongoDB Crash Course 2022",
        description:
          "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
      },
      defaultAudioLanguage: "en",
    },
    contentDetails: {
      duration: "PT27M22S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "97597",
      likeCount: "3721",
      favoriteCount: "0",
      commentCount: "118",
    },
    player: {
      embedHtml:
        '<iframe width="480" height="270" src="//www.youtube.com/embed/2QQGWYe7IDU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
  },
];

describe("Filter videos by duration", () => {
  it("returns all videos for a zero second minimum", () => {
    expect(filterByDurationYouTube(testVideos, 0)).toStrictEqual(testVideos);
  });

  it("returns all videos above specified minimum duration", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(filterByDurationYouTube(testVideos, 6000)).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "GjY6y6VAgMamOEFwVxQKZROcobw",
        id: "BcLNfwF04Kw",
        snippet: {
          publishedAt: "2022-06-06T13:00:10Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "GraphQL Crash Course With Full Stack MERN Project",
          description:
            "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "graphql",
            "express",
            "node.js",
            "react",
            "apollo",
            "apollo graphql",
            "mongodb",
            "graphql express",
            "express.js",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "GraphQL Crash Course With Full Stack MERN Project",
            description:
              "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT3H14M39S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "114896",
          likeCount: "4648",
          favoriteCount: "0",
          commentCount: "309",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/BcLNfwF04Kw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });

  it("returns video with duration equal to the minimum specified", () => {
    expect(filterByDurationYouTube(testVideos, 750, 760)).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "eUcSXOPwJTu6USe5ObyvKCLAhX0",
        id: "oc6faXVc54E",
        snippet: {
          publishedAt: "2022-07-12T15:39:48Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
          description:
            "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "javascript",
            "javascript engine",
            "javascript v8 engine",
            "node.js v8",
            "spidermonkey engine",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
            description:
              "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT12M30S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "10191",
          likeCount: "684",
          favoriteCount: "0",
          commentCount: "53",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/oc6faXVc54E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });

  it("returns an empty array if no videos exist above the minimum specified duration", () => {
    expect(filterByDurationYouTube(testVideos, 50000)).toStrictEqual([]);
  });

  it("returns an empty array if no videos exist below the maximum specified duration", () => {
    expect(filterByDurationYouTube(testVideos, 0, 0)).toStrictEqual([]);
  });

  it("returns correct videos in duration interval min-max", () => {
    expect(filterByDurationYouTube(testVideos, 740, 760)).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "eUcSXOPwJTu6USe5ObyvKCLAhX0",
        id: "oc6faXVc54E",
        snippet: {
          publishedAt: "2022-07-12T15:39:48Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
          description:
            "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/oc6faXVc54E/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "javascript",
            "javascript engine",
            "javascript v8 engine",
            "node.js v8",
            "spidermonkey engine",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "JavaScript Under The Hood [5] - JavaScript Engine Overview",
            description:
              "In this final video of the series, we will talk about JS engines and look at how JavaScript code is turned into machine code that runs on the CPU.\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n0:42 - What is a JS Engine?\n1:31 - Specific Browser Engines\n3:30 - Compiled vs Interpreted Languages\n6:11 - JS Engine Process Overview\n7:25 - Abstract Syntax Tree (AST)\n10:01 - Interpreter & Bytecode\n10:58 - JIT Compilation",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT12M30S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "10191",
          likeCount: "684",
          favoriteCount: "0",
          commentCount: "53",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/oc6faXVc54E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });
});

describe("Filter videos by title keyword", () => {
  it("returns all videos for a single common letter filter (case insensitive)", () => {
    expect(filterByKeywordYouTube(testVideos, "e")).toStrictEqual(testVideos);
  });

  it("returns all videos when the keyword is any amount of whitespace", () => {
    expect(filterByKeywordYouTube(testVideos, "   ")).toStrictEqual(testVideos);
  });

  it("returns the appropriate videos given a single keyword search", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(filterByKeywordYouTube(testVideos, "mongodb")).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "i0OysdqEwSKDTO3RGrIdW0sXGU4",
        id: "2QQGWYe7IDU",
        snippet: {
          publishedAt: "2022-01-24T14:00:01Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "MongoDB Crash Course 2022",
          description:
            "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "mongodb",
            "mongo",
            "mongodb crash course",
            "nosql",
            "document database",
            "non-relational database",
            "mongodb atlas",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "MongoDB Crash Course 2022",
            description:
              "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT27M22S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "97597",
          likeCount: "3721",
          favoriteCount: "0",
          commentCount: "118",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/2QQGWYe7IDU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });

  it("returns the appropriate videos given a multiple keyword search", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(
      filterByKeywordYouTube(testVideos, "graphql crash course")
    ).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "GjY6y6VAgMamOEFwVxQKZROcobw",
        id: "BcLNfwF04Kw",
        snippet: {
          publishedAt: "2022-06-06T13:00:10Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "GraphQL Crash Course With Full Stack MERN Project",
          description:
            "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/BcLNfwF04Kw/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "graphql",
            "express",
            "node.js",
            "react",
            "apollo",
            "apollo graphql",
            "mongodb",
            "graphql express",
            "express.js",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "GraphQL Crash Course With Full Stack MERN Project",
            description:
              "⭐ Join Masterschool & pay nothing until you're hired!\nhttps://goto.masterschool.com/brad2022\n\nIn this video, we will build a full-stack project management system with GraphQL, Express, MongoDB, React, and Apollo.\n\n💻 Code:\nhttps://github.com/bradtraversy/project-mgmt-graphql\n\n💻 Query & Mutation Gist:\nhttps://gist.github.com/bradtraversy/fc527bc9a4659ab8de8e8066f3498723\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n\n0:00 - Intro\n1:47 - MasterSchool Sponsor\n2:31 - GraphQL Crash Course Slides\n12:08 - Create Express Server\n17:52 - Start GraphQL\n20:40 - Start Schema\n23:04 - Client Type & Queries\n28:02 - Making Queries With GraphiQL\n32:33 - Project Type & Queries\n35:27 - Project & Client Relationship\n37:23 - Creating a MongoDB Database\n41:36 - Database Connection\n44:59 - Mongoose Models\n48:50 - Fetch Data From MongoDB\n53:02 - Client Mutations\n1:02:50 - Project Mutations\n1:17:30 - Start On The Client\n1:25:30 - Setting Up Apollo\n1:27:57 - Fetch & Display Clients\n1:40:02 - Delete Client Mutation\n1:45:04 - Apollo Cache\n1:50:18 - Create Client Mutation\n2:05:18 - Fetch & Display Projects\n2:14:32 - React Router & Pages Setup\n2:23:47 - Query Single Project\n2:30:53 - Client Info Component\n2:24:00 - Add Project Modal\n2:42:00 - Get Clients For Select\n2:48:50 - Add Project Mutation\n2:54:52 - Delete Project\n3:01:50 - Edit Project Form\n3:07:29 - Update Project Mutation\n3:10:50 - Cascade Project Delete\n3:13:58 - Wrap Up",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT3H14M39S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "114896",
          likeCount: "4648",
          favoriteCount: "0",
          commentCount: "309",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/BcLNfwF04Kw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });

  it("returns an empty array if no videos match the search keyword", () => {
    expect(filterByKeywordYouTube(testVideos, "grand finals")).toStrictEqual(
      []
    );
  });
});

describe("Filter videos by date", () => {
  it("returns all videos older than the provided date", () => {
    expect(filterByDateYouTube(testVideos, new Date(2022, 5, 1))).toStrictEqual(
      [
        {
          kind: "youtube#video",
          etag: "Xt04CLSDVNxy1rhILv7fqzN65pU",
          id: "vxqBm6_0vyk",
          snippet: {
            publishedAt: "2022-05-30T13:00:28Z",
            channelId: "UC29ju8bIPH5as8OGnQzwJyA",
            title: "Python In The Browser! PyScript First Look",
            description:
              "In this video, we will look at the brand new PyScript framework, which uses Web Assembly and Pyodide to write Python and use Python Packages right in our HTML. And no, it will NOT replace JavaScript.\n\n🐍 PyScript Website & Examples:\nhttps://pyscript.net\nhttps://github.com/pyscript/pyscript/tree/main/examples\n\n📘Check out my 300 page Web Dev Guide:\nhttps://traversy.gumroad.com/l/web-dev-guide\n\n💻 All Courses\nhttps://traversymedia.com\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n1:45 - How it works\n4:18 - Getting Started\n5:17 - Disable formatOnSave\n6:06 - Writing Python in HTML\n6:37 - Mixing JavaScript\n7:02 - Targeting DOM elements\n8:15 - REPL\n8:54 - Math module\n9:18 - Env & 3rd party packages\n11:10 - Using a separate .py file\n13:16 - Handling events\n14:45 - Shuffle array\n16:04 - Using Element()\n18:00 - Using multiple files\n20:22 - Wrap up",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/vxqBm6_0vyk/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/vxqBm6_0vyk/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/vxqBm6_0vyk/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Traversy Media",
            tags: [
              "pyscript",
              "python",
              "py script",
              "wasm",
              "pyodide",
              "python javascript",
            ],
            categoryId: "28",
            liveBroadcastContent: "none",
            localized: {
              title: "Python In The Browser! PyScript First Look",
              description:
                "In this video, we will look at the brand new PyScript framework, which uses Web Assembly and Pyodide to write Python and use Python Packages right in our HTML. And no, it will NOT replace JavaScript.\n\n🐍 PyScript Website & Examples:\nhttps://pyscript.net\nhttps://github.com/pyscript/pyscript/tree/main/examples\n\n📘Check out my 300 page Web Dev Guide:\nhttps://traversy.gumroad.com/l/web-dev-guide\n\n💻 All Courses\nhttps://traversymedia.com\n\n💖  Show Support\nPatreon: https://www.patreon.com/traversymedia\nPayPal: https://paypal.me/traversymedia\n\n👇 Follow Me On Social Media:\nTwitter: https://twitter.com/traversymedia\nInstagram: https://www.instagram.com/traversymedia\nLinkedin: https://www.linkedin.com/in/bradtraversy\n\nTimestamps:\n0:00 - Intro\n1:45 - How it works\n4:18 - Getting Started\n5:17 - Disable formatOnSave\n6:06 - Writing Python in HTML\n6:37 - Mixing JavaScript\n7:02 - Targeting DOM elements\n8:15 - REPL\n8:54 - Math module\n9:18 - Env & 3rd party packages\n11:10 - Using a separate .py file\n13:16 - Handling events\n14:45 - Shuffle array\n16:04 - Using Element()\n18:00 - Using multiple files\n20:22 - Wrap up",
            },
            defaultAudioLanguage: "en",
          },
          contentDetails: {
            duration: "PT21M34S",
            dimension: "2d",
            definition: "hd",
            caption: "false",
            licensedContent: true,
            contentRating: {},
            projection: "rectangular",
          },
          statistics: {
            viewCount: "133775",
            likeCount: "4124",
            favoriteCount: "0",
            commentCount: "279",
          },
          player: {
            embedHtml:
              '<iframe width="480" height="270" src="//www.youtube.com/embed/vxqBm6_0vyk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          },
        },
        {
          kind: "youtube#video",
          etag: "i0OysdqEwSKDTO3RGrIdW0sXGU4",
          id: "2QQGWYe7IDU",
          snippet: {
            publishedAt: "2022-01-24T14:00:01Z",
            channelId: "UC29ju8bIPH5as8OGnQzwJyA",
            title: "MongoDB Crash Course 2022",
            description:
              "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/2QQGWYe7IDU/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/2QQGWYe7IDU/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/2QQGWYe7IDU/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Traversy Media",
            tags: [
              "mongodb",
              "mongo",
              "mongodb crash course",
              "nosql",
              "document database",
              "non-relational database",
              "mongodb atlas",
            ],
            categoryId: "28",
            liveBroadcastContent: "none",
            localized: {
              title: "MongoDB Crash Course 2022",
              description:
                "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
            },
            defaultAudioLanguage: "en",
          },
          contentDetails: {
            duration: "PT27M22S",
            dimension: "2d",
            definition: "hd",
            caption: "false",
            licensedContent: true,
            contentRating: {},
            projection: "rectangular",
          },
          statistics: {
            viewCount: "97597",
            likeCount: "3721",
            favoriteCount: "0",
            commentCount: "118",
          },
          player: {
            embedHtml:
              '<iframe width="480" height="270" src="//www.youtube.com/embed/2QQGWYe7IDU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          },
        },
      ]
    );
  });

  it("does not include video on the specified date (unless released at 00:00:00)", () => {
    expect(
      filterByDateYouTube(testVideos, new Date("2022-01-24T14:00:01Z"))
    ).toStrictEqual([
      {
        kind: "youtube#video",
        etag: "i0OysdqEwSKDTO3RGrIdW0sXGU4",
        id: "2QQGWYe7IDU",
        snippet: {
          publishedAt: "2022-01-24T14:00:01Z",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
          title: "MongoDB Crash Course 2022",
          description:
            "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/2QQGWYe7IDU/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Traversy Media",
          tags: [
            "mongodb",
            "mongo",
            "mongodb crash course",
            "nosql",
            "document database",
            "non-relational database",
            "mongodb atlas",
          ],
          categoryId: "28",
          liveBroadcastContent: "none",
          localized: {
            title: "MongoDB Crash Course 2022",
            description:
              "In this video, I will introduce you to MongoDB Atlas, the multi-cloud application data platform from MongoDB, and walk you through how to set up and connect to the database, loading sample data and performing CRUD operations. \n\nThis video will provide you with a basic understanding and way to get started with MongoDB Atlas, but you will learn that there are a variety of other features and ways to interact with your data available, providing you the flexibility to interact in the way that best suits your needs. \n\n▶ Register for MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB Cheat Sheet: https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec\n\n▶ Check out this tutorial to see the 5 different ways to deploy a free database with MongoDB Atlas: https://www.mongodb.com/developer/article/5-different-ways-deploy-free-database-mongodb-atlas/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ Join the MongoDB community:  https://www.mongodb.com/community/forums/?utm_campaign=traversy_media&utm_source=youtube&utm_medium=influencers&utm_term=atlas\n\n▶ MongoDB YouTube Channel: https://www.youtube.com/c/MongoDBofficial\n\n—------------------------------------------------\n\nPresented By:\n▶ Senior Developer Advocate at MongoDB - Jesse Hall aka codeSTACKr: https://youtube.com/codeSTACKr\n▶ @codeSTACKr: https://twitter.com/codeSTACKr",
          },
          defaultAudioLanguage: "en",
        },
        contentDetails: {
          duration: "PT27M22S",
          dimension: "2d",
          definition: "hd",
          caption: "false",
          licensedContent: true,
          contentRating: {},
          projection: "rectangular",
        },
        statistics: {
          viewCount: "97597",
          likeCount: "3721",
          favoriteCount: "0",
          commentCount: "118",
        },
        player: {
          embedHtml:
            '<iframe width="480" height="270" src="//www.youtube.com/embed/2QQGWYe7IDU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      },
    ]);
  });

  it("returns empty list when no videos match the criteria", () => {
    expect(filterByDateYouTube(testVideos, new Date(2021, 7, 3))).toStrictEqual(
      []
    );
  });

  it("returns all videos when the date filter is set to current date/time", () => {
    expect(filterByDateYouTube(testVideos, new Date())).toStrictEqual(
      testVideos
    );
  });
});
