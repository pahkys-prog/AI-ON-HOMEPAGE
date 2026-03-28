// 같은 폴더 내에 있는 파일들을 가져옵니다. (./ 사용)
import { artData } from "./artData";
import { movieData } from "./movieData";
import { eduData } from "./eduData";

// 1. 모든 데이터를 하나로 합친 배열 (기존 galleryData와 동일한 역할)
export const allGalleryData = [...artData, ...movieData, ...eduData];

// 2. 혹시 특정 카테고리만 따로 부르고 싶을 때를 위해 개별적으로도 내보냅니다.
export { artData, movieData, eduData };