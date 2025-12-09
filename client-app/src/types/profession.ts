export interface Resource {
    id: string;
    title: string;
    type: string;
    url: string;
    isAffiliate: boolean;
}

export interface RoadmapStep {
    id: string;
    title: string;
    summary: string;
    description: string;
    orderIndex: number;
    mustKnow: boolean;
    resources: Resource[];
}

export interface Profession {
    id: string;
    title: string;
    slug: string;
    avgSalary: number;
    difficultyLevel: string;
    roadmapSteps: RoadmapStep[];
}
