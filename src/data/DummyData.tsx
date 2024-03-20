export interface Memo {
  Title: string;
  Shared: string;
}

export const data: Memo[] = [
  { Title: "Title 1", Shared: "4" },
  { Title: "Title 2", Shared: "1" },
  { Title: "Title 3", Shared: "3" },
  { Title: "Title 4", Shared: "6" },
  { Title: "Title 5", Shared: "2" },
  { Title: "Title 6", Shared: "8" },
  { Title: "Title 7", Shared: "1" },
  { Title: "Title 8", Shared: "7" },
];

export interface Note {
  title: string;
  content: string;
}

export const url =
  "https://prod-91.eastus.logic.azure.com/workflows/8738d724d71e4889a43b46be70a28d39/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2mhH0x5L_xdgEnqvG4mMrNfLJbil55wm_aP8ICvAaes";
