export class Result {
    constructor(
        public title: string, 
        public description: string, 
        public latitude: number, 
        public longitude: number
    ){
        
    };
}

export interface ElasticResult {
        account_number: number,
        balance: number,
        firstname: string,
        lastname: string,
        age: number,
        gender: string,
        address: string,
        employer: string,
        email: string,
        city: string,
        state: string,
        latitude: number,
        longitude: number
}