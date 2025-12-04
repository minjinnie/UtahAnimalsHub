import type { Animal } from "../types";

// Import animals by class from scraping output
import { birdsAnimals } from "./birds";
import { fishesAnimals } from "./fishes";
import { invertebratesAnimals } from "./invertebrates";
import { mammalsAnimals } from "./mammals";
import { reptilesamphibiansAnimals } from "./reptiles_and_amphibians";

// Combine all animals into one array
export const animals: Animal[] = [
  ...birdsAnimals,
  ...fishesAnimals,
  ...invertebratesAnimals,
  ...mammalsAnimals,
  ...reptilesamphibiansAnimals
];

// Export animals grouped by class for filtered views
export const animalsByClass = {
  Birds: birdsAnimals,
  Fishes: fishesAnimals,
  Invertebrates: invertebratesAnimals,
  Mammals: mammalsAnimals,
  "Reptiles & Amphibians": reptilesamphibiansAnimals
};

// Export counts
export const animalCounts = {
  total: animals.length,
  birds: birdsAnimals.length,
  fishes: fishesAnimals.length,
  invertebrates: invertebratesAnimals.length,
  mammals: mammalsAnimals.length,
  reptilesAndAmphibians: reptilesamphibiansAnimals.length
};
/*
    id: "american-pika",
    commonName: "American Pika",
    scientificName: "Ochotona princeps",
    order: "Lagomorpha",
    family: "Ochotonidae",
    genus: "Ochotona",
    species: "princeps",
    nativeLocation: "High-elevation talus slopes in the Wasatch and Uinta Mountains",
    locations: ["Wasatch Range", "Uinta Mountains"],
    habitats: ["Mountains"],
    diet: "Herbivore – grasses, sedges, wildflowers",
    averageWeightKg: 0.16,
    conservationStatus: "Species of concern (climate sensitive)",
    populationText:
      "Local populations are stable in some areas but vulnerable to warming temperatures.",
    relatedAnimalIds: ["yellow-bellied-marmot"],
    description:
      "The American pika is a small, round mammal famous for its high-pitched calls and haypiles. In Utah, pikas live among rocky talus fields at high elevations, where cool microclimates help them survive hot summers.",
    classCategory: "Mammals",
    subSpecies: ["Ochotona princeps uinta"],
    imageUrl:
      "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_american-pika_600x300.jpg"
  },
  {
    id: "desert-bighorn-sheep",
    commonName: "Desert Bighorn Sheep",
    scientificName: "Ovis canadensis nelsoni",
    order: "Artiodactyla",
    family: "Bovidae",
    genus: "Ovis",
    species: "canadensis",
    nativeLocation: "Canyonlands and red-rock deserts of Southern Utah",
    locations: ["Zion National Park", "Canyonlands", "San Rafael Swell"],
    habitats: ["Southern Utah"],
    diet: "Herbivore – shrubs, grasses, desert plants",
    averageWeightKg: 70,
    conservationStatus: "Reintroduced, locally managed",
    populationText:
      "Several reintroduced herds now occupy canyon and desert habitats across Southern Utah.",
    relatedAnimalIds: [],
    description:
      "Desert bighorn sheep have impressive curved horns and are well-adapted to steep cliffs and dry environments. In Utah, they are an iconic symbol of the red-rock desert and are often seen on rocky ledges near canyons.",
    classCategory: "Mammals",
    subSpecies: ["Ovis canadensis nelsoni"],
    imageUrl:
      "data:image/jpeg;base64,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"
  },
  {
    id: "bonneville-cutthroat-trout",
    commonName: "Bonneville Cutthroat Trout",
    scientificName: "Oncorhynchus clarkii utah",
    order: "Salmoniformes",
    family: "Salmonidae",
    genus: "Oncorhynchus",
    species: "clarkii",
    nativeLocation: "Cold streams and lakes connected to the ancient Lake Bonneville basin, including Bear Lake",
    locations: ["Bear Lake", "Logan River", "Provo River"],
    habitats: ["Lake", "Mountains"],
    diet: "Carnivore – aquatic insects, small fish",
    averageWeightKg: 1.2,
    conservationStatus: "Utah state fish; conservation-dependent",
    populationText:
      "Conservation efforts have restored many native Bonneville cutthroat populations in Utah streams and lakes.",
    relatedAnimalIds: [],
    description:
      "The Bonneville cutthroat trout is Utah’s state fish and a native trout of the Great Basin. It is recognized by the red-orange streaks under its jaw and lives in clear, cold mountain streams and lakes.",
    classCategory: "Fishes",
    subSpecies: ["Oncorhynchus clarkii utah"],
    imageUrl:
      "https://nas.er.usgs.gov/XIMAGESERVERX/2012/20120130113845.jpg"
  },
  {
    id: "tiger-salamander",
    commonName: "Tiger Salamander",
    scientificName: "Ambystoma mavortium",
    order: "Caudata",
    family: "Ambystomatidae",
    genus: "Ambystoma",
    species: "mavortium",
    nativeLocation: "Wet meadows, ponds, and forests across much of Utah",
    locations: ["Wasatch Front", "Uintas foothills"],
    habitats: ["Forest", "Lake"],
    diet: "Carnivore – insects, worms, small invertebrates",
    averageWeightKg: 0.1,
    conservationStatus: "Common but sensitive to wetland loss",
    populationText:
      "Populations are generally stable but depend on healthy ponds and wetlands for breeding.",
    relatedAnimalIds: [],
    description:
      "Tiger salamanders are large, secretive amphibians with yellow blotches on a dark body. They spend much of their time underground and come to ponds and slow water to breed, especially in spring.",
    classCategory: "Reptiles & Amphibians",
    subSpecies: ["Ambystoma mavortium nebulosum"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8lZ54uPVQaE-PAToJzM2WzuZeaYm1vM-m6w&s"
  },
  {
    id: "yellow-bellied-marmot",
    commonName: "Yellow-bellied Marmot",
    scientificName: "Marmota flaviventris",
    order: "Rodentia",
    family: "Sciuridae",
    genus: "Marmota",
    species: "flaviventris",
    nativeLocation: "Alpine meadows and rocky slopes in Utah mountains",
    locations: ["Uinta Mountains", "Wasatch Range"],
    habitats: ["Mountains"],
    diet: "Herbivore – grasses, forbs, flowers",
    averageWeightKg: 4.5,
    conservationStatus: "Common",
    populationText:
      "Marmots are widespread and often seen sunning on rocks near high-elevation trails.",
    relatedAnimalIds: ["american-pika"],
    description:
      "Yellow-bellied marmots are large ground squirrels that live in colonies in rocky mountain areas. Hikers often spot them whistling and watching from boulders along Utah trails.",
    classCategory: "Mammals",
    subSpecies: [],
    imageUrl:
      "https://www.rockymountainnationalpark.com/images/xl/20210624-09-03-52-lg.jpg"
    },
    {
    id: "utah-prairie-dog",
    commonName: "Utah Prairie Dog",
    scientificName: "Cynomys parvidens",
    order: "Rodentia",
    family: "Sciuridae",
    genus: "Cynomys",
    species: "parvidens",
    nativeLocation: "Shrub-steppe and sagebrush plateaus in south-central Utah",
    locations: ["Sevier County", "Wayne County", "Piute County"],
    habitats: ["Southern Utah"],
    diet: "Herbivore – grasses, forbs, seeds",
    averageWeightKg: 0.9,
    conservationStatus: "Threatened (federally & state)",
    populationText: "Historically abundant but reduced drastically; conservation efforts ongoing.",
    relatedAnimalIds: [],
    description:
        "The Utah prairie dog is a social, burrowing rodent found only in Utah. It lives in colonies and is active on grasslands dominated by sagebrush.",
    classCategory: "Mammals",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvG7jVJxraysZP26kGhPSsX9ne_1vdYTdALA&s"
    },
    {
    id: "greater-sage-grouse",
    commonName: "Greater Sage-Grouse",
    scientificName: "Centrocercus urophasianus",
    order: "Galliformes",
    family: "Tetraonidae",
    genus: "Centrocercus",
    species: "urophasianus",
    nativeLocation: "Sagebrush-steppe ecosystems across northern and central Utah",
    locations: ["Duchesne County", "Uintah Basin", "Box Elder County"],
    habitats: ["Mountains", "Southern Utah"],
    diet: "Omnivore – sagebrush leaves, seeds, insects",
    averageWeightKg: 3.5,
    conservationStatus: "Sensitive-species (sagebrush decline)",
    populationText: "Numbers have declined with sagebrush habitat loss; active management in place.",
    relatedAnimalIds: [],
    description:
        "The greater sage-grouse is known for its elaborate courtship display and reliance on sagebrush habitat. It’s a key indicator species for the region.",
    classCategory: "Birds",
    subSpecies: [],
    imageUrl:
        "https://earthjustice.org/wp-content/uploads/2023/03/greater_sage_grouse_2836_1980x1320.jpg"
    },
    {
    id: "western-rattlesnake",
    commonName: "Western Rattlesnake",
    scientificName: "Crotalus oreganus lutosus",
    order: "Squamata",
    family: "Viperidae",
    genus: "Crotalus",
    species: "oreganus",
    nativeLocation: "Rocky slopes, sagebrush flats and desert canyons of western Utah",
    locations: ["St. George", "Zion National Park", "Kane County"],
    habitats: ["Southern Utah", "Desert"],
    diet: "Carnivore – rodents, birds, small reptiles",
    averageWeightKg: 2.1,
    conservationStatus: "Least Concern but locally monitored",
    populationText: "Common within suitable habitat but can be overlooked by visitors.",
    relatedAnimalIds: [],
    description:
        "The western rattlesnake is a venomous pit viper that inhabits dry, rocky terrain. In Utah it often basks at canyon edges near human trails.",
    classCategory: "Reptiles & Amphibians",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLO3W5IwcJ9rx-rNCU2JJJ8UDBWI5a8mrEg&s"
    },
    {
    id: "california-condor",
    commonName: "California Condor",
    scientificName: "Gymnogyps californianus",
    order: "Accipitriformes",
    family: "Cathartidae",
    genus: "Gymnogyps",
    species: "californianus",
    nativeLocation: "Canyon and cliff habitats of southern Utah and the Grand Canyon region",
    locations: ["Grand Staircase-Escalante", "Zion National Park"],
    habitats: ["Desert", "Mountains"],
    diet: "Scavenger – carrion (dead animals)",
    averageWeightKg: 10,
    conservationStatus: "Endangered",
    populationText: "Reintroduction programs in Utah have brought small flocks into the wild.",
    relatedAnimalIds: [],
    description:
        "The California condor is one of the largest flying birds in North America, recognized for its massive wingspan and endangered status.",
    classCategory: "Birds",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7nNATGz6BbdIuGZDFdc0Q5Y9xJoVgR1IDHQ&s"
    },
    {
    id: "gila-monster",
    commonName: "Gila Monster",
    scientificName: "Heloderma suspectum",
    order: "Squamata",
    family: "Helodermatidae",
    genus: "Heloderma",
    species: "suspectum",
    nativeLocation: "Rocky, upland desert of southwestern Utah",
    locations: ["Washington County", "Iron County"],
    habitats: ["Desert", "Southern Utah"],
    diet: "Carnivore – small mammals, eggs, insects",
    averageWeightKg: 1.3,
    conservationStatus: "Protected",
    populationText: "Rare and venomous; very few Utah observations.",
    relatedAnimalIds: [],
    description:
        "The Gila monster is one of the few venomous lizards in the world; it stores fat in its tail and basks on desert rock surfaces.",
    classCategory: "Reptiles & Amphibians",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZkkPq3jMDjfNeakc301ZYMOJCeg_peXO6A&s"
    },
    {
    id: "lake-trout",
    commonName: "Lake Trout",
    scientificName: "Salvelinus namaycush",
    order: "Salmoniformes",
    family: "Salmonidae",
    genus: "Salvelinus",
    species: "namaycush",
    nativeLocation: "Cold deep lakes in northern Utah and Bear Lake region",
    locations: ["Bear Lake", "Flaming Gorge"],
    habitats: ["Lake", "Mountains"],
    diet: "Carnivore – insects, smaller fish, crustaceans",
    averageWeightKg: 3.8,
    conservationStatus: "Vulnerable (lake populations sensitive)",
    populationText: "Lake trout in Utah occur in few deep water lakes and are studied for conservation.",
    relatedAnimalIds: [],
    description:
        "The lake trout is a large deep-water char found in cold lakes; in Utah it is prized by anglers in deep alpine lakes.",
    classCategory: "Fishes",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4GZHbza4pjD2gebrtm84Z_Zqg-8Jcwjqu6g&s"
    },
    {
    id: "mountain-gorilla",
    commonName: "Mountain Goat",
    scientificName: "Oreamnos americanus",
    order: "Artiodactyla",
    family: "Bovidae",
    genus: "Oreamnos",
    species: "americanus",
    nativeLocation: "High alpine zones of Utah’s Uinta and Wasatch mountains",
    locations: ["Uinta Mountains", "Wasatch Range"],
    habitats: ["Mountains"],
    diet: "Herbivore – grasses, mosses, lichens",
    averageWeightKg: 100,
    conservationStatus: "Introduced / Managed",
    populationText: "Mountain goats are managed in alpine zones and occasionally seen by hikers above treeline.",
    relatedAnimalIds: [],
    description:
        "Mountain goats are white-furred, sure-footed hoofed mammals adapted to the highest elevations. In Utah they occur above 10,000 ft.",
    classCategory: "Mammals",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQP8VjRg1Tklbz9Xt7XlOIrjKURLCd0uZfQ&s"
    },
    {
    id: "sierra-newt",
    commonName: "Sierra Newt",
    scientificName: "Taricha sierrae",
    order: "Caudata",
    family: "Salamandridae",
    genus: "Taricha",
    species: "sierrae",
    nativeLocation: "Wet forested slopes in northern Utah (rarely observed)",
    locations: ["Cache County", "Logan Canyon"],
    habitats: ["Forest", "Lake"],
    diet: "Carnivore – insects, tadpoles, small invertebrates",
    averageWeightKg: 0.12,
    conservationStatus: "Data Deficient",
    populationText: "Very limited sightings in Utah; monitoring ongoing.",
    relatedAnimalIds: [],
    description:
        "The Sierra newt is a brightly colored small salamander rarely seen in Utah; it may occupy small forest ponds or shady streams.",
    classCategory: "Reptiles & Amphibians",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tEeb1wx-hZBwVPT5--ur4z27Ht77ij4I8A&s"
    },
    {
    id: "great-horned-owl",
    commonName: "Great Horned Owl",
    scientificName: "Bubo virginianus",
    order: "Strigiformes",
    family: "Strigidae",
    genus: "Bubo",
    species: "virginianus",
    nativeLocation: "Wide habitats across Utah – forests, mountains, deserts",
    locations: ["Wasatch Front", "Zion National Park", "Bryce Canyon"],
    habitats: ["Forest", "Mountains", "Southern Utah"],
    diet: "Carnivore – mammals, birds, reptiles, large insects",
    averageWeightKg: 1.4,
    conservationStatus: "Least Concern",
    populationText: "One of Utah’s most widespread large owls; well-adapted and resilient.",
    relatedAnimalIds: [],
    description:
        "The great horned owl is a powerful nocturnal predator with ear tufts and a deep hoot; found across many Utah habitats.",
    classCategory: "Birds",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP74rNWeS6E2cyictvpVIo5ietUmQoP2DbXA&s"
    },
    {
    id: "tule-pea-butterfly",
    commonName: "Tule Pea Butterfly",
    scientificName: "Euphydryas editha taylori",
    order: "Lepidoptera",
    family: "Nymphalidae",
    genus: "Euphydryas",
    species: "editha",
    nativeLocation: "Wet meadows and streamsides in northern Utah",
    locations: ["Cache County", "Bear Lake County"],
    habitats: ["Lake", "Forest"],
    diet: "Herbivore – nectar and host plants",
    averageWeightKg: 0.003,
    conservationStatus: "Endangered",
    populationText: "Very rare in Utah; monitored by conservation groups.",
    relatedAnimalIds: [],
    description:
        "The Tule Pea Butterfly is a rare subspecies of Edith’s checkerspot butterfly, found only in a few Utah wetlands connected to Bear Lake.",
    classCategory: "Invertebrates",
    subSpecies: [],
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq59pNAz0LuNAkh51-fblnvYg-oOPGUdCDLQ&s"
    }
];
*/