// initialization
function iniVege () {
  // if no local storage found, create default ones
  localStorage.setItem("numberOfVege", 13);
  localStorage.setItem("vegeList0", "Artichoke");
  localStorage.setItem("vegeList1", "Asparagus");
  localStorage.setItem("vegeList2", "Avocado");
  localStorage.setItem("vegeList3", "Bamboo Shoot");
  localStorage.setItem("vegeList4", "Basil");
  localStorage.setItem("vegeList5", "Bean Black");
  localStorage.setItem("vegeList6", "Bean Broad");
  localStorage.setItem("vegeList7", "Bean Butter");
  localStorage.setItem("vegeList8", "Bean Green");
  localStorage.setItem("vegeList9", "Bean Lupin");
  localStorage.setItem("vegeList10", "Bean Red-Kidney");
  localStorage.setItem("vegeList11", "Beetroot");
  localStorage.setItem("vegeList12", "Bok Choy");

  var size = localStorage.getItem("numberOfVege");

  items = [];
  for (var j = 0; j < size; j++) {
    var text = localStorage.getItem("vegeList" + j);
    items.push({text: text, img: "img/" + text + ".png"});
  }

  return items;
}