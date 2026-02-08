
export interface Collection {
  id: number;
  title: string;
  video: string;
  poster?: string; // Optional poster image for preloading
}

export const collections: Collection[] = [
  {
    id: 1,
    title: "Classic Watches",
    video: "/room_0.mp4",
    poster: "/room_0_frame.png", // Poster image for preloading
  },
  {
    id: 2,
    title: "Luxury Collection",
    video: "/room_1.mp4",
    poster: "/room_1_frame.png", // Poster image for preloading
  },
  {
    id: 3,
    title: "Sport Edition",
    video: "/room_2.mp4",
    poster: "/room_2_frame.png", // Poster image for preloading
  },
  {
    id: 4,
    title: "Modern Collection",
    video: "/room_3.mp4",
    poster: "/room_3_frame.png", // Poster image for preloading
  },
  {
    id: 5,
    title: "Vintage Collection",
    video: "/room_4.mp4",
    poster: "/room_4_frame.png", // Poster image for preloading
  },
  {
    id: 6,
    title: "Elegant Collection",
    video: "/video1.mp4",
    poster: "/video_1_frame.png", // Poster image for preloading
  }
];
