export interface PrefetchRequest {
    seed: string;
    difficulty: string;
    mapIds: number[];
    playerName: string;
    verbose?: string;
    trim?: string;
    isometric?: string;
    edge?: string;
    wallthickness?: string;
    serverScale?: string;
    password?: string;
}