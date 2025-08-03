export interface TarotCard {
  id: number;
  name: string;
  eng: string;
  image: string;
  meaning: string;
}

export const tarotCards: TarotCard[] = [
  // 메이저 아르카나 22장
  {
    id: 0,
    name: "바보",
    eng: "The Fool",
    image: "00-TheFool.jpg",
    meaning: "새로운 시작, 자유, 순수함",
  },
  {
    id: 1,
    name: "마법사",
    eng: "The Magician",
    image: "01-TheMagician.jpg",
    meaning: "의지, 창조, 능력",
  },
  {
    id: 2,
    name: "여사제",
    eng: "The High Priestess",
    image: "02-TheHighPriestess.jpg",
    meaning: "직관, 신비, 잠재력",
  },
  {
    id: 3,
    name: "여황제",
    eng: "The Empress",
    image: "03-TheEmpress.jpg",
    meaning: "풍요, 모성, 창조성",
  },
  {
    id: 4,
    name: "황제",
    eng: "The Emperor",
    image: "04-TheEmperor.jpg",
    meaning: "권위, 안정, 구조",
  },
  {
    id: 5,
    name: "교황",
    eng: "The Hierophant",
    image: "05-TheHierophant.jpg",
    meaning: "전통, 신념, 조언",
  },
  {
    id: 6,
    name: "연인",
    eng: "The Lovers",
    image: "06-TheLovers.jpg",
    meaning: "사랑, 조화, 선택",
  },
  {
    id: 7,
    name: "전차",
    eng: "The Chariot",
    image: "07-TheChariot.jpg",
    meaning: "승리, 의지, 추진력",
  },
  {
    id: 8,
    name: "힘",
    eng: "Strength",
    image: "08-Strength.jpg",
    meaning: "용기, 인내, 내면의 힘",
  },
  {
    id: 9,
    name: "은둔자",
    eng: "The Hermit",
    image: "09-TheHermit.jpg",
    meaning: "고독, 탐구, 내면의 지혜",
  },
  {
    id: 10,
    name: "운명의 수레바퀴",
    eng: "Wheel of Fortune",
    image: "10-WheelOfFortune.jpg",
    meaning: "운명, 변화, 전환점",
  },
  {
    id: 11,
    name: "정의",
    eng: "Justice",
    image: "11-Justice.jpg",
    meaning: "정의, 균형, 책임",
  },
  {
    id: 12,
    name: "매달린 사람",
    eng: "The Hanged Man",
    image: "12-TheHangedMan.jpg",
    meaning: "희생, 관점의 변화, 인내",
  },
  {
    id: 13,
    name: "죽음",
    eng: "Death",
    image: "13-Death.jpg",
    meaning: "끝, 변화, 새로운 시작",
  },
  {
    id: 14,
    name: "절제",
    eng: "Temperance",
    image: "14-Temperance.jpg",
    meaning: "조화, 절제, 균형",
  },
  {
    id: 15,
    name: "악마",
    eng: "The Devil",
    image: "15-TheDevil.jpg",
    meaning: "유혹, 집착, 속박",
  },
  {
    id: 16,
    name: "탑",
    eng: "The Tower",
    image: "16-TheTower.jpg",
    meaning: "혼란, 붕괴, 해방",
  },
  {
    id: 17,
    name: "별",
    eng: "The Star",
    image: "17-TheStar.jpg",
    meaning: "희망, 영감, 치유",
  },
  {
    id: 18,
    name: "달",
    eng: "The Moon",
    image: "18-TheMoon.jpg",
    meaning: "불확실, 환상, 잠재의식",
  },
  {
    id: 19,
    name: "태양",
    eng: "The Sun",
    image: "19-TheSun.jpg",
    meaning: "성공, 기쁨, 활력",
  },
  {
    id: 20,
    name: "심판",
    eng: "Judgement",
    image: "20-Judgement.jpg",
    meaning: "부활, 각성, 평가",
  },
  {
    id: 21,
    name: "세계",
    eng: "The World",
    image: "21-TheWorld.jpg",
    meaning: "완성, 성취, 여행",
  },

  // 마이너 아르카나 56장 (완드, 컵, 소드, 펜타클)
  // 각 슈트별로 ace~10, page, knight, queen, king
  ...["wands", "cups", "swords", "pentacles"]
    .flatMap((suit, sIdx) => {
      const suitKor = ["완드", "컵", "소드", "펜타클"][sIdx];
      const suitEng = ["Wands", "Cups", "Swords", "Pentacles"][sIdx];
      const numbers = [
        { n: 1, kor: "에이스", eng: "Ace", meaning: "새로운 시작, 잠재력" },
        { n: 2, kor: "2", eng: "Two", meaning: "균형, 파트너십" },
        { n: 3, kor: "3", eng: "Three", meaning: "성장, 협력" },
        { n: 4, kor: "4", eng: "Four", meaning: "안정, 휴식" },
        { n: 5, kor: "5", eng: "Five", meaning: "갈등, 도전" },
        { n: 6, kor: "6", eng: "Six", meaning: "성취, 회복" },
        { n: 7, kor: "7", eng: "Seven", meaning: "인내, 경쟁" },
        { n: 8, kor: "8", eng: "Eight", meaning: "빠른 변화, 움직임" },
        { n: 9, kor: "9", eng: "Nine", meaning: "시련, 회복력" },
        { n: 10, kor: "10", eng: "Ten", meaning: "완성, 부담" },
      ];
      const courts = [
        { n: 11, kor: "페이지", eng: "Page", meaning: "메시지, 시작, 호기심" },
        { n: 12, kor: "나이트", eng: "Knight", meaning: "행동, 추진력, 열정" },
        { n: 13, kor: "퀸", eng: "Queen", meaning: "이해, 배려, 성숙" },
        { n: 14, kor: "킹", eng: "King", meaning: "리더십, 통제, 성취" },
      ];
      return [
       // 숫자 카드 이미지 이름 조합
       ...numbers.map((num, i) => ({
        id: 22 + sIdx * 14 + i,
        name: `${suitKor} ${num.kor}`,
        eng: `${num.eng} of ${suitEng}`,
        // 파일명 형식: Wands01.jpg, Cups05.jpg
        image: `${suitEng.charAt(0).toUpperCase()}${suitEng.slice(1)}${num.n < 10 ? '0' : ''}${num.n}.jpg`,
        meaning: num.meaning + ` (${suitKor})`,
      })),

      // 코트 카드 이미지 이름 조합
      ...courts.map((court, i) => ({
        id: 22 + sIdx * 14 + 10 + i,
        name: `${suitKor} ${court.kor}`,
        eng: `${court.eng} of ${suitEng}`,
        // 파일명 형식: Wands11.jpg, Cups14.jpg
        image: `${suitEng.charAt(0).toUpperCase()}${suitEng.slice(1)}${court.n}.jpg`,
        meaning: court.meaning + ` (${suitKor})`,
        })),
      ];
    })
    .flat(),
];
