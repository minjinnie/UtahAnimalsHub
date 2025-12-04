export type Habitat =
  | "Mountains"
  | "Lake"
  | "Forest"
  | "Southern Utah"
  | "Desert"
  | "Plains"
  | "Wetlands"
  | "River"
  | "Canyon"
  | "Shrubland";

export type AnimalClass =
  | "Mammals"
  | "Reptiles & Amphibians"
  | "Birds"
  | "Fishes"
  | "Invertebrates";

export interface Animal {
  id: string;
  commonName: string;
  scientificName: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  nativeLocation: string;
  locations: string[];
  habitats: Habitat[];
  diet: string;
  averageWeightKg: number;
  conservationStatus: string;
  populationText: string;
  relatedAnimalIds: string[];
  description: string;
  classCategory: AnimalClass;
  subSpecies?: string[];
  images?: string[];
}
