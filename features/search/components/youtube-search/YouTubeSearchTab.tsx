import { useYouTubeSearch } from "features/search/hooks/useYoutubeSearch";
import { YouTubeChannelResult } from "./YouTubeChannelResult";

interface YouTubeSearchTabProps {
  searchQuery: string;
}

// ! Use this data for UI handling and design. Calling the actual API is expensive and should be avoided in development where possible.
const testData = {
  kind: "youtube#searchListResponse",
  etag: "lWVZc5USbrxXlJdsB9Zv2nAgmCk",
  nextPageToken: "CBkQAA",
  regionCode: "AU",
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 25,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "CHYY7VlBkyJiSXtbGbyn9k5LTA0",
      id: {
        kind: "youtube#channel",
        channelId: "UC6zzlBIwNS9GJZZ3rBx_WhQ",
      },
      snippet: {
        publishedAt: "2020-07-25T21:28:02Z",
        channelId: "UC6zzlBIwNS9GJZZ3rBx_WhQ",
        title: "Hudson's Playground Gaming",
        description:
          "Hudson's Playground Gaming is a channel me and Hudson decided to make featuring family friendly gaming! We will play farming ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Hudson's Playground Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2020-07-25T21:28:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "_8PMvFXEjIvgjkSMLg0YC3dP7dw",
      id: {
        kind: "youtube#channel",
        channelId: "UCIPPMRA040LQr5QPyJEbmXA",
      },
      snippet: {
        publishedAt: "2020-04-07T18:46:13Z",
        channelId: "UCIPPMRA040LQr5QPyJEbmXA",
        title: "MrBeast Gaming",
        description: "MrBeast Gaming - SUBSCRIBE OR ELSE.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "MrBeast Gaming",
        liveBroadcastContent: "none",
        publishTime: "2020-04-07T18:46:13Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "L3rI0Bh1SzXUttcdIO4fzl-sA5I",
      id: {
        kind: "youtube#channel",
        channelId: "UCWcly5Teks2uSNsF5hRFNNg",
      },
      snippet: {
        publishedAt: "2019-03-04T10:12:37Z",
        channelId: "UCWcly5Teks2uSNsF5hRFNNg",
        title: "Norris Nuts Gaming",
        description:
          "Norris Nuts Gaming Channel. Doing gaming the Norris Nuts way! Fun quirky family friendly from Sabre, Sockie, Biggy Naz, Disco ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRBogdQ5WJfnp_AWwFHujjza5gt8LhAkatAT7XTKQ=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRBogdQ5WJfnp_AWwFHujjza5gt8LhAkatAT7XTKQ=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRBogdQ5WJfnp_AWwFHujjza5gt8LhAkatAT7XTKQ=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Norris Nuts Gaming",
        liveBroadcastContent: "none",
        publishTime: "2019-03-04T10:12:37Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "8-z32_WOJ4Kn0Dsmls-ckpRytMo",
      id: {
        kind: "youtube#channel",
        channelId: "UC5ClPDdbfTUYNSsjXpu5n3A",
      },
      snippet: {
        publishedAt: "2019-06-20T20:58:59Z",
        channelId: "UC5ClPDdbfTUYNSsjXpu5n3A",
        title: "Sopo Squad Gaming",
        description:
          "Roblox gaming family!! It's the Sopo Squad! Watch Dad, Mike (mikedrop937), daughter Cammy (CammyxBoba), Mom, Lizzy ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/Xjbs3T249dYW6UblhzFOyt4Ydtv5hzUlIYNIhBvpr5qjRSDGtqP-JgsYAYM23CFpnDEWwceB=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/Xjbs3T249dYW6UblhzFOyt4Ydtv5hzUlIYNIhBvpr5qjRSDGtqP-JgsYAYM23CFpnDEWwceB=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/Xjbs3T249dYW6UblhzFOyt4Ydtv5hzUlIYNIhBvpr5qjRSDGtqP-JgsYAYM23CFpnDEWwceB=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Sopo Squad Gaming",
        liveBroadcastContent: "none",
        publishTime: "2019-06-20T20:58:59Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "op56ep99nucn5cw2WJj6Ob0imAA",
      id: {
        kind: "youtube#channel",
        channelId: "UCTRohxutThBffdcP3H6O0Zg",
      },
      snippet: {
        publishedAt: "2016-05-02T17:52:15Z",
        channelId: "UCTRohxutThBffdcP3H6O0Zg",
        title: "Indigo Gaming",
        description:
          "Insightful game analysis, reviews and retrospectives with an emphasis on historical importance and their impact on the industry.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTECHjuKHEzOAYJxT8PzxhcdycgEtfoTVNb-pP1Bg=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTECHjuKHEzOAYJxT8PzxhcdycgEtfoTVNb-pP1Bg=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTECHjuKHEzOAYJxT8PzxhcdycgEtfoTVNb-pP1Bg=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Indigo Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2016-05-02T17:52:15Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "MpbexPuXIRyV9bKNCk2paEdQ9rg",
      id: {
        kind: "youtube#channel",
        channelId: "UCvO9Xk3bheuxEemvknCj72g",
      },
      snippet: {
        publishedAt: "2015-09-22T11:05:15Z",
        channelId: "UCvO9Xk3bheuxEemvknCj72g",
        title: "WhatCulture Gaming",
        description: "",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/kqb1YIEVKcjNLhDseGoltwKv_b7G1svno6aiw6wuAVn-IgfgebL64_6dcJTB2JVAmGhgyRixpA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/kqb1YIEVKcjNLhDseGoltwKv_b7G1svno6aiw6wuAVn-IgfgebL64_6dcJTB2JVAmGhgyRixpA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/kqb1YIEVKcjNLhDseGoltwKv_b7G1svno6aiw6wuAVn-IgfgebL64_6dcJTB2JVAmGhgyRixpA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "WhatCulture Gaming",
        liveBroadcastContent: "none",
        publishTime: "2015-09-22T11:05:15Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "rQD88_GBUE94A-rAnBrvhAThOqI",
      id: {
        kind: "youtube#channel",
        channelId: "UCugqjlk-tkE_uZnG0tDbQyg",
      },
      snippet: {
        publishedAt: "2016-05-04T04:10:56Z",
        channelId: "UCugqjlk-tkE_uZnG0tDbQyg",
        title: "Wow Such Gaming",
        description:
          "Why You Wouldn't Survive, Zombie Sins, Zombie movie reviews and sometimes Left 4 Dead speed runs. STAY WOW.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSU27KiMR1ZwceURHP4lFhICpCXWvqUEFUn_cP1EA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSU27KiMR1ZwceURHP4lFhICpCXWvqUEFUn_cP1EA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSU27KiMR1ZwceURHP4lFhICpCXWvqUEFUn_cP1EA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Wow Such Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2016-05-04T04:10:56Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "cpap4co07Br44HUxB_fZN5BImiQ",
      id: {
        kind: "youtube#channel",
        channelId: "UCWp3_e0cQvBHVpb_pTge5FQ",
      },
      snippet: {
        publishedAt: "2017-09-12T01:14:53Z",
        channelId: "UCWp3_e0cQvBHVpb_pTge5FQ",
        title: "Sam Tabor Gaming",
        description:
          "Hey! I'm Sam. A lot of you may know me from my skateboarding videos, but LITTLE DID YOU KNOW I love video games too.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQOBLFXie59f5kIhhD9eVcbnRRc4rJbW8WRbhTelw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQOBLFXie59f5kIhhD9eVcbnRRc4rJbW8WRbhTelw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQOBLFXie59f5kIhhD9eVcbnRRc4rJbW8WRbhTelw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Sam Tabor Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2017-09-12T01:14:53Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "kldWZ3ZBUA9J57RgyCqUJWHwVaY",
      id: {
        kind: "youtube#channel",
        channelId: "UC7BE9QNju4NMgDDL75-uj2A",
      },
      snippet: {
        publishedAt: "2020-04-22T21:03:53Z",
        channelId: "UC7BE9QNju4NMgDDL75-uj2A",
        title: "XOXO Gaming",
        description:
          "Hi! I'm Addy from Tic Tac Toy and welcome to my official gaming channel. I love to play Roblox with my sister Maya and our XOXO ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTBC3N2GQ-J464Yk6cdGKDMK17IY92HVWmWieFW=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTBC3N2GQ-J464Yk6cdGKDMK17IY92HVWmWieFW=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTBC3N2GQ-J464Yk6cdGKDMK17IY92HVWmWieFW=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "XOXO Gaming",
        liveBroadcastContent: "none",
        publishTime: "2020-04-22T21:03:53Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "nyafbZIGRguqFLn5p2DhvvHren4",
      id: {
        kind: "youtube#channel",
        channelId: "UC85aYbNSFjsJdxfpxgQr8tA",
      },
      snippet: {
        publishedAt: "2014-02-04T20:26:13Z",
        channelId: "UC85aYbNSFjsJdxfpxgQr8tA",
        title: "Judo Sloth Gaming",
        description:
          "A Clash of Clans based channel focusing on helping you improve your gameplay. You will see a variety of content from guides to ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQjWTCn83fNAmDgzmnIKeBLjdqt3_xxUQ-Ompk98g=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQjWTCn83fNAmDgzmnIKeBLjdqt3_xxUQ-Ompk98g=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQjWTCn83fNAmDgzmnIKeBLjdqt3_xxUQ-Ompk98g=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Judo Sloth Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2014-02-04T20:26:13Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "2Cxpm0pPBB-4_UL6gPKXtEVZcwo",
      id: {
        kind: "youtube#channel",
        channelId: "UCnbvPS_rXp4PC21PG2k1UVg",
      },
      snippet: {
        publishedAt: "2006-07-17T15:22:55Z",
        channelId: "UCnbvPS_rXp4PC21PG2k1UVg",
        title: "Gaming Historian",
        description:
          "The Gaming Historian is a documentary series all about the history of video games. The show is researched, written, edited, and ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSD_e-_nxZmHo6xDyw91rfwpKS5BzyVH4Z31jXOxw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSD_e-_nxZmHo6xDyw91rfwpKS5BzyVH4Z31jXOxw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSD_e-_nxZmHo6xDyw91rfwpKS5BzyVH4Z31jXOxw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Gaming Historian",
        liveBroadcastContent: "none",
        publishTime: "2006-07-17T15:22:55Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "ihfJHddAby6yRdYcrvuzi9ODWi0",
      id: {
        kind: "youtube#channel",
        channelId: "UCT7njg__VOy3n-SvXemDHvg",
      },
      snippet: {
        publishedAt: "2015-03-12T04:37:44Z",
        channelId: "UCT7njg__VOy3n-SvXemDHvg",
        title: "Core-A Gaming",
        description: "Videos about fighting games.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSpUYiXB1_gJKOFJU_-xBha71wc4XuDMHGeZjg3HA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSpUYiXB1_gJKOFJU_-xBha71wc4XuDMHGeZjg3HA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSpUYiXB1_gJKOFJU_-xBha71wc4XuDMHGeZjg3HA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Core-A Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2015-03-12T04:37:44Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Ud0FM9vSXsrPgTt7WPBL6uhMftA",
      id: {
        kind: "youtube#channel",
        channelId: "UCvv9tYxOWhqUy9tsdFtVLsQ",
      },
      snippet: {
        publishedAt: "2021-10-30T18:53:44Z",
        channelId: "UCvv9tYxOWhqUy9tsdFtVLsQ",
        title: "Esmail Gaming",
        description: "",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/KLnSQ4824gozw-UG-30vQLLRhvHp_FdlytrR7mV8XzF41xSD13hZA7uNjf_K-DB7zZgTXrpXCg=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/KLnSQ4824gozw-UG-30vQLLRhvHp_FdlytrR7mV8XzF41xSD13hZA7uNjf_K-DB7zZgTXrpXCg=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/KLnSQ4824gozw-UG-30vQLLRhvHp_FdlytrR7mV8XzF41xSD13hZA7uNjf_K-DB7zZgTXrpXCg=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Esmail Gaming",
        liveBroadcastContent: "live",
        publishTime: "2021-10-30T18:53:44Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Gri9DoOlSk0OZTggxANzqjR6vIs",
      id: {
        kind: "youtube#channel",
        channelId: "UCFqmcAvY-lLQHJcfOHJavGQ",
      },
      snippet: {
        publishedAt: "2016-01-01T22:04:10Z",
        channelId: "UCFqmcAvY-lLQHJcfOHJavGQ",
        title: "kAN Gaming",
        description:
          "Welcome to the kAN Gaming channel! I like playing games and sometimes making videos about them!",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSh50hIcW4ojWV3ql8XsFQ9IVRbjrnzFujEGRWPZw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSh50hIcW4ojWV3ql8XsFQ9IVRbjrnzFujEGRWPZw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSh50hIcW4ojWV3ql8XsFQ9IVRbjrnzFujEGRWPZw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "kAN Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2016-01-01T22:04:10Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "G7i0XU_yla0XMYcAKjuxNBniVdM",
      id: {
        kind: "youtube#channel",
        channelId: "UCATWC1JSlhzmYeDbjnS8WwA",
      },
      snippet: {
        publishedAt: "2016-11-15T17:40:34Z",
        channelId: "UCATWC1JSlhzmYeDbjnS8WwA",
        title: "Senpai Gaming",
        description:
          "Live Streaming in a nutshell | Camera/Mic Reviews, Social Media Strats, Gaming/Streaming PC Builds, Sponsorship Help, all the ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/Ay_iISsAu4H7cUnelRLu7ZOT5YQP_NGRHkEXH3D-i-jWiRbKpgLhHqP5Iv3f5Q4eaZfwT3-oxw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/Ay_iISsAu4H7cUnelRLu7ZOT5YQP_NGRHkEXH3D-i-jWiRbKpgLhHqP5Iv3f5Q4eaZfwT3-oxw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/Ay_iISsAu4H7cUnelRLu7ZOT5YQP_NGRHkEXH3D-i-jWiRbKpgLhHqP5Iv3f5Q4eaZfwT3-oxw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Senpai Gaming",
        liveBroadcastContent: "none",
        publishTime: "2016-11-15T17:40:34Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "5yvI1cFoeA6ddnz3GTFQzhdN5Hw",
      id: {
        kind: "youtube#channel",
        channelId: "UC_DCVMhIdgwQ1uUE76XLXZg",
      },
      snippet: {
        publishedAt: "2014-10-21T14:59:26Z",
        channelId: "UC_DCVMhIdgwQ1uUE76XLXZg",
        title: "DieselDesigns Gaming",
        description:
          "A Wild Array of games from Simulators, Creative Building, Sandbox Games, and MORE! Videos every day, Live Streams Every ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSrcXnKj0iu0yWrEzF_7F9MSoGyLrhXzCS2aD4SIA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSrcXnKj0iu0yWrEzF_7F9MSoGyLrhXzCS2aD4SIA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSrcXnKj0iu0yWrEzF_7F9MSoGyLrhXzCS2aD4SIA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "DieselDesigns Gaming",
        liveBroadcastContent: "none",
        publishTime: "2014-10-21T14:59:26Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "0Bqam1CvnrNhOFbHXN6TA7CYH60",
      id: {
        kind: "youtube#channel",
        channelId: "UCz2_M6-NBgdiLvDOmlH074g",
      },
      snippet: {
        publishedAt: "2013-03-18T16:10:13Z",
        channelId: "UCz2_M6-NBgdiLvDOmlH074g",
        title: "The Gaming Merchant",
        description:
          "Welcome To The Gaming Merchant. Currently I am playing Apex Legends! I am doing Apex Legends guides, tips and tricks, and ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJpdk3o-GvuI29qUgjbzM7gYH5rhAtb496lhNwqQ=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJpdk3o-GvuI29qUgjbzM7gYH5rhAtb496lhNwqQ=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJpdk3o-GvuI29qUgjbzM7gYH5rhAtb496lhNwqQ=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "The Gaming Merchant",
        liveBroadcastContent: "none",
        publishTime: "2013-03-18T16:10:13Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "gAKod91BaKOqjcpam_4ZdN3DMsM",
      id: {
        kind: "youtube#channel",
        channelId: "UC15pq102hQe7FnGq68gKHoQ",
      },
      snippet: {
        publishedAt: "2019-09-17T18:35:17Z",
        channelId: "UC15pq102hQe7FnGq68gKHoQ",
        title: "Ic0n Gaming",
        description:
          "Hey guys! My name is Ic0n and this is my gaming channel. I create playthroughs, game reviews, tutorials and Let's Play series and ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/PFrcIPURbZJr-Gqpi02La2CPWjm8Iap0CAkBrMKVKRkdAzRqUqUOItAgIVf0a3-YUPTPpW5J3bI=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/PFrcIPURbZJr-Gqpi02La2CPWjm8Iap0CAkBrMKVKRkdAzRqUqUOItAgIVf0a3-YUPTPpW5J3bI=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/PFrcIPURbZJr-Gqpi02La2CPWjm8Iap0CAkBrMKVKRkdAzRqUqUOItAgIVf0a3-YUPTPpW5J3bI=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Ic0n Gaming",
        liveBroadcastContent: "none",
        publishTime: "2019-09-17T18:35:17Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "AymZ1oD35x0b8CzkVqCo0RgsX18",
      id: {
        kind: "youtube#channel",
        channelId: "UCmlqW3C9C0_gA0LufzbHfKg",
      },
      snippet: {
        publishedAt: "2017-07-19T18:09:38Z",
        channelId: "UCmlqW3C9C0_gA0LufzbHfKg",
        title: "Legacy Gaming",
        description:
          "Leave a Legacy! Join Codiak and Livid and be part of a fast growing positive gaming community. With in-depth coverage of the ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRQR93GRTH06VuOhwAcR4-fa8Jx4uml2BZXBbVE=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRQR93GRTH06VuOhwAcR4-fa8Jx4uml2BZXBbVE=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRQR93GRTH06VuOhwAcR4-fa8Jx4uml2BZXBbVE=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Legacy Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2017-07-19T18:09:38Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "S6bD5vh1T_L1mdR22SujyYHj0-w",
      id: {
        kind: "youtube#channel",
        channelId: "UCDGbmCxt2CEZAsDh1CiWXsQ",
      },
      snippet: {
        publishedAt: "2016-11-17T12:29:50Z",
        channelId: "UCDGbmCxt2CEZAsDh1CiWXsQ",
        title: "False Swipe Gaming",
        description:
          "False Swipe Gaming aims to make quality video content for video games, mainly for Pokemon and Smash at the moment but ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJMHIHxqRoNPXqDlwuEHTCfwQydXc-LRLFSBn6Ig=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJMHIHxqRoNPXqDlwuEHTCfwQydXc-LRLFSBn6Ig=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTJMHIHxqRoNPXqDlwuEHTCfwQydXc-LRLFSBn6Ig=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "False Swipe Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2016-11-17T12:29:50Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "G1IEstWvYLo8jr65uCsXAlMBljk",
      id: {
        kind: "youtube#channel",
        channelId: "UChIs72whgZI9w6d6FhwGGHA",
      },
      snippet: {
        publishedAt: "2009-05-12T02:03:49Z",
        channelId: "UChIs72whgZI9w6d6FhwGGHA",
        title: "Gamers Nexus",
        description:
          "PC hardware reviews, game benchmarks, component analysis. Please subscribe for updates!",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLS6GBQOV5GZSGqCfZas_glC6Jj1p03J9gnpXKsuxw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLS6GBQOV5GZSGqCfZas_glC6Jj1p03J9gnpXKsuxw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLS6GBQOV5GZSGqCfZas_glC6Jj1p03J9gnpXKsuxw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Gamers Nexus",
        liveBroadcastContent: "upcoming",
        publishTime: "2009-05-12T02:03:49Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "qB-1_0tQvlG6fTslz-u9fF0YYKE",
      id: {
        kind: "youtube#channel",
        channelId: "UCsmD5774MOQhjYBkXqu3Jdw",
      },
      snippet: {
        publishedAt: "2016-03-18T17:47:28Z",
        channelId: "UCsmD5774MOQhjYBkXqu3Jdw",
        title: "Geek Gaming Scenics",
        description:
          "Hobby channel mostly focused on terrain scenics and sometimes minature painting. Lukes APS has come a long way since the ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRrZHe_M8RkEhjrUMjjZyWhGTXFakN-Mphr9VwrQA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRrZHe_M8RkEhjrUMjjZyWhGTXFakN-Mphr9VwrQA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRrZHe_M8RkEhjrUMjjZyWhGTXFakN-Mphr9VwrQA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Geek Gaming Scenics",
        liveBroadcastContent: "upcoming",
        publishTime: "2016-03-18T17:47:28Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "fgJhszGnFhkfML-BZTbkTkiK0mE",
      id: {
        kind: "youtube#channel",
        channelId: "UCzVnXCLWqY5dtOBn9UZoFTw",
      },
      snippet: {
        publishedAt: "2017-08-21T13:01:11Z",
        channelId: "UCzVnXCLWqY5dtOBn9UZoFTw",
        title: "LEGO Gaming",
        description:
          "Welcome to the LEGO Gaming channel! That's right, a channel dedicated to all things LEGO Games. How awesome is that?",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLR6fGSLjwHo08Xcl9AGW7Z0pqlduemz6wDUWW_ylQ=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLR6fGSLjwHo08Xcl9AGW7Z0pqlduemz6wDUWW_ylQ=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLR6fGSLjwHo08Xcl9AGW7Z0pqlduemz6wDUWW_ylQ=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "LEGO Gaming",
        liveBroadcastContent: "none",
        publishTime: "2017-08-21T13:01:11Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "38qlx3hksoAaEzMKJzI6PTfPdpE",
      id: {
        kind: "youtube#channel",
        channelId: "UCXHGoWpySS0smjanTUDa6Gw",
      },
      snippet: {
        publishedAt: "2021-02-22T22:32:08Z",
        channelId: "UCXHGoWpySS0smjanTUDa6Gw",
        title: "GameToons Gaming",
        description:
          "Welcome to GameToons Gaming! We create mods on your favorite games like Among Us and Friday Night Funkin'!",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTk6VchZjvf85MNRqYtrC8i86oKFSjuWMeC02fj=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTk6VchZjvf85MNRqYtrC8i86oKFSjuWMeC02fj=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLTk6VchZjvf85MNRqYtrC8i86oKFSjuWMeC02fj=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "GameToons Gaming",
        liveBroadcastContent: "none",
        publishTime: "2021-02-22T22:32:08Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "SojfK_PR4xrTgCmsgVoo3qY5oi8",
      id: {
        kind: "youtube#channel",
        channelId: "UCX23_3u-d5aMcf-TB8fM9aQ",
      },
      snippet: {
        publishedAt: "2022-01-03T07:34:45Z",
        channelId: "UCX23_3u-d5aMcf-TB8fM9aQ",
        title: "Tallman Gaming",
        description:
          "SUBSCRIBE for your Daily dose of GTA V #Shorts #SUBGOAL 5K THANK Y'ALL SO MUCH FOR EVERYONE WHO SUB!",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/M4vOgM5PQPlc-g-ClEyuErW_4x2ytoNo4YBNS4avRq0LyvFw6HFs5ilLc-ntKEuqMUBKPaA3qA=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/M4vOgM5PQPlc-g-ClEyuErW_4x2ytoNo4YBNS4avRq0LyvFw6HFs5ilLc-ntKEuqMUBKPaA3qA=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/M4vOgM5PQPlc-g-ClEyuErW_4x2ytoNo4YBNS4avRq0LyvFw6HFs5ilLc-ntKEuqMUBKPaA3qA=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Tallman Gaming",
        liveBroadcastContent: "none",
        publishTime: "2022-01-03T07:34:45Z",
      },
    },
  ],
};

export const YouTubeSearchTab = ({ searchQuery }: YouTubeSearchTabProps) => {
  const { isLoading, isError, data } = useYouTubeSearch(searchQuery, "channel");

  return (
    <div>
      {isLoading && <div>YouTube loading...</div>}

      {isError && <div>An error has occurred</div>}

      {data && (
        <>
          {data.items.length > 0 ? (
            <>
              {data.items.map((channel) => (
                <YouTubeChannelResult
                  key={channel.etag}
                  channelData={channel.snippet}
                />
              ))}
            </>
          ) : (
            <div>No results found</div>
          )}
        </>
      )}
      {/* {testData && (
        <>
          {testData.items.map((channel) => (
            <YouTubeChannelResult key={channel.etag} channelData={channel.snippet} />
          ))}
        </>
      )} */}
    </div>
  );
};
