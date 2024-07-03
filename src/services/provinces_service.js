import ProvinceRepository from '../repositories/provinces_repository.js';

export default class ProvinceService{

    getAllProvinces = async() =>
    {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllProvinces();
        return returnArray;
    }

    getById = async (id) => 
    {
        const repo = new ProvinceRepository();
        const province = await repo.getById(id);
        return province;
    }

    getLocationsById = async (id) =>
    {
        const repo = new ProvinceRepository();
        const locations = await repo.getLocationsById(id);
        return locations
    }

    postProvince = async (entity) => 
    {
        const repo = new ProvinceRepository();
        const success = await repo.postProvince(entity);
        return success;
    }

    updateAsync = async (entity) => 
    {
        const repo = new ProvinceRepository();
        const success = await repo.createAsync(entity);
        return success;

    }

    deleteByIdAsync = async (id) => 
    {
        const repo = new ProvinceRepository();
        const success = await repo.createAsync(id);
        return success;
    }
}