export enum CharacterSets {
  Alphabetic = 'abcdefghijklmnopqrstuvwxyz',
  Numeric = '0123456789',
  Alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789',
}

export function generateRandomCode(length: number, characterSet: CharacterSets): string {
  const charactersArray = characterSet;
  let randomCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersArray.length);
    randomCode += charactersArray[randomIndex];
  }

  return randomCode;
}
