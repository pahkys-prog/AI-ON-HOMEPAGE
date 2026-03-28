import type{ GalleryItem } from '../types/gallery';

export const GALLERY_DATA: GalleryItem[] = [
  // --- GalleryArt (그림 30개 예시) ---
  {
    id: 1,
    category: 'Art',
    title: "자청비를 만나는 시간",
    artistName: "박외숙",
    description: "처음 제주에 왔을 때는 매일 밤마다 촉촉히 비가 내리고 \n매일 아침마다 안개가 걷히면서 맑은 날이 밝았다. \n하지만, 시간이 지나고... 일기도 예전과 다르다. 그리고 다시 비가 내린다.\n 모든 잎과 열매는 비로 물든다...메마른 땅도 갈증을 채우고  바람도 촉촉하게 얼굴을 스친다...그리고...\n 다시... \n하늘에 무지개 다리를 곳곳에 놓고 \n우리의 눈이 차창을 더듬는 시간을 선물한다...\n긴 숨결로 호흡을 늘리고 \n느리게 흐르는 시간을 천천히 느끼는 시간은 여전하다.",
    thumbnail: "/images/art/Art1.jpg",
    mediaUrl: "/images/art/Art1.jpg"
  },
  {
    id: 2,
    category: 'Art',
    title: "새로운 현실 앞에 마주하다",
    artistName: "박외숙",
    description: "고난의 시간을 맞아 지금까지와는 다른 삶을 살아야 한다는 당혹감과 불안함에도 이어가야 하는 삶에서 다가오는 기적같은 현실과 조우한다.",
    thumbnail: "/images/art/Art2.jpg",
    mediaUrl: "/images/art/Art2.jpg"
  },
  
  // ... (아이디 2~30까지 추가 가능)

  // --- GalleryMovie (동영상 3-4개) ---
  {
    id: 101,
    category: 'Movie',
    title: "해녀고기",
    artistName: "강수정, 강명주, 홍수영",
    description: "해녀고기 광고영상 제작",
    thumbnail: "/images/movie/movie101.mp4",
    mediaUrl: "/images/movie/movie101.mp4" // TODO: 나중에 Firebase 또는 YouTube 주소 입력
  },
  {
    id: 102,
    category: 'Movie',
    title: "꿈고",
    artistName: "강수정",
    description: "꿈꾸는 고양이의 요리 시간을 담은 영상",
    thumbnail: "/images/movie/movie102.mp4",
    mediaUrl: "/images/movie/movie102.mp4" // TODO: 나중에 Firebase 또는 YouTube 주소 입력
  },
  
  {
    id: 103,
    category: 'Movie',
    title: "카중",
    artistName: "강명주",
    description: "카페인 중독 광고영상 제작에서 입상한 작품",
    thumbnail: "/images/movie/movie103.mp4",
    mediaUrl: "/images/movie/movie103.mp4" // TODO: 나중에 Firebase 또는 YouTube 주소 입력
  },

  // --- GalleryEdu (교육 사진) ---
  {
    id: 201,
    category: 'Edu',
    title: "장애인 금융 교육",
    artistName: "AION 교육팀",
    description: "교육 자료 편집",
    thumbnail: "/images/edu/Edu201.gif",
    mediaUrl: "/images/edu/Edu201.webp"
  },
  {
    id: 202,
    category: 'Edu',
    title: "AI 활용 교육",
    artistName: "홍수영",
    description: "교육 자료 편집",
    thumbnail: "/images/edu/Edu202.gif",
    mediaUrl: "/images/edu/Edu202.webp"
  },
  {
    id: 203,
    category: 'Edu',
    title: "강사소감",
    artistName: "강명주",
    description: "강사의 수업 후 소감을 아바타가 발표하는 영상을 제작",
    thumbnail: "/images/edu/Edu203.gif",
    mediaUrl: "/images/edu/Edu203.webp"
  },
]