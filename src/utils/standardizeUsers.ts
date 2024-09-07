export const standardizeName = (name: string) => {
  const honorifics = [
    "mr. ",
    "mrs. ",
    "ms. ",
    "dr. ",
    "dr ",
    "miss ",
    "phd ",
    "md ",
    "prof ",
    "fr ",
  ];
  for (let i = 0; i < honorifics.length; i++) {
    if (name.toLowerCase().indexOf(honorifics[i]) === 0) {
      return name.slice(honorifics[i].length);
    }
  }
  return name;
};

export const standardizePhone = (phone: string) => {
  return phone.replace(/[\. _),:-]+(?![ x])/g, "-").replace("(", "");
  // .replace(" x", " \nx");
};
