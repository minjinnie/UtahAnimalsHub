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
  | "Shrubland"
  | "no data found";

export type AnimalClass =
  | "Mammals"
  | "Reptiles & Amphibians"
  | "Birds"
  | "Fishes"
  | "Invertebrates"
  | "no data found";

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
  imageUrl: string;
}
