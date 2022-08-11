var arrRay = [
  {
    id: 1,
    name: "Phu",
    children: [
      {
        id: 2,
        name: "Quoc",
        children: [
          {
            id: 3,
            name: "Vuong",
            children: [
              {
                id: 4,
                name: "Nguyen",
                children: [
                  {
                    id: 7,
                    name: "Nguyen 1",
                    children: [
                      {
                        id: 8,
                        name: "Nguyen 2",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Thi",
        children: [
          {
            id: 6,
            name: "Phuong",
          },
        ],
      },
    ],
  },
];

// INPUT: id = 4;
// OUTPUT: name = "Nguyen";
// đệ quy là một hàm nó sẽ tự gọi chính nó

var main = (id) => {
  var work = (values) => {
    var ketqua;
    for (var ele of values) {
      if (ele.id === id) {
        ketqua = ele;
      } else if (ele.children) {
        ketqua = work(ele.children);
      }
      if (ketqua) {
        return ketqua;
      }
    }
  };
  return work(arrRay).name;
};

var result = main(4);

console.log(result);
