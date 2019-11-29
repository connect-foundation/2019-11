export const phaseList = ["Step 1. 카테고리", "Step 2. 상품등록", "Step 3. 완료"]

export const termList = [
  { title: "1일", term: 1 },
  { title: "2일", term: 2 },
  { title: "3일", term: 3 },
  { title: "4일", term: 4 },
  { title: "5일", term: 5 },
  { title: "6일", term: 6 },
  { title: "1주", term: 7 }
]

export const categoryList = {
  leftTitle: "카테고리",
  rightTitle: "상세 카테고리",
  leftList: ["의류", "가전", "생활"],
  rightList: [
    ["남성의류", "여성의류", "아동의류"],
    ["컴퓨터", "휴대폰", "카메라"],
    ["도서", "문구"]
  ]
}

export const itemDescription = [
  "경매시 즉시 구매가는 변동 될 수 있습니다.",
  "경매가 시작되는 가격입니다.",
  "낙찰 예상가를 적어주세요. 낙찰가와 차이를 알려드립니다."
]

export const notice = {
  successRegister: "정상적으로 등록되었습니다."
}

export const shareConfig = {
  url: `http://palda.shop/products`
}

export const defaultData = {
  title: "",
  contents: "",
  thumbnail: "",
  images: [],
  nowPrice: undefined,
  hopePrice: undefined,
  minPrice: undefined,
  endDate: "",
  categoryCode: undefined
}

export default { phaseList, termList, notice }
