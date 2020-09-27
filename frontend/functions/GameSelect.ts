import { AsyncStorage } from "react-native";

function trueOrFalse(value: string | null) {
  //converts string true or false to boolean
  if (!value || value == "false") return false;
  return true;
}

export async function getSelectedLayer(
  this: any,
  { currentName, childNames }: GetProps
) {
  //checks to see if current parent is selected and first child layer is selected
  const selected: SelectProps = {};

  let parentSelected = await AsyncStorage.getItem(currentName + " selected");
  selected[currentName] = trueOrFalse(parentSelected);

  for (const childName of childNames) {
    const childString = currentName + " " + childName;
    try {
      let childSelected = await AsyncStorage.getItem(childString + " selected");
      selected[childString] = trueOrFalse(childSelected);
    } catch (e) {
      console.log(e);
    }
  }
  this.setState({ selected });
}

export async function updateChildren({
  currentName,
  value,
  childNames,
  selected,
}: ChildrenProps) {
  //recursive function that aggregates selected of current and children, going off of a name based system
  //starts at layer of updater, ie current
  await AsyncStorage.setItem(currentName + " selected", value.toString());
  selected[currentName] = value;

  if (childNames.constructor == Object) {
    for (let childName of Object.keys(childNames)) {
      await updateChildren({
        currentName: currentName + " " + childName,
        value,
        childNames: childNames[childName],
        selected,
      });
    }
    return selected;
  } else return selected;
}

//done at starting layer
export async function updateParents({
  currentNameObject,
  currentName,
  selected,
}: any) {
  //recursive function that goes down to goes up, checks to see if all children are selected then updates parents accordingly
  //starts at base layer, the first parent aka the game
  let allSelected = true;
  if (currentNameObject.constructor == Object) {
    for (const name of Object.keys(currentNameObject)) {
      let thisSelected = false;
      const newName = currentName + " " + name;
      const data = await updateParents({
        currentName: newName,
        currentNameObject: currentNameObject[name],
        selected,
      });
      thisSelected = data.allSelected;
      selected = data.selected;
      if (!thisSelected) allSelected = false;

      await AsyncStorage.setItem(
        newName + " selected",
        thisSelected.toString()
      );
      selected[newName] = thisSelected;
    }
    await AsyncStorage.setItem(
      currentName + " selected",
      allSelected.toString()
    );
    selected[currentName] = allSelected;
  } else {
    let allSelectedString = await AsyncStorage.getItem(
      currentName + " selected"
    );
    allSelected = trueOrFalse(allSelectedString);
    selected[currentName] = allSelected;
  }
  return { allSelected, selected };
}

interface GetProps {
  currentName: string;
  childNames: Array<string>;
}

interface ChildrenProps {
  currentName: string;
  value: Boolean;
  childNames: any;
  selected: SelectProps;
}

interface ParentProps {
  currentName: string;
  currentNameObject: any;
  selected?: SelectProps;
}
interface SelectProps {
  [key: string]: Boolean;
}
