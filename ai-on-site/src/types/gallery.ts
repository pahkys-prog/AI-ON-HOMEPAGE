export type GalleryCategory = "Art" | "Movie" | "Edu";

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  artistName: string;
  description: string;
  thumbnail: string; // 목록에 보여줄 이미지
  mediaUrl: string; // 상세 보기용 고해상도 이미지 또는 동영상 UR
}
