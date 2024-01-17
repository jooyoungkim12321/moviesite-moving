import { atom } from "recoil";

interface ICheckContent {
  id: number | undefined;
  title: string | undefined;
  image: string | undefined;
}

interface ICheck {
  [key: string]: ICheckContent[];
}

export const CheckListState = atom<ICheck>({
  key: "checkKey",
  default: {
    "나중에 볼 콘텐츠": [],
    "찜한 콘텐츠": [],
  },
});
