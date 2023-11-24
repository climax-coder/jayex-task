import TagModel from "../app/models/Tag";
import ListModel from "../app/models/List";

const initialTags = [
  "Feature",
  "UI",
  "PoC",
  "Frontend",
  "Backend",
  "Bug",
  "DevOps",
];
const initialLists = [
  "Drafts",
  "Planned",
  "Designing",
  "In Dev",
  "Done",
  "QA",
  "Complete",
];

export const initializeData = async () => {
  // Initialize tags
  for (let i = 0; i < initialTags.length; i++) {
    const existingTag = await TagModel.findOne({ name: initialTags[i] });
    if (!existingTag) {
      const newTag = new TagModel({ name: initialTags[i] });
      await newTag.save();
    }
  }

  // Initialize lists
  for (let i = 0; i < initialLists.length; i++) {
    const existingList = await ListModel.findOne({ name: initialLists[i] });
    if (!existingList) {
      const newList = new ListModel({ name: initialLists[i], order: i + 1 });
      await newList.save();
    }
  }
};
