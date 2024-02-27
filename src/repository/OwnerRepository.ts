import { Owner } from "../entity/owner"
import DatabaseSource from "../ormconfig"

export default class OwnerRepository {

    static async getOwner(id:number) {
        const userRepository = DatabaseSource.getRepository(Owner)
        const owner = await userRepository.findOneBy({
           id
        })
        return owner
    }
    
    static async saveOwners(owners: Owner[]) {
        const ownerRepository = DatabaseSource.getRepository(Owner)
      
        await ownerRepository.save(owners)
    }
}

