export const SPECIES_OPTIONS = [
  { label: "Human", value: "human" },
  { label: "Alien", value: "alien" },
  { label: "Humanoid", value: "humanoid" },
  { label: "Animal", value: "animal" },
  { label: "Robot", value: "robot" },
];
export const GENDER_OPTIONS = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Genderless", value: "genderless" },
  { label: "Unknown", value: "unknown" },
];

export const STATUS_OPTIONS = [
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
  { label: "Unknown", value: "unknown" },
];

export const STATUS_COLORS: Record<string, string> = {
  alive: "green",
  dead: "red",
  unknown: "orange",
};
