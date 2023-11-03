
export type Data = {
  entries: [
    {
      title:string;
      photoURL:string;
      notes:string;
      entryId:number;
    },
  ];
  editing: null;
  nextEntryId: number;
};

let data: Data = {
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', dataJSON);
});

const localData = JSON.parse(localStorage.getItem('code-journal-data'));
if (localData) {
  data = localData;
}

export function getData() {
  return data;
}
