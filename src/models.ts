export interface Company {
    id: number;
    name: string;
    founded_year: number;
    revenue: number;
    employees_count: number;
    secret: string;
}

export interface Token {
    access_token: string;
    expires_in: Date;
    refresh_token: string;
    company_id: number;
}