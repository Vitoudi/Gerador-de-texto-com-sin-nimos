export type Selector = `${'#' | '.'}${string}`

const generationMode = ["preserveOldWords", "discardOldWord"] as const;
export type GenerationMode = typeof generationMode[number];
export const isGenerationMode = (x: any): x is GenerationMode => generationMode.includes(x);