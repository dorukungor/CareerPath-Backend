export interface Profession {
    id: string;
    title: string;
    slug: string;
    avgSalary: number;
    difficultyLevel: string;
    roadmapSteps?: any[]; // We can define RoadmapStep type later if needed
}
