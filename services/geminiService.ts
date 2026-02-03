
const EXPRESSIONS = [
  "ihateyou - I have no language for how deeply you matter. You might not be the world, yet somehow you hold all of mine 🥹",
  "ihateyou - I don't have words to tell you why, but I know that I do. I hope one day I will be able to make you feel that I do. ihateyoumore - Always❤️",
  "ihateyou for making my inner child breathe again, and tbh even this ihateyou is not enough to express how I actually feel 🥹",
  "ihateyou for being the home I didn't know I was searching for until I saw it in your eyes.",
  "ihateyou for the way you make me feel safe enough to be exactly who I am, without apology. Ihateyoumore❤️",
  "I don't have enough words to express my feelings for you - and that's when I say ihateyou❤️"
];

export const generateRomanticMessage = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const randomIndex = Math.floor(Math.random() * EXPRESSIONS.length);
  return EXPRESSIONS[randomIndex];
};
