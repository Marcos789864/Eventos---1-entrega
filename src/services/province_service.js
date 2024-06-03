import ProvinceRepository from '../repositories/province_repository.js';

export default class ProvinceService{

    getAllAsync = async() =>
    {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => 
    {
        const repo = new ProvinceRepository();
        const province = await repo.getByIdAsync(id);
        return province;
    }
    createAsync = async (entity) => 
    {
        const repo = new ProvinceRepository();
        const success = await repo.createAsync(entity);
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