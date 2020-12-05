import { v4 as uuidv4 } from 'uuid';

export class RandomService {
    generateUuid(): string {
        return uuidv4();
    }
}
